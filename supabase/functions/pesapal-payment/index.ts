
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { businessId, planId, amount, token } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Generate unique merchant reference
    const merchantReference = `SUB-${businessId}-${Date.now()}`

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert([{
        business_id: businessId,
        subscription_plan_id: planId,
        amount: amount,
        currency: 'KES',
        payment_method: 'mobile_money',
        pesapal_merchant_reference: merchantReference,
        status: 'pending',
      }])
      .select()
      .single()

    if (paymentError) {
      throw new Error('Failed to create payment record')
    }

    // Submit order to Pesapal
    const orderData = {
      id: merchantReference,
      currency: "KES",
      amount: amount,
      description: "Subscription Payment",
      callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pesapal-callback`,
      notification_id: "",
      billing_address: {
        email_address: "",
        phone_number: "",
        country_code: "KE",
        first_name: "",
        middle_name: "",
        last_name: "",
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        postal_code: "",
        zip_code: ""
      }
    }

    const orderResponse = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!orderResponse.ok) {
      throw new Error('Failed to submit order to Pesapal')
    }

    const orderResult = await orderResponse.json()

    // Update payment with tracking ID
    await supabaseClient
      .from('payments')
      .update({
        pesapal_order_tracking_id: orderResult.order_tracking_id,
      })
      .eq('id', payment.id)

    return new Response(
      JSON.stringify({
        redirect_url: orderResult.redirect_url,
        order_tracking_id: orderResult.order_tracking_id,
        merchant_reference: merchantReference,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
