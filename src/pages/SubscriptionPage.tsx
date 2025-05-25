
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function SubscriptionPage() {
  const { user } = useAuth();

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

  const { data: currentSubscription } = useQuery({
    queryKey: ['current-subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data: business } = await supabase
        .from('businesses')
        .select('subscription_plan')
        .eq('user_id', user.id)
        .single();
      
      return business?.subscription_plan || 'free';
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

  const handleUpgrade = async (planSlug: string) => {
    toast.info(`Upgrade to ${planSlug} plan feature coming soon!`);
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

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
          <p className="text-gray-600">Choose the perfect plan for your business needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans?.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${getPlanColor(plan.slug)} ${
                currentSubscription === plan.slug ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {currentSubscription === plan.slug && (
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
                  ${plan.price_monthly}
                  <span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                {plan.price_yearly && plan.price_yearly > 0 && (
                  <p className="text-sm text-gray-600">
                    or ${plan.price_yearly}/year (save 17%)
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
                  {currentSubscription === plan.slug ? (
                    <Button disabled className="w-full">
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleUpgrade(plan.slug)}
                      className="w-full"
                      variant={plan.slug === 'corporate' ? 'default' : 'outline'}
                    >
                      {plan.price_monthly > 0 ? 'Upgrade' : 'Get Started'}
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
