
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Star, Zap, Users, Calendar, CreditCard } from 'lucide-react';
import { PaystackIntegration } from '@/components/payment/PaystackIntegration';
import { MobilePaymentNotice } from './MobilePaymentNotice';

interface Plan {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
  staffLimit?: number;
  bookingsLimit?: number;
  popular?: boolean;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    basePrice: 10,
    description: '7 days full access with one-time setup fee',
    features: [
      'All features unlocked',
      '7 days trial period',
      'WhatsApp notifications',
      'QR code booking system',
      'Basic analytics',
      'Email support'
    ],
    icon: <Clock className="w-5 h-5" />
  },
  {
    id: 'starter',
    name: 'Starter',
    basePrice: 1020,
    description: 'Perfect for small businesses',
    features: [
      'Up to 5 staff members',
      '1,000 bookings/month',
      'WhatsApp notifications',
      'QR code booking system',
      'Advanced analytics',
      'Priority support'
    ],
    staffLimit: 5,
    bookingsLimit: 1000,
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'medium',
    name: 'Business',
    basePrice: 2900,
    description: 'Growing businesses with multiple staff',
    features: [
      'Up to 15 staff members',
      '3,000 bookings/month',
      'All Starter features',
      'Custom branding',
      'Advanced reports',
      'Phone support'
    ],
    staffLimit: 15,
    bookingsLimit: 3000,
    popular: true,
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'premium',
    name: 'Enterprise',
    basePrice: 9900,
    description: 'Large organizations with unlimited needs',
    features: [
      'Unlimited staff members',
      'Unlimited bookings',
      'All Business features',
      'White-label solution',
      'Custom integrations',
      'Dedicated support'
    ],
    icon: <Star className="w-5 h-5" />
  }
];

const intervals = [
  { id: 'monthly', name: 'Monthly', multiplier: 1, discount: 0 },
  { id: 'quarterly', name: 'Quarterly', multiplier: 3, discount: 5 },
  { id: 'biannual', name: 'Bi-annual', multiplier: 6, discount: 10 },
  { id: 'annual', name: 'Annual', multiplier: 12, discount: 15 },
  { id: '2year', name: '2 Years', multiplier: 24, discount: 20 },
  { id: '3year', name: '3 Years', multiplier: 36, discount: 30 }
];

interface EnhancedSubscriptionPlansProps {
  currentPlan?: string;
  businessId: string;
  customerEmail?: string;
  onSelectPlan: (planId: string, interval: string, amount: number) => void;
  isLoading?: boolean;
}

export const EnhancedSubscriptionPlans: React.FC<EnhancedSubscriptionPlansProps> = ({
  currentPlan,
  businessId,
  customerEmail,
  onSelectPlan,
  isLoading = false
}) => {
  const [selectedInterval, setSelectedInterval] = useState('monthly');
  const [showPaystackIntegration, setShowPaystackIntegration] = useState(false);

  const calculatePrice = (basePrice: number, interval: any) => {
    const totalBeforeDiscount = basePrice * interval.multiplier;
    const discountAmount = (totalBeforeDiscount * interval.discount) / 100;
    return totalBeforeDiscount - discountAmount;
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === 'trial') {
      onSelectPlan(planId, selectedInterval, 10);
    } else {
      setShowPaystackIntegration(true);
    }
  };

  const selectedIntervalData = intervals.find(i => i.id === selectedInterval);

  if (showPaystackIntegration) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setShowPaystackIntegration(false)}
          className="mb-4"
        >
          ← Back to Plans
        </Button>
        <PaystackIntegration />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MobilePaymentNotice />
      
      {/* Interval Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Choose Billing Interval</CardTitle>
          <p className="text-center text-gray-600">Save more with longer commitments</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {intervals.map((interval) => (
              <Button
                key={interval.id}
                variant={selectedInterval === interval.id ? "default" : "outline"}
                className="relative"
                onClick={() => setSelectedInterval(interval.id)}
              >
                <div className="text-center">
                  <div className="font-medium">{interval.name}</div>
                  {interval.discount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">
                      -{interval.discount}%
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const finalPrice = selectedIntervalData ? calculatePrice(plan.basePrice, selectedIntervalData) : plan.basePrice;
          const monthlyPrice = selectedIntervalData ? finalPrice / selectedIntervalData.multiplier : plan.basePrice;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''} ${currentPlan === plan.id ? 'bg-blue-50' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.icon}
                  {plan.name}
                </CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    KES {Math.round(monthlyPrice).toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </div>
                  {selectedIntervalData && selectedIntervalData.discount > 0 && (
                    <div className="text-sm text-green-600">
                      Save {selectedIntervalData.discount}% with {selectedIntervalData.name.toLowerCase()} billing
                    </div>
                  )}
                  {selectedIntervalData && selectedIntervalData.multiplier > 1 && (
                    <div className="text-sm text-gray-600">
                      Billed KES {Math.round(finalPrice).toLocaleString()} {selectedIntervalData.name.toLowerCase()}
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isLoading || currentPlan === plan.id}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : currentPlan === plan.id ? (
                    "Current Plan"
                  ) : plan.id === 'trial' ? (
                    "Start Free Trial"
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
