
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

export const MobilePaymentNotice = () => {
  return (
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
  );
};
