
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaystackPayment } from '../payment/PaystackPayment';

interface PaymentModalProps {
  booking: any;
  userEmail: string;
  onSuccess: (reference: string, bookingId: string) => void;
  onClose: () => void;
  formatPrice: (price: number, currency: string) => string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  booking,
  userEmail,
  onSuccess,
  onClose,
  formatPrice
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Payment</CardTitle>
          <p className="text-sm text-gray-600">
            Pay for: {booking.services?.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Amount:</span>
              <span className="font-bold">
                {formatPrice(
                  booking.total_amount,
                  booking.services?.currency || 
                  booking.businesses?.currency || 'KES'
                )}
              </span>
            </div>
          </div>

          <PaystackPayment
            amount={booking.total_amount}
            email={userEmail}
            currency={
              booking.services?.currency || 
              booking.businesses?.currency || 'KES'
            }
            onSuccess={(reference) => onSuccess(reference, booking.id)}
            metadata={{
              booking_id: booking.id,
              service_name: booking.services?.name,
              business_name: booking.businesses?.name
            }}
          />

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
