
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, BookOpen, Crown, Clock } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface SubscriptionStatusProps {
  subscription: any;
  onUpgrade: () => void;
  businessId: string;
}

export const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  subscription,
  onUpgrade,
  businessId
}) => {
  if (!subscription) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            No Active Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Start your 14-day free trial to access all features.
          </p>
          <Button onClick={onUpgrade} className="w-full">
            Start Free Trial
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isTrialPlan = subscription.plan_type === 'trial';
  const trialEndsAt = subscription.trial_ends_at ? new Date(subscription.trial_ends_at) : null;
  const daysRemaining = trialEndsAt ? differenceInDays(trialEndsAt, new Date()) : 0;
  const isExpiring = daysRemaining <= 3 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0 && isTrialPlan;

  const getPlanDisplayName = (planType: string) => {
    switch (planType) {
      case 'trial': return 'Free Trial';
      case 'starter': return 'Starter Plan';
      case 'medium': return 'Business Plan';
      case 'premium': return 'Enterprise Plan';
      default: return planType;
    }
  };

  const getStatusColor = () => {
    if (isExpired) return 'bg-red-100 text-red-800';
    if (isExpiring) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Card className={`${isExpiring ? 'border-orange-200 bg-orange-50' : isExpired ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            {getPlanDisplayName(subscription.plan_type)}
          </div>
          <Badge className={getStatusColor()}>
            {subscription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isTrialPlan && trialEndsAt && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>
              {isExpired ? 'Trial expired on' : 'Trial ends on'} {format(trialEndsAt, 'PPP')}
              {!isExpired && ` (${daysRemaining} days remaining)`}
            </span>
          </div>
        )}

        {subscription.staff_limit && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            <span>Staff limit: {subscription.staff_limit}</span>
          </div>
        )}

        {subscription.bookings_limit && (
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Monthly bookings limit: {subscription.bookings_limit.toLocaleString()}</span>
          </div>
        )}

        {(isTrialPlan || isExpiring || isExpired) && (
          <div className="pt-4 border-t">
            <Button 
              onClick={onUpgrade} 
              className="w-full"
              variant={isExpired ? 'default' : 'outline'}
            >
              {isExpired ? 'Reactivate Subscription' : 'Upgrade Plan'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
