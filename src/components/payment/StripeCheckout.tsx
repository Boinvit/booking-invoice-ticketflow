
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PlanFeatures {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

const plans: PlanFeatures[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: 'USD',
    features: [
      'Up to 50 bookings/month',
      'Basic QR code booking',
      'Client management',
      'Email support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    currency: 'USD',
    features: [
      'Unlimited bookings',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      'SMS notifications',
      'Payment processing'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    currency: 'USD',
    features: [
      'Everything in Professional',
      'API access',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee'
    ]
  }
];

const StripeCheckout = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    if (planId === 'starter') {
      toast.success('You are already on the free starter plan!');
      return;
    }

    setLoading(planId);

    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: {
          planId,
          userId: user.id,
          userEmail: user.email
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to create checkout session. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    if (amount === 0) return 'Free';
    return `$${amount}/mo`;
  };

  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">Upgrade your account to unlock more features</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative hover:shadow-lg transition-shadow ${
                plan.popular ? 'border-royal-red' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-royal-red">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-3xl font-bold">{formatPrice(plan.price, plan.currency)}</div>
                <CardDescription>
                  {plan.id === 'starter' && 'Perfect for getting started'}
                  {plan.id === 'professional' && 'For growing businesses'}
                  {plan.id === 'enterprise' && 'For large organizations'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-royal-red hover:bg-royal-red-accent' 
                      : plan.id === 'enterprise'
                      ? 'border-royal-red text-royal-red hover:bg-royal-red hover:text-white'
                      : 'bg-royal-red hover:bg-royal-red-accent'
                  }`}
                  variant={plan.id === 'enterprise' ? 'outline' : 'default'}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? (
                    'Processing...'
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      {plan.id === 'starter' ? 'Current Plan' : 
                       plan.id === 'enterprise' ? 'Contact Sales' : 'Subscribe Now'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
          <p className="text-xs text-gray-500">
            Secure payments powered by Stripe. Your payment information is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;
