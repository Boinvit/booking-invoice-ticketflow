
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Smartphone } from 'lucide-react';
import { SubscriptionPlan, UserBusiness } from '@/types/subscription';

interface PlanCardProps {
  plan: SubscriptionPlan;
  userBusiness: UserBusiness | null;
  onUpgrade: (plan: SubscriptionPlan) => void;
}

export const PlanCard = ({ plan, userBusiness, onUpgrade }: PlanCardProps) => {
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

  const isCurrentPlan = userBusiness?.subscription_plan === plan.slug;

  return (
    <Card 
      className={`relative ${getPlanColor(plan.slug)} ${
        isCurrentPlan ? 'ring-2 ring-purple-500' : ''
      }`}
    >
      {isCurrentPlan && (
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
          {isCurrentPlan ? (
            <Button disabled className="w-full">
              Current Plan
            </Button>
          ) : (
            <Button 
              onClick={() => onUpgrade(plan)}
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
  );
};
