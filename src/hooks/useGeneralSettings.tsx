
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { toast } from 'sonner';
import { validateGeneralForm } from '@/components/settings/general/GeneralSettingsValidation';

export const useGeneralSettings = () => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['business-settings', business?.id],
    queryFn: async () => {
      if (!business) return null;
      
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .eq('business_id', business.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!business) throw new Error('No business found');

      const updates = {
        timezone: formData.get('timezone') as string,
        currency: formData.get('currency') as string,
        booking_slot_duration_minutes: parseInt(formData.get('slot_duration') as string),
        max_bookings_per_slot: parseInt(formData.get('max_bookings') as string),
        booking_advance_days: parseInt(formData.get('booking_advance_days') as string) || 30,
        auto_confirm_bookings: formData.get('auto_confirm') === 'on',
        require_payment: formData.get('require_payment') === 'on',
        send_reminders: formData.get('send_reminders') === 'on',
        reminder_hours_before: parseInt(formData.get('reminder_hours') as string) || 24,
      };

      if (settings) {
        const { error } = await supabase
          .from('business_settings')
          .update(updates)
          .eq('business_id', business.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('business_settings')
          .insert({ ...updates, business_id: business.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success('General settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
      setErrors({});
    },
    onError: (error) => {
      handleError(error, { customMessage: 'Failed to update general settings' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newErrors = validateGeneralForm(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      updateSettingsMutation.mutate(formData);
    }
  };

  return {
    business,
    settings,
    isLoading,
    error,
    errors,
    isUpdating: updateSettingsMutation.isPending,
    handleSubmit,
    handleError
  };
};
