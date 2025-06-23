
import React from 'react';
import { PlanCard } from './PlanCard';
import { SubscriptionPlan, UserBusiness } from '@/types/subscription';

interface PlanGridProps {
  plans: SubscriptionPlan[];
  userBusiness: UserBusiness | null;
  onUpgrade: (plan: SubscriptionPlan) => void;
}

export const PlanGrid = ({ plans, userBusiness, onUpgrade }: PlanGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <PlanCard 
          key={plan.id}
          plan={plan}
          userBusiness={userBusiness}
          onUpgrade={onUpgrade}
        />
      ))}
    </div>
  );
};
