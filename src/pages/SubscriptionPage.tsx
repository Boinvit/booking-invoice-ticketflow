
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { PesapalPayment } from '@/components/payment/PesapalPayment';
import { useState } from 'react';

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const { data: subscriptionPlans, isLoading: plansLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');
      
      if (error) throw error;
      return data;
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
      return data;
    },
    enabled: !!user,
  });

  const getPlanIcon = (slug: string) => {
    switch (slug) {
      case 'free': return <Zap className="h-6 w-6" />;
      case 'basic': return <Star className="h-6 w-6" />;
      case 'business': return <Crown className="h-6 w-6" />;
      case 'corporate': return <Crown className="h-6 w-6 text-purple-600" />;
      default: return <Zap className="h-6 w-6" />;
    }
  };

  const getPlanColor = (slug: string) => {
    switch (slug) {
      case 'free': return 'bg-gray-50 border-gray-200';
      case 'basic': return 'bg-blue-50 border-blue-200';
      case 'business': return 'bg-purple-50 border-purple-200';
      case 'corporate': return 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleUpgrade = (plan: any) => {
    if (plan.price_monthly === 0) {
      toast.info('You are already on the free plan');
      return;
    }
    
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedPlan(null);
    toast.success('Subscription activated successfully!');
    // Refresh queries
    window.location.reload();
  };

  if (plansLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
          <p className="text-gray-600">Choose the perfect plan for your business needs</p>
          
          {userBusiness?.subscription_status === 'active' && (
            <div className="mt-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                Active Subscription
              </Badge>
            </div>
          )}
        </div>

        {/* Mobile Money Payment Notice */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-800">Mobile Money Payments Available</h3>
                <p className="text-sm text-green-700">
                  Pay easily using M-Pesa, Airtel Money, or any Visa/Mastercard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans?.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${getPlanColor(plan.slug)} ${
                userBusiness?.subscription_plan === plan.slug ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {userBusiness?.subscription_plan === plan.slug && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Current Plan
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  {getPlanIcon(plan.slug)}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  KES {plan.price_monthly.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                {plan.price_yearly && plan.price_yearly > 0 && (
                  <p className="text-sm text-gray-600">
                    or KES {plan.price_yearly.toLocaleString()}/year (save 17%)
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{plan.description}</p>
                
                <div className="space-y-2">
                  {plan.features && Array.isArray(plan.features) && plan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  {userBusiness?.subscription_plan === plan.slug ? (
                    <Button disabled className="w-full">
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleUpgrade(plan)}
                      className="w-full"
                      variant={plan.slug === 'corporate' ? 'default' : 'outline'}
                    >
                      {plan.price_monthly > 0 ? (
                        <span className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Pay with M-Pesa
                        </span>
                      ) : (
                        'Get Started'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a custom solution?</h2>
          <p className="text-gray-600 mb-6">
            Contact us for enterprise pricing and custom features tailored to your business needs.
          </p>
          <Button size="lg">Contact Sales</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
