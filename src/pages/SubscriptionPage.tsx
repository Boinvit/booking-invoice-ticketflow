
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EnhancedSubscriptionPlans } from '@/components/subscription/EnhancedSubscriptionPlans';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';
import { useSubscription } from '@/hooks/useSubscription';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Users, CheckCircle } from 'lucide-react';

const SubscriptionPage = () => {
  const { user } = useAuth();
  const { subscription, isLoading, createSubscription, isCreatingSubscription } = useSubscription();

  // Get user's business
  const { data: business, isLoading: isBusinessLoading } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSelectPlan = (planId: string, interval: string, amount: number) => {
    if (!business) return;
    
    console.log('Selected plan:', { planId, interval, amount, businessId: business.id });
    createSubscription({ 
      planType: planId, 
      businessId: business.id,
      paymentInterval: interval 
    });
  };

  if (isLoading || isBusinessLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <LoadingSkeleton lines={6} />
        </div>
      </DashboardLayout>
    );
  }

  if (!business) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Plans</h1>
            <Card className="border-orange-200 bg-orange-50 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-orange-800">Business Setup Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 mb-4">
                  You need to set up your business profile before subscribing to a plan.
                </p>
                <button
                  onClick={() => window.location.href = '/app/settings'}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Set Up Business
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Flexible pricing options to match your business needs. Start with a free trial, 
            pay as you grow, or choose a subscription plan with great discounts for longer commitments.
          </p>
        </div>

        {subscription && (
          <div className="max-w-2xl mx-auto">
            <SubscriptionStatus
              subscription={subscription}
              onUpgrade={() => {}}
              businessId={business.id}
            />
          </div>
        )}

        {/* Payment Method Information */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Enhanced Payment Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Multiple Options</h4>
                    <p className="text-sm text-gray-600">Cards, bank transfer, USSD via Paystack</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <EnhancedSubscriptionPlans
          currentPlan={subscription?.plan_type}
          businessId={business.id}
          customerEmail={user?.email}
          onSelectPlan={handleSelectPlan}
          isLoading={isCreatingSubscription}
        />

        {/* Plan Comparison Details */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Plan Details & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <h4 className="font-semibold">Free Trial</h4>
                </div>
                <ul className="space-y-1 text-gray-600">
                  <li>• KES 10 initialization fee</li>
                  <li>• 7 days full access</li>
                  <li>• All features unlocked</li>
                  <li>• Perfect for testing</li>
                  <li>• No monthly charges</li>
                </ul>
              </div>
             
              <div className="space-y-3">
                <Badge className="bg-blue-100 text-blue-800 mb-2">Popular Choice</Badge>
                <h4 className="font-semibold">Subscription Plans</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Starter: 5 staff, 1K bookings</li>
                  <li>• Business: 15 staff, 3K bookings</li>
                  <li>• Enterprise: Unlimited</li>
                  <li>• Up to 30% discount</li>
                  <li>• Predictable monthly costs</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">All Plans Include</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• QR code booking system</li>
                  <li>• WhatsApp notifications</li>
                  <li>• Online booking calendar</li>
                  <li>• Client management</li>
                  <li>• Payment processing</li>
                  <li>• Analytics dashboard</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
