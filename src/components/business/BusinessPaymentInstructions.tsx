
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building, Info, Phone } from 'lucide-react';

interface PaymentInstructionsProps {
  business: {
    name: string;
    payment_instructions?: string;
    preferred_payment_methods?: string[];
    phone_number?: string;
    mpesa_number?: string;
    bank_account?: string;
    bank_name?: string;
  };
}

export const BusinessPaymentInstructions: React.FC<PaymentInstructionsProps> = ({ business }) => {
  const paymentMethods = business.preferred_payment_methods || [];
  
  // Default payment instructions if none provided
  const defaultInstructions = `Payment for ${business.name}:
${business.mpesa_number ? `• M-Pesa: ${business.mpesa_number}` : ''}
${business.bank_account && business.bank_name ? `• Bank: ${business.bank_name} - ${business.bank_account}` : ''}
• You can also pay online using cards, mobile money, or bank transfer
• For assistance, contact us at ${business.phone_number || 'our business number'}`;

  const instructions = business.payment_instructions || defaultInstructions;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-800 text-base md:text-lg">
          <CreditCard className="w-5 h-5" />
          Payment Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Payment Instructions */}
        <div className="p-3 md:p-4 bg-white rounded-lg border border-orange-200">
          <div className="flex items-start gap-2 mb-2">
            <Info className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
            <h4 className="font-medium text-orange-800 text-sm md:text-base">How to Pay</h4>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {instructions}
          </div>
        </div>

        {/* Payment Methods Badges */}
        {paymentMethods.length > 0 && (
          <div>
            <h4 className="font-medium text-orange-800 mb-2 text-sm md:text-base">
              Accepted Payment Methods
            </h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-orange-700 border-orange-300 text-xs md:text-sm px-2 py-1"
                >
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {business.mpesa_number && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-200">
              <Smartphone className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="font-medium text-gray-700 text-sm">M-Pesa:</span>
                <div className="text-green-600 font-mono text-sm truncate">
                  {business.mpesa_number}
                </div>
              </div>
            </div>
          )}

          {business.bank_account && business.bank_name && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-200">
              <Building className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Bank:</span>
                  <div className="text-blue-600 truncate">{business.bank_name}</div>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Account:</span>
                  <div className="text-blue-600 font-mono text-xs truncate">
                    {business.bank_account}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        {business.phone_number && (
          <div className="text-sm text-gray-600 pt-2 border-t border-orange-200">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>For payment assistance, contact:</span>
              <span className="font-medium text-orange-700">{business.phone_number}</span>
            </div>
          </div>
        )}

        {/* Online Payment Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-800 font-medium">
              Secure Online Payment Available
            </span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            You can also pay securely online with cards, mobile money, or bank transfer through our payment system.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
