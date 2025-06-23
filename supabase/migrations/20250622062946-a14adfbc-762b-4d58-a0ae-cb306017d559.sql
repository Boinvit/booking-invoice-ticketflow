
-- Clean up and optimize database structure after revert
-- Remove any duplicate or redundant policies and functions

-- First, let's ensure the business setup flow works properly
-- Update business_settings table to have better defaults
ALTER TABLE public.business_settings 
ALTER COLUMN currency SET DEFAULT 'KES',
ALTER COLUMN booking_slot_duration_minutes SET DEFAULT 60,
ALTER COLUMN max_bookings_per_slot SET DEFAULT 1,
ALTER COLUMN booking_advance_days SET DEFAULT 7,
ALTER COLUMN reminder_hours_before SET DEFAULT 2;

-- Ensure payment_methods table has proper structure
ALTER TABLE public.payment_methods 
ALTER COLUMN type TYPE TEXT,
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS instructions TEXT;

-- Add payment instructions to businesses table if not exists
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS payment_instructions TEXT,
ADD COLUMN IF NOT EXISTS preferred_payment_methods TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS mpesa_number TEXT,
ADD COLUMN IF NOT EXISTS bank_account TEXT,
ADD COLUMN IF NOT EXISTS bank_name TEXT;

-- Update business_settings to include payment preferences
ALTER TABLE public.business_settings
ADD COLUMN IF NOT EXISTS payment_instructions TEXT,
ADD COLUMN IF NOT EXISTS enable_mpesa BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_card_payments BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_bank_transfer BOOLEAN DEFAULT false;

-- Clean up any orphaned records or duplicate policies
-- This is safe to run multiple times
DO $$ 
BEGIN
  -- Remove duplicate RLS policies if they exist
  DROP POLICY IF EXISTS "Users can view own business settings" ON business_settings;
  DROP POLICY IF EXISTS "Users can update own business settings" ON business_settings;
  DROP POLICY IF EXISTS "Business owners can manage payment methods" ON payment_methods;
  
  -- Recreate essential policies
  CREATE POLICY "Users can view own business settings" ON business_settings
    FOR SELECT USING (
      business_id IN (
        SELECT id FROM businesses WHERE user_id = auth.uid()
      )
    );
    
  CREATE POLICY "Users can update own business settings" ON business_settings
    FOR ALL USING (
      business_id IN (
        SELECT id FROM businesses WHERE user_id = auth.uid()
      )
    );
    
  CREATE POLICY "Business owners can manage payment methods" ON payment_methods
    FOR ALL USING (
      business_id IN (
        SELECT id FROM businesses WHERE user_id = auth.uid()
      )
    );
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Ignore if policies already exist
END $$;

-- Ensure proper indexes for performance
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_business_settings_business_id ON business_settings(business_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_business_id ON payment_methods(business_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_business_id ON subscriptions(business_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
