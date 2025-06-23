
-- Add missing location fields to businesses table
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS business_hours JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS service_radius_km INTEGER DEFAULT 10;

-- Add missing map-related fields to business_settings table
ALTER TABLE public.business_settings
ADD COLUMN IF NOT EXISTS show_on_map BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS map_description TEXT,
ADD COLUMN IF NOT EXISTS contact_preferences JSONB DEFAULT '{"phone": true, "email": true, "whatsapp": false}';

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_businesses_lat_lng ON public.businesses (latitude, longitude) 
WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND is_active = true;

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

-- Create a function to search businesses by location and radius
CREATE OR REPLACE FUNCTION public.search_businesses_by_location(
  search_lat DECIMAL,
  search_lng DECIMAL,
  search_radius_km INTEGER DEFAULT 10,
  search_query TEXT DEFAULT NULL
) RETURNS TABLE(
  id UUID,
  name TEXT,
  description TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  featured_image_url TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  average_rating DECIMAL,
  total_reviews INTEGER,
  business_hours JSONB,
  is_verified BOOLEAN,
  service_radius_km INTEGER,
  currency TEXT,
  show_on_map BOOLEAN,
  map_description TEXT,
  service_categories TEXT[],
  service_names TEXT[],
  total_services BIGINT,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
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
    COALESCE(bs.show_on_map, true) as show_on_map,
    bs.map_description,
    array_agg(DISTINCT s.category) FILTER (WHERE s.category IS NOT NULL) as service_categories,
    array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as service_names,
    COUNT(DISTINCT s.id) as total_services,
    public.calculate_distance(search_lat, search_lng, b.latitude, b.longitude) as distance_km
  FROM public.businesses b
  LEFT JOIN public.business_settings bs ON b.id = bs.business_id
  LEFT JOIN public.services s ON b.id = s.business_id AND s.is_active = true
  WHERE b.is_active = true 
    AND b.latitude IS NOT NULL 
    AND b.longitude IS NOT NULL
    AND COALESCE(bs.show_on_map, true) = true
    AND public.calculate_distance(search_lat, search_lng, b.latitude, b.longitude) <= search_radius_km
    AND (search_query IS NULL OR 
         b.name ILIKE '%' || search_query || '%' OR 
         b.description ILIKE '%' || search_query || '%' OR
         EXISTS (
           SELECT 1 FROM unnest(array_agg(DISTINCT s.category)) AS cat 
           WHERE cat ILIKE '%' || search_query || '%'
         ) OR
         EXISTS (
           SELECT 1 FROM unnest(array_agg(DISTINCT s.name)) AS sname 
           WHERE sname ILIKE '%' || search_query || '%'
         ))
  GROUP BY b.id, b.name, b.description, b.address, b.city, b.country, 
           b.phone, b.email, b.website, b.logo_url, b.featured_image_url,
           b.latitude, b.longitude, b.average_rating, b.total_reviews,
           b.business_hours, b.is_verified, b.service_radius_km, b.currency,
           bs.show_on_map, bs.map_description
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql STABLE;
