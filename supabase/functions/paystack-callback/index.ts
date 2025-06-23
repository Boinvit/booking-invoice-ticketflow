
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const reference = url.searchParams.get('reference')
    
    if (!reference) {
      return new Response('Missing reference parameter', { status: 400 })
    }

    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackSecretKey) {
      throw new Error('PAYSTACK_SECRET_KEY not configured')
    }

    // Verify payment with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!verifyResponse.ok) {
      throw new Error('Failed to verify payment')
    }

    const verifyData = await verifyResponse.json()
    
    if (verifyData.status && verifyData.data.status === 'success') {
      // Initialize Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      const supabase = createClient(supabaseUrl, supabaseKey)

      const businessId = verifyData.data.metadata?.business_id
      const planType = verifyData.data.metadata?.plan_type
      const userEmail = verifyData.data.customer?.email

      if (businessId && planType) {
        // Get plan limits
        const planLimits = {
          medium: { staff_limit: 15, bookings_limit: 1000 },
          premium: { staff_limit: null, bookings_limit: null }
        }

        const limits = planLimits[planType as keyof typeof planLimits] || { staff_limit: 5, bookings_limit: 100 }

        // Create subscription end date (1 month from now)
        const subscriptionEndDate = new Date()
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1)

        // Get user ID from email
        const { data: authUser } = await supabase.auth.admin.listUsers()
        const user = authUser.users.find(u => u.email === userEmail)

        if (user) {
          // Update subscription
          await supabase
            .from('subscriptions')
            .upsert({
              user_id: user.id,
              business_id: businessId,
              plan_type: planType,
              status: 'active',
              current_period_end: subscriptionEndDate.toISOString(),
              paystack_reference: reference,
              staff_limit: limits.staff_limit,
              bookings_limit: limits.bookings_limit,
              updated_at: new Date().toISOString()
            }, { 
              onConflict: 'business_id' 
            })
        }

        // Redirect to success page
        const origin = req.headers.get('origin') || 'https://boinvit.com'
        return Response.redirect(`${origin}/app/subscription?success=true`, 302)
      }
    }

    // Redirect to failure page
    const origin = req.headers.get('origin') || 'https://boinvit.com'
    return Response.redirect(`${origin}/app/subscription?error=payment_failed`, 302)

  } catch (error) {
    console.error('Callback error:', error)
    const origin = req.headers.get('origin') || 'https://boinvit.com'
    return Response.redirect(`${origin}/app/subscription?error=callback_error`, 302)
  }
})
