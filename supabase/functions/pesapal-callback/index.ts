
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const orderTrackingId = url.searchParams.get('OrderTrackingId')
    const merchantReference = url.searchParams.get('OrderMerchantReference')

    if (!orderTrackingId || !merchantReference) {
      return new Response('Missing required parameters', { status: 400 })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get auth token
    const consumerKey = Deno.env.get('PESAPAL_CONSUMER_KEY')
    const consumerSecret = Deno.env.get('PESAPAL_CONSUMER_SECRET')
    
    const authResponse = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      }),
    })

    const authData = await authResponse.json()

    // Check payment status
    const statusResponse = await fetch(
      `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${authData.token}`,
        },
      }
    )

    const statusData = await statusResponse.json()

    // Update payment record
    const { data: payment } = await supabaseClient
      .from('payments')
      .update({
        status: statusData.payment_status_description.toLowerCase(),
        pesapal_tracking_id: statusData.payment_tracking_id,
        payment_date: statusData.payment_status_description.toLowerCase() === 'completed' ? new Date().toISOString() : null,
      })
      .eq('pesapal_merchant_reference', merchantReference)
      .select('business_id, subscription_plan_id')
      .single()

    // If payment is completed, activate subscription
    if (statusData.payment_status_description.toLowerCase() === 'completed' && payment) {
      const nextBillingDate = new Date()
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)

      await supabaseClient
        .from('businesses')
        .update({
          subscription_status: 'active',
          subscription_started_at: new Date().toISOString(),
          subscription_next_billing_date: nextBillingDate.toISOString().split('T')[0],
        })
        .eq('id', payment.business_id)
    }

    return new Response('Payment processed successfully', { status: 200 })
  } catch (error) {
    console.error('Callback error:', error)
    return new Response('Internal server error', { status: 500 })
  }
})
