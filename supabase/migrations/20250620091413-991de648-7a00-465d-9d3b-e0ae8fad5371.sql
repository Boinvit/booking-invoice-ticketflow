
-- Clean up any redundant or conflicting migrations by ensuring core tables are properly structured
-- This will standardize the database to match the current codebase

-- Ensure businesses table has the correct structure
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS subdomain text,
ADD COLUMN IF NOT EXISTS featured_image_url text;

-- Ensure subscriptions table has the correct structure for current functionality
ALTER TABLE public.subscriptions
ADD COLUMN IF NOT EXISTS paystack_subaccount_id text,
ADD COLUMN IF NOT EXISTS auto_split_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS split_percentage numeric DEFAULT 7.5;

-- Update subscription plan types to match current system
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'subscription_plan_type' 
    AND typarray = (SELECT oid FROM pg_type WHERE typname = '_subscription_plan_type')
  ) THEN
    CREATE TYPE subscription_plan_type AS ENUM ('trial', 'starter', 'medium', 'premium', 'payasyougo');
  END IF;
END
$$;

-- Ensure payment_transactions table exists for current payment system
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES public.businesses(id),
  booking_id uuid REFERENCES public.bookings(id),
  subscription_id uuid REFERENCES public.subscriptions(id),
  amount numeric NOT NULL,
  currency text DEFAULT 'KES',
  status text DEFAULT 'pending',
  payment_method text,
  paystack_reference text,
  transaction_type text NOT NULL,
  platform_amount numeric,
  business_amount numeric,
  split_amount numeric,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on payment_transactions if not already enabled
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policy for business owners to see their transactions
DROP POLICY IF EXISTS "Business owners can view their transactions" ON public.payment_transactions;
CREATE POLICY "Business owners can view their transactions" 
ON public.payment_transactions FOR ALL 
USING (
  business_id IN (
    SELECT id FROM public.businesses WHERE user_id = auth.uid()
  )
);

-- Clean up any duplicate or conflicting functions
DROP FUNCTION IF EXISTS public.create_paid_subscription(uuid, text, text);

-- Recreate the subscription function to match current needs
CREATE OR REPLACE FUNCTION public.create_paid_subscription(
  business_id uuid,
  plan_type text,
  paystack_reference text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  subscription_id UUID;
  staff_limit_val INTEGER;
  bookings_limit_val INTEGER;
  period_end TIMESTAMPTZ;
  user_id_val UUID;
BEGIN
  -- Set limits based on plan type
  CASE plan_type
    WHEN 'starter' THEN
      staff_limit_val := 5;
      bookings_limit_val := 1000;
    WHEN 'medium' THEN
      staff_limit_val := 15;
      bookings_limit_val := 3000;
    WHEN 'premium' THEN
      staff_limit_val := NULL; -- Unlimited
      bookings_limit_val := NULL; -- Unlimited
    ELSE
      staff_limit_val := 3;
      bookings_limit_val := 500;
  END CASE;
  
  -- Set period end to 1 month from now
  period_end := NOW() + INTERVAL '1 month';
  
  -- Get user_id from business
  SELECT b.user_id INTO user_id_val
  FROM public.businesses b
  WHERE b.id = business_id;
  
  -- Upsert subscription
  INSERT INTO public.subscriptions (
    user_id,
    business_id,
    plan_type,
    status,
    current_period_end,
    staff_limit,
    bookings_limit
  )
  VALUES (
    user_id_val,
    business_id,
    plan_type,
    'active',
    period_end,
    staff_limit_val,
    bookings_limit_val
  )
  ON CONFLICT (business_id)
  DO UPDATE SET
    plan_type = EXCLUDED.plan_type,
    status = EXCLUDED.status,
    current_period_end = EXCLUDED.current_period_end,
    staff_limit = EXCLUDED.staff_limit,
    bookings_limit = EXCLUDED.bookings_limit,
    updated_at = NOW()
  RETURNING id INTO subscription_id;
  
  RETURN subscription_id;
END;
$$;
