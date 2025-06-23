
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { planType, businessId, successUrl, cancelUrl } = await req.json()

    // Get Stripe secret key from environment
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      throw new Error('Stripe secret key not configured')
    }

    // Define price IDs for each plan
    const priceIds = {
      medium: 'price_medium_monthly', // Replace with actual Stripe price ID
      premium: 'price_premium_monthly' // Replace with actual Stripe price ID
    }

    if (!priceIds[planType as keyof typeof priceIds]) {
      throw new Error('Invalid plan type')
    }

    // Create Stripe checkout session
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'subscription',
        'line_items[0][price]': priceIds[planType as keyof typeof priceIds],
        'line_items[0][quantity]': '1',
        'success_url': successUrl,
        'cancel_url': cancelUrl,
        'metadata[business_id]': businessId,
        'metadata[plan_type]': planType,
      }),
    })

    if (!stripeResponse.ok) {
      const error = await stripeResponse.text()
      throw new Error(`Stripe error: ${error}`)
    }

    const session = await stripeResponse.json()

    return new Response(
      JSON.stringify({ url: session.url }),
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
