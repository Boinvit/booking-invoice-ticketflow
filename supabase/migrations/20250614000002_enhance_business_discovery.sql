
-- Ensure all necessary fields are available for business discovery
-- Update the business_discovery view to include map preferences from business_settings

DROP VIEW IF EXISTS public.business_discovery;

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
  COALESCE(bs.show_on_map, true) as show_on_map,
  bs.map_description,
  array_agg(DISTINCT s.category) FILTER (WHERE s.category IS NOT NULL) as service_categories,
  array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as service_names,
  COUNT(DISTINCT s.id) as total_services
FROM public.businesses b
LEFT JOIN public.business_settings bs ON b.id = bs.business_id
LEFT JOIN public.services s ON b.id = s.business_id AND s.is_active = true
WHERE b.is_active = true 
  AND b.latitude IS NOT NULL 
  AND b.longitude IS NOT NULL
  AND COALESCE(bs.show_on_map, true) = true
GROUP BY b.id, b.name, b.description, b.address, b.city, b.country, 
         b.phone, b.email, b.website, b.logo_url, b.featured_image_url,
         b.latitude, b.longitude, b.average_rating, b.total_reviews,
         b.business_hours, b.is_verified, b.service_radius_km, b.currency,
         bs.show_on_map, bs.map_description;

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
    bd.*,
    public.calculate_distance(search_lat, search_lng, bd.latitude, bd.longitude) as distance_km
  FROM public.business_discovery bd
  WHERE public.calculate_distance(search_lat, search_lng, bd.latitude, bd.longitude) <= search_radius_km
    AND (search_query IS NULL OR 
         bd.name ILIKE '%' || search_query || '%' OR 
         bd.description ILIKE '%' || search_query || '%' OR
         EXISTS (
           SELECT 1 FROM unnest(bd.service_categories) AS cat 
           WHERE cat ILIKE '%' || search_query || '%'
         ) OR
         EXISTS (
           SELECT 1 FROM unnest(bd.service_names) AS sname 
           WHERE sname ILIKE '%' || search_query || '%'
         ))
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql STABLE;
