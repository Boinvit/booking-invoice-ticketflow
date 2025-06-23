
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Globe, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  supported_countries: string[];
  fees: string;
  processing_time: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '💳',
    supported_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'SG'],
    fees: '2.9% + $0.30',
    processing_time: 'Instant'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '🅿️',
    supported_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR'],
    fees: '3.49% + fixed fee',
    processing_time: 'Instant'
  },
  {
    id: 'wise',
    name: 'Wise (TransferWise)',
    logo: '🌍',
    supported_countries: ['US', 'GB', 'EU', 'AU', 'CA', 'SG', 'JP', 'IN'],
    fees: '0.5% - 2%',
    processing_time: '1-2 days'
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    logo: '🌊',
    supported_countries: ['NG', 'GH', 'KE', 'UG', 'TZ', 'RW', 'ZA'],
    fees: '1.4% - 3.8%',
    processing_time: 'Instant'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    logo: '⚡',
    supported_countries: ['IN', 'MY', 'SG'],
    fees: '2% + GST',
    processing_time: 'Instant'
  }
];

export const InternationalPaymentGateway = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleSetupPayment = (methodId: string) => {
    setSelectedMethod(methodId);
    toast.success(`Setting up ${PAYMENT_METHODS.find(m => m.id === methodId)?.name} integration...`);
    
    // In a real implementation, this would redirect to the payment provider's setup flow
    switch (methodId) {
      case 'stripe':
        window.open('https://dashboard.stripe.com/register', '_blank');
        break;
      case 'paypal':
        window.open('https://developer.paypal.com/developer/applications/', '_blank');
        break;
      case 'wise':
        window.open('https://wise.com/business/', '_blank');
        break;
      case 'flutterwave':
        window.open('https://dashboard.flutterwave.com/signup', '_blank');
        break;
      case 'razorpay':
        window.open('https://dashboard.razorpay.com/signup', '_blank');
        break;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            International Payment Gateway Setup
          </CardTitle>
          <p className="text-gray-600">
            Choose and configure payment methods for your global customer base
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {PAYMENT_METHODS.map((method) => (
              <Card key={method.id} className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.logo}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{method.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {method.supported_countries.slice(0, 4).map((country) => (
                            <Badge key={country} variant="outline" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                          {method.supported_countries.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{method.supported_countries.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          {method.fees}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Zap className="h-3 w-3" />
                          {method.processing_time}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleSetupPayment(method.id)}
                        className="mt-2"
                        size="sm"
                      >
                        Setup
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">PCI DSS Compliance</h4>
              <p className="text-sm text-gray-600">
                All payment processors are PCI DSS Level 1 certified for maximum security
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Data Encryption</h4>
              <p className="text-sm text-gray-600">
                End-to-end encryption ensures customer payment data is always protected
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Fraud Protection</h4>
              <p className="text-sm text-gray-600">
                Advanced fraud detection and prevention systems protect your business
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Global Coverage</h4>
              <p className="text-sm text-gray-600">
                Accept payments from customers worldwide in 100+ currencies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
