
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  featured_image_url: string;
  latitude: number;
  longitude: number;
  average_rating: number;
  total_reviews: number;
  business_hours: any;
  is_verified: boolean;
  service_radius_km: number;
  currency: string;
  show_on_map: boolean;
  map_description: string;
  service_categories: string[];
  service_names: string[];
  total_services: number;
  distance_km?: number;
}

export const useBusinessMapData = (searchQuery: string) => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: -1.2921, lng: 36.8219 });
        }
      );
    } else {
      setUserLocation({ lat: -1.2921, lng: 36.8219 });
    }
  }, []);

  const fetchRegularBusinesses = async (): Promise<Business[]> => {
    let query = supabase
      .from('businesses')
      .select(`
        id, name, description, address, city, country, phone, email, website,
        logo_url, featured_image_url, latitude, longitude, average_rating,
        total_reviews, business_hours, is_verified, service_radius_km, currency,
        business_settings!inner(show_on_map, map_description)
      `)
      .eq('is_active', true)
      .eq('business_settings.show_on_map', true)
      .order('average_rating', { ascending: false });

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query.limit(100);
    if (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }
    
    return (data || []).map((business: any) => ({
      ...business,
      show_on_map: business.business_settings?.show_on_map ?? true,
      map_description: business.business_settings?.map_description || business.description,
      service_categories: [],
      service_names: [],
      total_services: 0
    }));
  };

  const { data: businesses = [], isLoading } = useQuery({
    queryKey: ['businesses-map', searchQuery, userLocation],
    queryFn: async () => {
      try {
        if (userLocation && searchQuery) {
          const { data, error } = await supabase
            .rpc('search_businesses_by_location', {
              search_lat: userLocation.lat,
              search_lng: userLocation.lng,
              search_radius_km: 50,
              search_query: searchQuery || null
            });
          
          if (error) {
            console.error('RPC Error:', error);
            return await fetchRegularBusinesses();
          }
          return (data || []) as Business[];
        } else {
          return await fetchRegularBusinesses();
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
        return [] as Business[];
      }
    },
    enabled: true,
  });

  return {
    businesses,
    isLoading,
    userLocation
  };
};
