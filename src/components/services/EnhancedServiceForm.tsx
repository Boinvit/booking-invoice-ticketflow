
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { CURRENCIES } from '@/components/business/GlobalBusinessSettings';
import { EnhancedTransportForm } from '@/components/transport/EnhancedTransportForm';
import { ServiceFormFields } from './ServiceFormFields';
import { ServiceCurrencyField } from './ServiceCurrencyField';
import { ServiceFormActions } from './ServiceFormActions';

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  currency: string;
  is_active: boolean;
  is_transport_service: boolean;
  transport_details?: any;
}

interface EnhancedServiceFormProps {
  service?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EnhancedServiceForm = ({ service, onSuccess, onCancel }: EnhancedServiceFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isTransportService, setIsTransportService] = useState(
    service?.category?.includes('transport') || service?.category === 'bus' || service?.category === 'train' || service?.category === 'flight' || false
  );
  const [transportDetails, setTransportDetails] = useState(service?.transport_details || null);

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('id, currency')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const form = useForm<ServiceFormData>({
    defaultValues: {
      name: service?.name || '',
      description: service?.description || '',
      price: service?.price || 0,
      duration_minutes: service?.duration_minutes || 60,
      category: service?.category || '',
      currency: service?.currency || business?.currency || 'USD',
      is_active: service?.is_active ?? true,
      is_transport_service: isTransportService,
      transport_details: service?.transport_details || null,
    },
  });

  const watchedCategory = form.watch('category');
  const watchedCurrency = form.watch('currency');

  React.useEffect(() => {
    const isTransport = ['bus', 'train', 'taxi', 'flight', 'ride-sharing', 'courier', 'car-rental'].includes(watchedCategory);
    setIsTransportService(isTransport);
    form.setValue('is_transport_service', isTransport);
  }, [watchedCategory, form]);

  const getCurrencySymbol = (currency: string) => {
    const currencyData = CURRENCIES.find(c => c.code === currency);
    return currencyData?.symbol || '$';
  };

  const onSubmit = async (data: ServiceFormData) => {
    if (!business?.id) {
      toast.error('Business not found');
      return;
    }

    try {
      const serviceData = {
        ...data,
        business_id: business.id,
        transport_details: isTransportService ? transportDetails : null,
      };

      if (service) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', service.id);

        if (error) {
          console.error('Service update error:', error);
          throw error;
        }
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) {
          console.error('Service creation error:', error);
          throw error;
        }
        toast.success('Service created successfully');
      }

      queryClient.invalidateQueries({ queryKey: ['services'] });
      onSuccess();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error(`Failed to save service: ${error.message || 'Unknown error'}`);
    }
  };

  const handleTransportDetailsSubmit = (details: any) => {
    setTransportDetails(details);
    toast.success('Transport details saved');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-h-[80vh] overflow-y-auto space-y-6 p-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ServiceFormFields 
              form={form} 
              getCurrencySymbol={getCurrencySymbol}
              watchedCurrency={watchedCurrency}
            />
            
            <ServiceCurrencyField form={form} />
            
            <ServiceFormActions 
              form={form} 
              service={service} 
              onCancel={onCancel} 
            />
          </form>
        </Form>

        {isTransportService && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-medium mb-3">Transport Details</h3>
            <EnhancedTransportForm
              onSubmit={handleTransportDetailsSubmit}
              defaultValues={transportDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};
