
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { UserBusiness } from '@/types/subscription';

interface SubscriptionHeaderProps {
  userBusiness: UserBusiness | null;
}

export const SubscriptionHeader = ({ userBusiness }: SubscriptionHeaderProps) => {
  return (
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
  );
};
