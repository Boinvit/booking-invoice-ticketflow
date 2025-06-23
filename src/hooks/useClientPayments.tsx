
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useClientPayments = (businessId: string) => {
  const { data: business, isLoading: businessLoading } = useQuery({
    queryKey: ['client-business', businessId],
    queryFn: async () => {
      if (!businessId) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_settings (
            currency,
            timezone,
            custom_domain
          ),
          payment_methods (
            id,
            name,
            type,
            details,
            is_active
          )
        `)
        .eq('id', businessId)
        .eq('is_active', true)
        .single();
      
      if (error) {
        console.error('Error fetching business:', error);
        throw error;
      }
      
      // Flatten the business settings and add payment instructions and other missing fields
      const businessWithSettings = {
        ...data,
        currency: data.business_settings?.[0]?.currency || data.currency || 'KES',
        timezone: data.business_settings?.[0]?.timezone || 'UTC',
        custom_domain: data.business_settings?.[0]?.custom_domain,
        payment_instructions: data.description || 'Please contact us for payment instructions.',
        preferred_payment_methods: data.payment_methods?.filter(pm => pm.is_active).map(pm => pm.name) || [],
        mpesa_number: data.phone,
        bank_account: '',
        bank_name: '',
        phone_number: data.phone,
        whatsapp: data.phone, // Use phone as WhatsApp for now
        facebook: data.website // Use website as Facebook for now
      };
      
      return businessWithSettings;
    },
    enabled: !!businessId,
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['client-services', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId)
        .eq('is_active', true)
        .order('name');
      
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!businessId,
  });

  return {
    business,
    services: services || [],
    servicesLoading: servicesLoading || businessLoading,
  };
};
