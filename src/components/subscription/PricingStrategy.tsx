
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Building2, Gift } from 'lucide-react';

const PRICING_PLANS = [
  {
    id: 'freemium',
    name: 'Free Trial',
    price: 0,
    period: '7 days free',
    description: 'Perfect for getting started',
    icon: <Gift className="h-6 w-6" />,
    badge: 'Most Popular',
    features: [
      'Unlimited bookings',
      'Customer notifications',
      'Mobile app access',
      'Email support',
      'Unlimited staff members',
      'Advanced analytics'
    ],
    limitations: [
      'Limited to 7 days',
      'Boinvit branding included',
      'Basic support only'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 1020,
    period: 'per month',
    description: 'For growing businesses',
    icon: <Zap className="h-6 w-6" />,
    features: [
      '1000 bookings per month',
      'Advanced service categories',
      'Real-time notifications',
      '5 Max staff',
      'Advanced analytics',
      'Custom branding',
      'Payment gateway integration',
      'Google Maps integration'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 2900,
    period: 'per month',
    description: 'For established businesses',
    icon: <Crown className="h-6 w-6" />,
    badge: 'Best Value',
    features: [
      'Everything in Standard',
      'Multi-location support',
      'Advanced reporting & insights',
      'API access',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
      'Training & onboarding',
      'Advanced security features',
      'Backup & disaster recovery'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate',
    price: 9900,
    period: 'per month',
    description: 'For enterprise organizations',
    icon: <Building2 className="h-6 w-6" />,
    features: [
      'Everything in Premium',
      'Enterprise-grade security',
      'Custom development',
      'SLA guarantees',
      'On-premise deployment options',
      'Advanced compliance tools',
      'Custom contracts',
      'Unlimited locations',
      'Advanced user management',
      '24/7 dedicated support'
    ]
  }
];

export const PricingStrategy = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('freemium');

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start with our 7-day free trial, then choose the plan that best fits your business needs. 
          All plans include core booking management features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''} ${plan.badge ? 'border-blue-500' : ''}`}
          >
            {plan.badge && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                {plan.badge}
              </Badge>
            )}
            
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center text-blue-600">
                {plan.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  ${plan.price}
                  {plan.price > 0 && <span className="text-sm font-normal text-gray-600">/{plan.period}</span>}
                </div>
                {plan.price === 0 && (
                  <div className="text-sm text-blue-600 font-medium">{plan.period}</div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={selectedPlan === plan.id ? 'default' : 'outline'}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.price === 0 ? 'Start Free Trial' : 'Choose Plan'}
              </Button>

              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 font-medium mb-1">Limitations:</p>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="text-xs text-gray-500">
                      • {limitation}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold text-blue-900">Competitive Advantage Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">🎯 Market Positioning</h4>
            <p className="text-blue-700">
              Competing with Booking.com & Buupass through localized service excellence, 
              lower fees, and specialized transport integration.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">💡 Innovation Edge</h4>
            <p className="text-blue-700">
              AI-powered booking optimization, real-time transport tracking, 
              and integrated payment systems for emerging markets.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">🌍 Global Reach</h4>
            <p className="text-blue-700">
              Multi-currency support, country-specific features, 
              and partnerships with local transport providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
