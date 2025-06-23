
-- Add Row Level Security policies for staff table if they don't exist
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- Policy for business owners to view their staff
CREATE POLICY "Business owners can view their staff"
  ON public.staff
  FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- Policy for business owners to create staff
CREATE POLICY "Business owners can create staff"
  ON public.staff
  FOR INSERT
  WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- Policy for business owners to update their staff
CREATE POLICY "Business owners can update their staff"
  ON public.staff
  FOR UPDATE
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- Policy for business owners to delete their staff
CREATE POLICY "Business owners can delete their staff"
  ON public.staff
  FOR DELETE
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );
