
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CreditCard, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: any;
  onPaymentClick: (booking: any) => void;
  paystackLoaded: boolean;
  formatPrice: (price: number, currency: string) => string;
  getStatusColor: (status: string) => string;
  getPaymentStatusColor: (status: string) => string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPaymentClick,
  paystackLoaded,
  formatPrice,
  getStatusColor,
  getPaymentStatusColor
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{booking.services?.name}</h3>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
              <Badge className={getPaymentStatusColor(booking.payment_status)}>
                {booking.payment_status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(booking.booking_date), 'PPP')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {booking.booking_time}
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {formatPrice(
                  booking.total_amount, 
                  booking.services?.currency || booking.businesses?.currency || 'KES'
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {booking.businesses?.name} - {booking.businesses?.address}, {booking.businesses?.city}
            </div>

            {booking.notes && (
              <div className="text-sm text-gray-600">
                <strong>Notes:</strong> {booking.notes}
              </div>
            )}

            {booking.payment_reference && (
              <div className="text-xs text-gray-500">
                Payment Reference: {booking.payment_reference}
              </div>
            )}
          </div>

          {booking.payment_status === 'pending' && booking.status !== 'cancelled' && (
            <div className="ml-4">
              <Button
                onClick={() => onPaymentClick(booking)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!paystackLoaded}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
