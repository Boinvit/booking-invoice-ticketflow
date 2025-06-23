
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, CheckCircle, Info, Smartphone, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  price: number;
  currency: string;
}

interface ClientPaymentSectionProps {
  services: Service[];
  clientEmail: string;
  businessName: string;
  businessCurrency?: string;
  paymentInstructions?: string;
  business?: {
    id?: string;
    phone?: string;
    whatsapp?: string;
    facebook?: string;
    email?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  onPaymentSuccess?: (reference: string, serviceId: string) => void;
}

export const ClientPaymentSection: React.FC<ClientPaymentSectionProps> = ({
  services,
  clientEmail,
  businessName,
  businessCurrency = 'KES',
  paymentInstructions,
  business,
  onPaymentSuccess
}) => {
  const [showSTKPush, setShowSTKPush] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KES' || currency === 'KSH') {
      return `KSh ${price.toLocaleString()}`;
    }
    return `${currency} ${price.toLocaleString()}`;
  };

  const handleSTKPush = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsProcessing(true);
    try {
      const totalAmount = services.reduce((sum, service) => sum + service.price, 0);
      
      const response = await fetch('/api/mpesa-stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          amount: totalAmount,
          planType: 'service_booking',
          businessId: business?.id || '',
          customerEmail: clientEmail
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('STK push sent! Please check your phone to complete payment.');
        if (onPaymentSuccess) {
          onPaymentSuccess(result.reference, services[0]?.id);
        }
      } else {
        toast.error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('STK Push error:', error);
      toast.error('Payment failed. Please try again.');
    }
    setIsProcessing(false);
  };

  const openGoogleMaps = () => {
    if (business?.latitude && business?.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`;
      window.open(url, '_blank');
    } else if (business?.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
      window.open(url, '_blank');
    }
  };

  const openWhatsApp = () => {
    if (business?.whatsapp || business?.phone) {
      const number = business?.whatsapp || business?.phone;
      const cleanNumber = number?.replace(/\D/g, '');
      const url = `https://wa.me/${cleanNumber}`;
      window.open(url, '_blank');
    }
  };

  const openFacebook = () => {
    if (business?.facebook) {
      window.open(business.facebook, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Service Payment - {businessName}
          </CardTitle>
          <p className="text-gray-600">
            Please follow the payment instructions below to complete your booking.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {services.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No services available for payment</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <h4 className="font-medium">Selected Services</h4>
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-lg bg-blue-50 border-blue-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">Service for {clientEmail}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">
                          {formatPrice(service.price, service.currency || businessCurrency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Contact {businessName}</h4>
                <div className="flex flex-wrap gap-2">
                  {business?.phone && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`tel:${business.phone}`, '_self')}
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  )}
                  {(business?.whatsapp || business?.phone) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openWhatsApp}
                      className="flex items-center gap-2 text-green-600 border-green-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  )}
                  {business?.email && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${business.email}`, '_self')}
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  )}
                  {business?.facebook && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openFacebook}
                      className="flex items-center gap-2 text-blue-600 border-blue-300"
                    >
                      Facebook
                    </Button>
                  )}
                  {(business?.address || (business?.latitude && business?.longitude)) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openGoogleMaps}
                      className="flex items-center gap-2 text-red-600 border-red-300"
                    >
                      <MapPin className="w-4 h-4" />
                      Directions
                    </Button>
                  )}
                </div>
              </div>

              {paymentInstructions && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Info className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                    <h4 className="font-medium text-orange-800">Payment Instructions</h4>
                  </div>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    {paymentInstructions}
                  </p>
                </div>
              )}

              {/* STK Push Section */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Quick Payment Options</h4>
                  <Button
                    variant="outline"
                    onClick={() => setShowSTKPush(!showSTKPush)}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    M-Pesa STK Push
                  </Button>
                </div>

                {showSTKPush && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                    <div>
                      <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={handleSTKPush}
                      disabled={isProcessing || !phoneNumber}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Smartphone className="w-4 h-4 mr-2" />
                          Pay KSh {services.reduce((sum, s) => sum + s.price, 0).toLocaleString()} via M-Pesa
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Next Steps</span>
                </div>
                <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                  <li>Follow the payment instructions above</li>
                  <li>Complete your payment using the specified method</li>
                  <li>Keep your payment reference for confirmation</li>
                  <li>Your booking will be confirmed once payment is verified</li>
                </ol>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
