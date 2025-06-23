-- Create reviews table
CREATE TABLE IF NOT EXISTS public.business_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(booking_id)
);

-- Enable RLS
ALTER TABLE public.business_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all reviews" ON public.business_reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON public.business_reviews
    FOR INSERT WITH CHECK (
        booking_id IN (
            SELECT b.id FROM public.bookings b
            JOIN public.clients c ON b.client_id = c.id
            WHERE c.email = auth.email()
        )
    );

-- Add average rating to businesses
ALTER TABLE public.businesses
ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2),
ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0;

-- Create function to update business rating
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.businesses
    SET 
        average_rating = (
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM public.business_reviews
            WHERE business_id = NEW.business_id
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM public.business_reviews
            WHERE business_id = NEW.business_id
        )
    WHERE id = NEW.business_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rating updates
CREATE TRIGGER update_business_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.business_reviews
FOR EACH ROW EXECUTE FUNCTION update_business_rating();