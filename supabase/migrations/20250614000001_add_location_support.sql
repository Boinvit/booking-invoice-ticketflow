
-- Add location fields to businesses table
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS business_hours JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS service_radius_km INTEGER DEFAULT 10;

-- Create a standard index for location-based queries (using btree for lat/lng)
CREATE INDEX IF NOT EXISTS idx_businesses_lat_lng ON public.businesses (latitude, longitude) 
WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND is_active = true;

-- Update business settings to include map preferences
ALTER TABLE public.business_settings
ADD COLUMN IF NOT EXISTS show_on_map BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS map_description TEXT,
ADD COLUMN IF NOT EXISTS contact_preferences JSONB DEFAULT '{"phone": true, "email": true, "whatsapp": false}';

-- Create a function to calculate distance between coordinates using Haversine formula
CREATE OR REPLACE FUNCTION public.calculate_distance(
  lat1 DECIMAL, lon1 DECIMAL, lat2 DECIMAL, lon2 DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    6371 * acos(
      cos(radians(lat1)) * cos(radians(lat2)) * 
      cos(radians(lon2) - radians(lon1)) + 
      sin(radians(lat1)) * sin(radians(lat2))
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create a view for public business discovery
CREATE OR REPLACE VIEW public.business_discovery AS
SELECT 
  b.id,
  b.name,
  b.description,
  b.address,
  b.city,
  b.country,
  b.phone,
  b.email,
  b.website,
  b.logo_url,
  b.featured_image_url,
  b.latitude,
  b.longitude,
  b.average_rating,
  b.total_reviews,
  b.business_hours,
  b.is_verified,
  b.service_radius_km,
  b.currency,
  array_agg(DISTINCT s.category) FILTER (WHERE s.category IS NOT NULL) as service_categories,
  array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as service_names,
  COUNT(DISTINCT s.id) as total_services
FROM public.businesses b
LEFT JOIN public.services s ON b.id = s.business_id AND s.is_active = true
WHERE b.is_active = true 
  AND b.latitude IS NOT NULL 
  AND b.longitude IS NOT NULL
GROUP BY b.id, b.name, b.description, b.address, b.city, b.country, 
         b.phone, b.email, b.website, b.logo_url, b.featured_image_url,
         b.latitude, b.longitude, b.average_rating, b.total_reviews,
         b.business_hours, b.is_verified, b.service_radius_km, b.currency;

-- Create policy for public access to business discovery
CREATE POLICY IF NOT EXISTS "Anyone can view active businesses with location" ON public.businesses
  FOR SELECT USING (is_active = true AND latitude IS NOT NULL AND longitude IS NOT NULL);
