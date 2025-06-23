
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { planType, businessId, customerEmail } = await req.json()

    console.log('Creating Paystack checkout for:', { planType, businessId, customerEmail })

    // Get Paystack secret key from environment
    const paystackKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackKey) {
      console.error('Paystack secret key not configured')
      throw new Error('Paystack secret key not configured')
    }

    // Define price amounts for each plan (in kobo - smallest currency unit)
    const planPrices = {
      medium: 2900, // KES 29 in kobo
      premium: 9900  // KES 99 in kobo
    }

    if (!planPrices[planType as keyof typeof planPrices]) {
      throw new Error('Invalid plan type')
    }

    const amount = planPrices[planType as keyof typeof planPrices]
    console.log('Plan amount:', amount, 'for plan:', planType)

    // Get the origin for callback URL
    const origin = req.headers.get('origin') || 'https://02979c8d-0d51-4131-ae95-27a440da9a8d.lovableproject.com'

    // Create Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerEmail,
        amount: amount,
        currency: 'KES',
        callback_url: `${origin}/app/subscription?success=true`,
        metadata: {
          business_id: businessId,
          plan_type: planType,
        },
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      }),
    })

    if (!paystackResponse.ok) {
      const errorText = await paystackResponse.text()
      console.error('Paystack API error:', errorText)
      throw new Error(`Paystack error: ${errorText}`)
    }

    const transaction = await paystackResponse.json()
    console.log('Paystack transaction created:', transaction.data.reference)

    return new Response(
      JSON.stringify({ 
        url: transaction.data.authorization_url,
        reference: transaction.data.reference 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in create-paystack-checkout:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
