
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const validatePaystackSignature = (body: string, signature: string, secret: string): boolean => {
  try {
    const crypto = new TextEncoder().encode(secret);
    const data = new TextEncoder().encode(body);
    
    // Create HMAC-SHA512 hash
    return crypto.subtle.importKey(
      'raw', 
      crypto, 
      { name: 'HMAC', hash: 'SHA-512' }, 
      false, 
      ['sign']
    ).then(key => 
      crypto.subtle.sign('HMAC', key, data)
    ).then(hashBuffer => {
      const hash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      return hash === signature;
    }).catch(() => false);
  } catch {
    return false;
  }
};

const validateInput = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('Invalid request body');
    return { isValid: false, errors };
  }
  
  if (!data.event || typeof data.event !== 'string') {
    errors.push('Missing or invalid event type');
  }
  
  if (!data.data || typeof data.data !== 'object') {
    errors.push('Missing or invalid event data');
  }
  
  // Validate specific fields based on event type
  if (data.event === 'charge.success') {
    if (!data.data.reference || typeof data.data.reference !== 'string') {
      errors.push('Missing payment reference');
    }
    if (!data.data.metadata || typeof data.data.metadata !== 'object') {
      errors.push('Missing payment metadata');
    }
    if (!data.data.amount || typeof data.data.amount !== 'number') {
      errors.push('Missing or invalid amount');
    }
  }
  
  return { isValid: errors.length === 0, errors };
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('x-paystack-signature');
    const body = await req.text();
    
    // Verify webhook signature
    const webhookSecret = Deno.env.get('PAYSTACK_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return new Response('Configuration error', { status: 500 });
    }

    if (!signature) {
      console.error('Missing webhook signature');
      return new Response('Unauthorized', { status: 401 });
    }

    // Validate signature
    const isValidSignature = await validatePaystackSignature(body, signature, webhookSecret);
    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return new Response('Unauthorized', { status: 401 });
    }

    let event;
    try {
      event = JSON.parse(body);
    } catch {
      console.error('Invalid JSON in webhook body');
      return new Response('Invalid JSON', { status: 400 });
    }

    // Validate input
    const validation = validateInput(event);
    if (!validation.isValid) {
      console.error('Input validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validation.errors }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return new Response('Configuration error', { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle different webhook events
    switch (event.event) {
      case 'charge.success':
        const charge = event.data;
        const businessId = charge.metadata?.business_id;
        const planType = charge.metadata?.plan_type;
        const reference = charge.reference;

        // Validate required metadata
        if (!businessId || !planType) {
          console.error('Missing required metadata in payment');
          return new Response('Invalid payment metadata', { status: 400 });
        }

        // Validate business exists and user has access
        const { data: business, error: businessError } = await supabase
          .from('businesses')
          .select('id, user_id')
          .eq('id', businessId)
          .single();

        if (businessError || !business) {
          console.error('Business not found:', businessError);
          return new Response('Business not found', { status: 404 });
        }

        // Get plan limits with validation
        const planLimits = {
          starter: { staff_limit: 5, bookings_limit: 1000 },
          medium: { staff_limit: 15, bookings_limit: 3000 },
          premium: { staff_limit: null, bookings_limit: null }
        };

        const limits = planLimits[planType as keyof typeof planLimits];
        if (!limits) {
          console.error('Invalid plan type:', planType);
          return new Response('Invalid plan type', { status: 400 });
        }

        // Create subscription end date (1 month from now)
        const subscriptionEndDate = new Date();
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

        // Update subscription with proper error handling
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: business.user_id,
            business_id: businessId,
            plan_type: planType,
            status: 'active',
            current_period_end: subscriptionEndDate.toISOString(),
            staff_limit: limits.staff_limit,
            bookings_limit: limits.bookings_limit,
            updated_at: new Date().toISOString()
          }, { 
            onConflict: 'business_id' 
          });

        if (subscriptionError) {
          console.error('Failed to update subscription:', subscriptionError);
          return new Response('Database error', { status: 500 });
        }

        // Log successful payment
        await supabase
          .from('payment_transactions')
          .insert({
            business_id: businessId,
            amount: charge.amount / 100, // Convert from kobo to naira
            currency: charge.currency?.toUpperCase() || 'NGN',
            status: 'completed',
            payment_method: 'paystack',
            paystack_reference: reference,
            transaction_type: 'subscription',
            metadata: { plan_type: planType, webhook_event: event.event }
          })
          .select()
          .single();

        console.log('Subscription updated successfully for business:', businessId);
        break;

      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return new Response(
      JSON.stringify({ received: true, status: 'success' }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'Webhook processing failed'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
