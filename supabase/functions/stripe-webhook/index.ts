
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    
    // Verify webhook signature (implement proper verification in production)
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!signature || !webhookSecret) {
      throw new Error('Missing webhook signature or secret')
    }

    const event = JSON.parse(body)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Handle different webhook events
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const businessId = session.metadata.business_id
        const planType = session.metadata.plan_type
        const subscriptionId = session.subscription

        // Create subscription record
        await supabase
          .rpc('create_paid_subscription', {
            business_id: businessId,
            plan_type: planType,
            stripe_subscription_id: subscriptionId
          })
        
        break

      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const deletedSub = event.data.object
        await supabase
          .rpc('cancel_subscription', {
            stripe_subscription_id: deletedSub.id
          })
        
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
