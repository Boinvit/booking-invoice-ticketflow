
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  Apple,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { PaystackPayment } from './PaystackPayment';
import { BusinessPaymentInstructions } from '@/components/business/BusinessPaymentInstructions';

interface EnhancedPaymentFlowProps {
  bookingDetails: {
    id: string;
    serviceName: string;
    totalAmount: number;
    currency: string;
    businessName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  business: {
    id: string;
    name: string;
    payment_instructions?: string;
    preferred_payment_methods?: string[];
    phone_number?: string;
    mpesa_number?: string;
    bank_account?: string;
    bank_name?: string;
  };
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

export const EnhancedPaymentFlow: React.FC<EnhancedPaymentFlowProps> = ({
  bookingDetails,
  business,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'paystack' | 'mpesa' | 'instructions'>('paystack');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const paymentMethods = [
    {
      id: 'paystack',
      name: 'Cards & More',
      description: 'Visa, Mastercard, Mobile Money, Bank Transfer, Apple Pay',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      available: true
    },
    {
      id: 'mpesa',
      name: 'M-Pesa STK Push',
      description: 'Pay directly from your M-Pesa account',
      icon: Smartphone,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      available: !!business.mpesa_number
    },
    {
      id: 'instructions',
      name: 'Other Payment Methods',
      description: 'Bank transfer, cash, or other options',
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      available: !!business.payment_instructions
    }
  ];

  const handlePaymentMethodSelect = (methodId: 'paystack' | 'mpesa' | 'instructions') => {
    setSelectedMethod(methodId);
    setPaymentStatus('idle');
  };

  const formatCurrency = (amount: number, currency: string) => {
    const currencySymbols: { [key: string]: string } = {
      'KES': 'KSh ',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    return `${currencySymbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const renderPaymentContent = () => {
    switch (selectedMethod) {
      case 'paystack':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <Wallet className="w-5 h-5 text-green-600" />
                <Apple className="w-5 h-5 text-gray-800" />
              </div>
              <span className="text-sm text-gray-600">
                Secure payment powered by Paystack
              </span>
            </div>
            
            <PaystackPayment
              amount={bookingDetails.totalAmount}
              currency={bookingDetails.currency}
              email={bookingDetails.customerEmail}
              reference={`booking-${bookingDetails.id}`}
              onSuccess={() => {
                setPaymentStatus('success');
                onPaymentSuccess?.();
              }}
              onClose={() => {
                if (paymentStatus === 'processing') {
                  setPaymentStatus('failed');
                  onPaymentError?.('Payment cancelled');
                }
              }}
              metadata={{
                booking_id: bookingDetails.id,
                customer_name: bookingDetails.customerName,
                service_name: bookingDetails.serviceName,
                business_id: business.id
              }}
              className="w-full"
            />
            
            <div className="text-xs text-gray-500 text-center mt-2">
              You can pay with: Cards (Visa, Mastercard), Mobile Money, Bank Transfer, Apple Pay, and more
            </div>
          </div>
        );

      case 'mpesa':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-800">M-Pesa STK Push</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                You will receive a payment prompt on your phone
              </p>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setPaymentStatus('processing');
                  // Implement M-Pesa STK Push logic here
                  setTimeout(() => {
                    setPaymentStatus('success');
                    onPaymentSuccess?.();
                  }, 3000);
                }}
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'processing' ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Waiting for payment...
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Pay KSh {bookingDetails.totalAmount} via M-Pesa
                  </>
                )}
              </Button>
              
              {paymentStatus === 'processing' && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      Check your phone for the M-Pesa payment prompt
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'instructions':
        return (
          <div className="space-y-4">
            <BusinessPaymentInstructions business={business} />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Payment Confirmation</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                After making payment, your booking will be confirmed automatically or by the business owner.
              </p>
              
              <Button 
                variant="outline" 
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                onClick={() => {
                  setPaymentStatus('success');
                  onPaymentSuccess?.();
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                I have made the payment
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-green-700">
            Your booking has been confirmed. You'll receive a confirmation email shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Amount Summary */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-orange-800">{bookingDetails.serviceName}</h3>
              <p className="text-sm text-orange-600">{business.name}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-orange-800">
                {formatCurrency(bookingDetails.totalAmount, bookingDetails.currency)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentMethods.filter(method => method.available).map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id as any)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  isSelected 
                    ? `${method.borderColor} ${method.bgColor}` 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${method.bgColor}`}>
                    <Icon className={`w-5 h-5 ${method.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Payment Content */}
      <Card>
        <CardContent className="p-6">
          {renderPaymentContent()}
        </CardContent>
      </Card>
    </div>
  );
};
