
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Calendar, Clock, CreditCard, User } from 'lucide-react';
import { format } from 'date-fns';

interface PaymentReceiptProps {
  booking: {
    id: string;
    service_name: string;
    booking_date: string;
    booking_time: string;
    total_amount: number;
    currency: string;
    customer_name: string;
    customer_email: string;
    payment_reference: string;
    ticket_number?: string;
  };
  onClose: () => void;
}

export const PaymentReceipt = ({ booking, onClose }: PaymentReceiptProps) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KES') {
      return `KES ${price.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <CardTitle className="text-green-600 text-xl">Payment Successful!</CardTitle>
        <p className="text-gray-600">Your booking has been confirmed</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{booking.service_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {format(new Date(booking.booking_date), 'PPP')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{booking.booking_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{booking.customer_name}</span>
            </div>
            {booking.ticket_number && (
              <div className="flex justify-between">
                <span className="text-gray-600">Ticket #:</span>
                <Badge variant="outline" className="text-xs">
                  {booking.ticket_number}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Payment Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-bold text-lg">
                {formatPrice(booking.total_amount, booking.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">Paystack</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {booking.payment_reference}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <Badge className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3 pt-4">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to {booking.customer_email}
          </p>
          
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Print Receipt
            </Button>
            <Button onClick={onClose} size="sm" className="flex-1">
              Done
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          <p>Keep this receipt for your records</p>
          <p>Transaction completed on {format(new Date(), 'PPP p')}</p>
        </div>
      </CardContent>
    </Card>
  );
};
