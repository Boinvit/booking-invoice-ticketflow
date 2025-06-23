
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Globe, Shield, Zap, CheckCircle } from 'lucide-react';

export const PaymentGatewayShowcase = () => {
  const paymentMethods = [
    {
      name: 'M-Pesa',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Mobile money payments across East Africa',
      countries: ['Kenya', 'Tanzania', 'Uganda'],
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Stripe',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'International card payments',
      countries: ['Global'],
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Pesapal',
      icon: <Globe className="h-6 w-6" />,
      description: 'Comprehensive African payment solution',
      countries: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Secure Transactions',
      description: 'PCI DSS compliant with end-to-end encryption'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Real-time Processing',
      description: 'Instant payment confirmation and booking updates'
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Multi-currency Support',
      description: 'Accept payments in local and international currencies'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Integrated Payment Gateway (2025)
          </CardTitle>
          <p className="text-sm text-gray-600">
            Complete payment solutions for African and international markets
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.name} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {method.icon}
                    <h3 className="font-semibold">{method.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {method.countries.map((country) => (
                      <Badge key={country} className={method.color} variant="secondary">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0 p-2 bg-white rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Integration Setup Required</h4>
            <p className="text-sm text-blue-800 mb-3">
              To complete payment integration, you'll need to configure your payment provider credentials:
            </p>
            <div className="space-y-2 text-sm">
              <div>• <strong>Stripe:</strong> Publishable key and Secret key</div>
              <div>• <strong>M-Pesa:</strong> Consumer key, Consumer secret, and Passkey</div>
              <div>• <strong>Pesapal:</strong> Consumer key and Consumer secret</div>
            </div>
            <Button className="mt-3" size="sm">
              Configure Payment Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
