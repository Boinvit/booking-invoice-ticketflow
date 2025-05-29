
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PesapalPayment } from '@/components/payment/PesapalPayment';
import { PaymentSuccess } from '@/components/payment/PaymentSuccess';
import { LoadingSpinner } from '@/components/subscription/LoadingSpinner';
import { SubscriptionHeader } from '@/components/subscription/SubscriptionHeader';
import { MobilePaymentNotice } from '@/components/subscription/MobilePaymentNotice';
import { PlanGrid } from '@/components/subscription/PlanGrid';
import { ContactSalesSection } from '@/components/subscription/ContactSalesSection';
import { SubscriptionPlan, UserBusiness } from '@/types/subscription';
import { useState } from 'react';

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: subscriptionPlans, isLoading: plansLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');
      
      if (error) throw error;
      return data as SubscriptionPlan[];
    },
  });

  const { data: userBusiness } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('id, subscription_plan, subscription_status')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data as UserBusiness;
    },
    enabled: !!user,
  });

  const handleUpgrade = (plan: SubscriptionPlan) => {
    if (plan.price_monthly === 0) {
      toast.info('You are already on the free plan');
      return;
    }
    
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleContinueAfterSuccess = () => {
    setShowSuccess(false);
    setSelectedPlan(null);
    toast.success('Subscription activated successfully!');
    window.location.reload();
  };

  if (plansLoading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (showSuccess) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <PaymentSuccess onContinue={handleContinueAfterSuccess} />
        </div>
      </DashboardLayout>
    );
  }

  if (showPayment && selectedPlan && userBusiness) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">
              Upgrade to {selectedPlan.name} plan - KES {selectedPlan.price_monthly.toLocaleString()}/month
            </p>
          </div>

          <PesapalPayment
            businessId={userBusiness.id}
            planId={selectedPlan.id}
            planName={selectedPlan.name}
            amount={selectedPlan.price_monthly}
            onSuccess={handlePaymentSuccess}
          />

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowPayment(false)}
            >
              Back to Plans
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <SubscriptionHeader userBusiness={userBusiness} />
        <MobilePaymentNotice />
        
        {subscriptionPlans && (
          <PlanGrid 
            plans={subscriptionPlans}
            userBusiness={userBusiness}
            onUpgrade={handleUpgrade}
          />
        )}
        
        <ContactSalesSection />
      </div>
    </DashboardLayout>
  );
}
