
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaystackPaymentProps {
  amount: number;
  email: string;
  currency?: string;
  onSuccess: (reference: string) => void;
  onError?: (error: any) => void;
  metadata?: Record<string, any>;
  disabled?: boolean;
}

// Paystack public key - safe to store in frontend
const PAYSTACK_PUBLIC_KEY = 'pk_live_bf23005a6155ba4e9865b77bd07eebf4c2f52512';

export const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  amount,
  email,
  currency = 'KES',
  onSuccess,
  onError,
  metadata = {},
  disabled = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (!window.PaystackPop) {
      toast.error('Payment system not loaded. Please refresh the page.');
      return;
    }

    setIsProcessing(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100, // Convert to kobo
      currency: currency,
      metadata: metadata,
      callback: function(response: any) {
        setIsProcessing(false);
        toast.success('Payment successful!');
        onSuccess(response.reference);
      },
      onClose: function() {
        setIsProcessing(false);
        toast.info('Payment cancelled');
      }
    });

    handler.openIframe();
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="w-full bg-green-600 hover:bg-green-700"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing Payment...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          Pay {currency} {amount.toLocaleString()}
        </>
      )}
    </Button>
  );
};

// Add Paystack script to document head
export const loadPaystackScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
};

// Type declaration for Paystack
declare global {
  interface Window {
    PaystackPop: any;
  }
}
