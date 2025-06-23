
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { toast } from 'sonner';
import { validateBusinessForm } from '@/components/settings/business/BusinessSettingsValidation';

export const useBusinessSettings = () => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: business, isLoading, error } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Handle error using useEffect
  useEffect(() => {
    if (error) {
      handleError(error, { customMessage: 'Failed to load business settings' });
    }
  }, [error, handleError]);

  const updateBusinessMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!business) throw new Error('No business found');

      const updates = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        website: formData.get('website') as string,
        description: formData.get('description') as string,
        city: formData.get('city') as string,
        country: formData.get('country') as string,
        logo_url: formData.get('logo_url') as string || null,
      };

      const { error } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', business.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Business settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user-business'] });
      setErrors({});
    },
    onError: (error) => {
      handleError(error, { customMessage: 'Failed to update business settings' });
    },
  });

  const handleSubmit = (formData: FormData) => {
    const newErrors = validateBusinessForm(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      updateBusinessMutation.mutate(formData);
    }
  };

  return {
    business,
    isLoading,
    errors,
    isUpdating: updateBusinessMutation.isPending,
    handleSubmit
  };
};
