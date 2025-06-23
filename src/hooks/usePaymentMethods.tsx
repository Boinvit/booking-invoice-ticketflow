
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  type: 'bank' | 'mobile' | 'card' | 'cash';
  name: string;
  details: string;
  is_active: boolean;
}

export const usePaymentMethods = (businessId: string) => {
  const queryClient = useQueryClient();

  const { data: paymentMethods = [], isLoading } = useQuery({
    queryKey: ['payment-methods', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        type: item.type as 'bank' | 'mobile' | 'card' | 'cash'
      }));
    },
    enabled: !!businessId,
  });

  const addPaymentMethodMutation = useMutation({
    mutationFn: async (method: Omit<PaymentMethod, 'id'>) => {
      const { error } = await supabase
        .from('payment_methods')
        .insert({
          business_id: businessId,
          ...method
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Payment method added successfully');
      queryClient.invalidateQueries({ queryKey: ['payment-methods', businessId] });
    },
    onError: (error) => {
      console.error('Error adding payment method:', error);
      toast.error('Failed to add payment method');
    },
  });

  const updatePaymentMethodMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PaymentMethod> }) => {
      const { error } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Payment method updated successfully');
      queryClient.invalidateQueries({ queryKey: ['payment-methods', businessId] });
    },
    onError: (error) => {
      console.error('Error updating payment method:', error);
      toast.error('Failed to update payment method');
    },
  });

  const removePaymentMethodMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Payment method removed successfully');
      queryClient.invalidateQueries({ queryKey: ['payment-methods', businessId] });
    },
    onError: (error) => {
      console.error('Error removing payment method:', error);
      toast.error('Failed to remove payment method');
    },
  });

  return {
    paymentMethods,
    isLoading,
    addPaymentMethod: addPaymentMethodMutation.mutate,
    updatePaymentMethod: updatePaymentMethodMutation.mutate,
    removePaymentMethod: removePaymentMethodMutation.mutate,
    isAdding: addPaymentMethodMutation.isPending,
    isUpdating: updatePaymentMethodMutation.isPending,
    isRemoving: removePaymentMethodMutation.isPending,
  };
};
