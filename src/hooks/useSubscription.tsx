
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface SubscriptionData {
  id: string;
  user_id: string;
  business_id: string;
  plan_type: 'trial' | 'starter' | 'medium' | 'premium';
  status: 'active' | 'expired' | 'cancelled';
  trial_ends_at: string | null;
  current_period_end: string;
  paystack_reference?: string;
  staff_limit?: number;
  bookings_limit?: number;
  payment_interval?: string;
  created_at: string;
  updated_at: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch current subscription
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }
      
      return data as SubscriptionData | null;
    },
    enabled: !!user,
  });

  // Check if subscription is active
  const isActive = subscription && 
    subscription.status === 'active' && 
    new Date(subscription.current_period_end) > new Date();

  // Create or upgrade subscription
  const createSubscriptionMutation = useMutation({
    mutationFn: async ({ 
      planType, 
      businessId, 
      paymentInterval = 'monthly' 
    }: { 
      planType: string; 
      businessId: string;
      paymentInterval?: string;
    }) => {
      if (planType === 'trial') {
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 14);
        
        const { data, error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user?.id,
            business_id: businessId,
            plan_type: 'trial',
            status: 'active',
            trial_ends_at: trialEndDate.toISOString(),
            current_period_end: trialEndDate.toISOString(),
            payment_interval: paymentInterval,
            staff_limit: null,
            bookings_limit: null
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Handle subscription plans with Paystack checkout
        const { data, error } = await supabase.functions.invoke('create-paystack-checkout', {
          body: { 
            planType,
            businessId,
            customerEmail: user?.email,
            paymentInterval
          }
        });
        
        if (error) throw error;
        
        if (data.url) {
          window.location.href = data.url;
        }
        
        return data;
      }
    },
    onSuccess: (data, variables) => {
      if (variables.planType === 'trial') {
        toast.success('Free trial started! You have 14 days of full access.');
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
      }
    },
    onError: (error) => {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription. Please try again.');
    },
  });

  return {
    subscription,
    isLoading,
    isActive,
    createSubscription: createSubscriptionMutation.mutate,
    isCreatingSubscription: createSubscriptionMutation.isPending,
  };
};
