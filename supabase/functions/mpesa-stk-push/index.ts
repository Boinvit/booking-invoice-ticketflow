
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phoneNumber, amount, planType, businessId, customerEmail } = await req.json()

    console.log('STK Push request:', { phoneNumber, amount, planType, businessId })

    // Get Paystack secret key from environment
    const paystackKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackKey) {
      console.error('Paystack secret key not configured')
      throw new Error('Payment service not configured')
    }

    // Format phone number for M-Pesa (ensure it starts with 254)
    let formattedPhone = phoneNumber.replace(/\D/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1)
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone
    }

    console.log('Formatted phone:', formattedPhone)

    // Create Paystack charge for M-Pesa
    const chargeData = {
      email: customerEmail || `${formattedPhone}@mpesa.local`,
      amount: Math.round(amount * 100), // Convert to kobo
      currency: 'KES',
      mobile_money: {
        phone: formattedPhone,
        provider: 'mpesa'
      },
      metadata: {
        business_id: businessId,
        plan_type: planType,
        payment_method: 'mpesa_stk'
      }
    }

    console.log('Charge data:', chargeData)

    const chargeResponse = await fetch('https://api.paystack.co/charge', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chargeData),
    })

    if (!chargeResponse.ok) {
      const errorText = await chargeResponse.text()
      console.error('Paystack charge error:', errorText)
      throw new Error(`Payment initiation failed: ${errorText}`)
    }

    const chargeResult = await chargeResponse.json()
    console.log('Charge result:', chargeResult)

    if (chargeResult.status === true && chargeResult.data.status === 'send_otp') {
      // STK push sent successfully
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'STK push sent successfully',
          reference: chargeResult.data.reference,
          checkoutRequestID: chargeResult.data.reference
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } else {
      throw new Error(chargeResult.message || 'Failed to initiate M-Pesa payment')
    }

  } catch (error) {
    console.error('Error in mpesa-stk-push:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'STK push failed'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
