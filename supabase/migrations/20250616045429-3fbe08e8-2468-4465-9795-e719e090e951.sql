
-- Create payment_methods table for businesses to store their payment details
CREATE TABLE public.payment_methods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('bank', 'mobile', 'card', 'cash')),
  name TEXT NOT NULL,
  details TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on payment_methods
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payment_methods
CREATE POLICY "Business owners can manage their payment methods"
  ON public.payment_methods
  FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- Create policy for public viewing of active payment methods (for clients to see payment options)
CREATE POLICY "Anyone can view active payment methods"
  ON public.payment_methods
  FOR SELECT
  USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON public.payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Update businesses table to improve location search capabilities
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create index for full-text search on businesses
CREATE INDEX IF NOT EXISTS businesses_search_idx ON public.businesses USING gin(search_vector);

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_business_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.address, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS update_business_search_vector_trigger ON public.businesses;
CREATE TRIGGER update_business_search_vector_trigger
  BEFORE INSERT OR UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_business_search_vector();

-- Update existing businesses search vectors
UPDATE public.businesses SET search_vector = 
  setweight(to_tsvector('english', COALESCE(name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(city, '')), 'C') ||
  setweight(to_tsvector('english', COALESCE(address, '')), 'D');
