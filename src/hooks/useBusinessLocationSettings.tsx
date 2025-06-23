
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface LocationData {
  latitude: string;
  longitude: string;
  service_radius_km: string;
  show_on_map: boolean;
  map_description: string;
}

export const useBusinessLocationSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: '',
    longitude: '',
    service_radius_km: '10',
    show_on_map: true,
    map_description: ''
  });

  // Fetch business data with proper error handling
  const { data: business, isLoading, error } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching business:', error);
        return null;
      }
      return data;
    },
    enabled: !!user,
  });

  // Fetch business settings
  const { data: settings } = useQuery({
    queryKey: ['business-settings', business?.id],
    queryFn: async () => {
      if (!business) return null;
      const { data, error } = await supabase
        .from('business_settings')
        .select('show_on_map, map_description, business_id')
        .eq('business_id', business.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching settings:', error);
        return null;
      }
      return data;
    },
    enabled: !!business,
  });

  // Update location data when business data loads
  useEffect(() => {
    if (business) {
      setLocationData({
        latitude: business.latitude?.toString() || '',
        longitude: business.longitude?.toString() || '',
        service_radius_km: business.service_radius_km?.toString() || '10',
        show_on_map: settings?.show_on_map ?? true,
        map_description: settings?.map_description || ''
      });
    }
  }, [business, settings]);

  const updateLocationMutation = useMutation({
    mutationFn: async (data: LocationData) => {
      if (!business) throw new Error('No business found');

      // Update business location
      const businessUpdate: any = {
        service_radius_km: parseInt(data.service_radius_km)
      };
      
      if (data.latitude) businessUpdate.latitude = parseFloat(data.latitude);
      if (data.longitude) businessUpdate.longitude = parseFloat(data.longitude);

      const { error: businessError } = await supabase
        .from('businesses')
        .update(businessUpdate)
        .eq('id', business.id);

      if (businessError) throw businessError;

      // Update or create business settings
      const { error: settingsError } = await supabase
        .from('business_settings')
        .upsert({
          business_id: business.id,
          show_on_map: data.show_on_map,
          map_description: data.map_description
        }, {
          onConflict: 'business_id'
        });

      if (settingsError) throw settingsError;
    },
    onSuccess: () => {
      toast.success('Location settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user-business'] });
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
    },
    onError: (error) => {
      console.error('Error updating location:', error);
      toast.error('Failed to update location settings');
    },
  });

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setLocationData(prev => ({
      ...prev,
      latitude: location.lat.toString(),
      longitude: location.lng.toString()
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLocationMutation.mutate(locationData);
  };

  return {
    business,
    settings,
    isLoading,
    error,
    locationData,
    setLocationData,
    handleLocationSelect,
    handleSubmit,
    updateLocationMutation
  };
};
