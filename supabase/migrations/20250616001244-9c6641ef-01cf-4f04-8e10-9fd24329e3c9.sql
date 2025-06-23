
-- Create subscriptions table for managing business subscription plans
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('trial', 'starter', 'medium', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  trial_ends_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  staff_limit INTEGER,
  bookings_limit INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id)
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own subscriptions" 
  ON public.subscriptions 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create index for performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_business_id ON public.subscriptions(business_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
