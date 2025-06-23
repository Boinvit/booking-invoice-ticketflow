
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Shield, Zap } from 'lucide-react';

export const PaystackIntegrationSection = () => {
  const publicKey = 'pk_live_bf23005a6155ba4e9865b77bd07eebf4c2f52512';
  
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CreditCard className="w-5 h-5" />
          Paystack Payment Integration
        </CardTitle>
        <p className="text-sm text-gray-600">
          Accept payments from your clients using Paystack
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Integration Status */}
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-medium text-green-900">Paystack Integration Active</h4>
              <p className="text-sm text-green-700">Ready to accept payments from clients</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Live Mode
          </Badge>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Secure Payments</span>
            </div>
            <p className="text-sm text-gray-600">
              PCI DSS compliant payment processing
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span className="font-medium">Instant Processing</span>
            </div>
            <p className="text-sm text-gray-600">
              Real-time payment confirmation
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-600" />
              <span className="font-medium">Multiple Payment Methods</span>
            </div>
            <p className="text-sm text-gray-600">
              Cards, Bank transfers, Mobile money
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Automatic Reconciliation</span>
            </div>
            <p className="text-sm text-gray-600">
              Seamless integration with your bookings
            </p>
          </div>
        </div>

        {/* Supported Currencies */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Supported Currencies</h4>
          <div className="flex flex-wrap gap-2">
            {['KES', 'USD', 'GHS', 'NGN', 'ZAR'].map((currency) => (
              <Badge key={currency} variant="outline" className="text-xs">
                {currency}
              </Badge>
            ))}
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">How It Works</h5>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Clients select services and proceed to payment</li>
            <li>2. Secure payment is processed through Paystack</li>
            <li>3. Payment confirmation is received instantly</li>
            <li>4. Booking is automatically confirmed</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
