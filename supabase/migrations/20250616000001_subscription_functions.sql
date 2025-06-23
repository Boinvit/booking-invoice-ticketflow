
-- Function to get user subscription
CREATE OR REPLACE FUNCTION get_user_subscription(user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  business_id UUID,
  plan_type TEXT,
  status TEXT,
  trial_ends_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  staff_limit INTEGER,
  bookings_limit INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT s.*
  FROM public.subscriptions s
  WHERE s.user_id = get_user_subscription.user_id
  LIMIT 1;
$$;

-- Function to create trial subscription
CREATE OR REPLACE FUNCTION create_trial_subscription(
  user_id UUID,
  business_id UUID,
  trial_end_date TIMESTAMPTZ
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  subscription_id UUID;
BEGIN
  INSERT INTO public.subscriptions (
    user_id,
    business_id,
    plan_type,
    status,
    trial_ends_at,
    current_period_end,
    staff_limit,
    bookings_limit
  )
  VALUES (
    user_id,
    business_id,
    'trial',
    'active',
    trial_end_date,
    trial_end_date,
    NULL, -- Unlimited during trial
    NULL  -- Unlimited during trial
  )
  RETURNING id INTO subscription_id;
  
  RETURN subscription_id;
END;
$$;

-- Function to create paid subscription
CREATE OR REPLACE FUNCTION create_paid_subscription(
  business_id UUID,
  plan_type TEXT,
  stripe_subscription_id TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  subscription_id UUID;
  staff_limit_val INTEGER;
  bookings_limit_val INTEGER;
  period_end TIMESTAMPTZ;
BEGIN
  -- Set limits based on plan type
  IF plan_type = 'starter' THEN
    staff_limit_val := 5;
    bookings_limit_val := 1000;
  ELSIF plan_type = 'medium' THEN
    staff_limit_val := 15;
    bookings_limit_val := 3000;
  ELSIF plan_type = 'premium' THEN
    staff_limit_val := NULL; -- Unlimited
    bookings_limit_val := NULL; -- Unlimited
  END IF;
  
  -- Set period end to 1 month from now
  period_end := NOW() + INTERVAL '1 month';
  
  -- Get user_id from business
  DECLARE
    user_id_val UUID;
  BEGIN
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
      stripe_subscription_id,
      staff_limit,
      bookings_limit
    )
    VALUES (
      user_id_val,
      business_id,
      plan_type,
      'active',
      period_end,
      stripe_subscription_id,
      staff_limit_val,
      bookings_limit_val
    )
    ON CONFLICT (business_id)
    DO UPDATE SET
      plan_type = EXCLUDED.plan_type,
      status = EXCLUDED.status,
      current_period_end = EXCLUDED.current_period_end,
      stripe_subscription_id = EXCLUDED.stripe_subscription_id,
      staff_limit = EXCLUDED.staff_limit,
      bookings_limit = EXCLUDED.bookings_limit,
      updated_at = NOW()
    RETURNING id INTO subscription_id;
  END;
  
  RETURN subscription_id;
END;
$$;

-- Function to cancel subscription
CREATE OR REPLACE FUNCTION cancel_subscription(stripe_subscription_id TEXT)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE public.subscriptions
  SET 
    status = 'cancelled',
    updated_at = NOW()
  WHERE stripe_subscription_id = cancel_subscription.stripe_subscription_id;
$$;
