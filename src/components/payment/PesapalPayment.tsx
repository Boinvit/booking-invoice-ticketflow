
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CreditCard, Building } from 'lucide-react';
import { toast } from 'sonner';

interface PesapalPaymentProps {
  businessId: string;
  planId: string;
  planName: string;
  amount: number;
  onSuccess?: () => void;
}

export const PesapalPayment = ({ businessId, planId, planName, amount, onSuccess }: PesapalPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: async () => {
      setIsProcessing(true);
      
      // Get auth token
      const authResponse = await supabase.functions.invoke('pesapal-auth');
      if (authResponse.error) {
        throw new Error('Failed to authenticate with payment gateway');
      }

      // Create payment
      const paymentResponse = await supabase.functions.invoke('pesapal-payment', {
        body: {
          businessId,
          planId,
          amount,
          token: authResponse.data.token,
        },
      });

      if (paymentResponse.error) {
        throw new Error('Failed to initiate payment');
      }

      return paymentResponse.data;
    },
    onSuccess: (data) => {
      // Redirect to Pesapal payment page
      window.location.href = data.redirect_url;
    },
    onError: (error) => {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    },
  });

  const handlePayment = () => {
    paymentMutation.mutate();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-2 justify-center">
          <Smartphone className="h-5 w-5 text-green-600" />
          Mobile Money Payment
        </CardTitle>
        <p className="text-sm text-gray-600">
          Pay securely using M-Pesa, Airtel Money, or Card
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Plan:</span>
            <span>{planName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Amount:</span>
            <span className="text-lg font-bold">KES {amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Supported Payment Methods:</p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="flex items-center gap-1">
              <Smartphone className="h-3 w-3" />
              M-Pesa
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Smartphone className="h-3 w-3" />
              Airtel Money
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" />
              Visa/Mastercard
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              Bank Transfer
            </Badge>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          {isProcessing ? 'Processing...' : `Pay KES ${amount.toLocaleString()}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          You will be redirected to the secure payment page to complete your transaction
        </p>
      </CardContent>
    </Card>
  );
};
