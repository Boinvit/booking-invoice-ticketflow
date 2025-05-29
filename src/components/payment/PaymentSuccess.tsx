
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface PaymentSuccessProps {
  onContinue: () => void;
}

export const PaymentSuccess = ({ onContinue }: PaymentSuccessProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <CardTitle className="text-green-600">Payment Successful!</CardTitle>
        <p className="text-gray-600">Your subscription has been activated</p>
      </CardHeader>
      
      <CardContent className="space-y-4 text-center">
        <p className="text-sm text-gray-700">
          Thank you for your payment. Your subscription is now active and you can access all premium features.
        </p>
        
        <Button onClick={onContinue} className="w-full" size="lg">
          Continue to Dashboard
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
