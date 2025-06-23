
import React from 'react';
import { BookingCard } from './BookingCard';

interface BookingsListProps {
  bookings: any[];
  onPaymentClick: (booking: any) => void;
  paystackLoaded: boolean;
}

export const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  onPaymentClick,
  paystackLoaded
}) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KES') {
      return `KES ${price.toLocaleString()}`;
    }
    return `${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onPaymentClick={onPaymentClick}
          paystackLoaded={paystackLoaded}
          formatPrice={formatPrice}
          getStatusColor={getStatusColor}
          getPaymentStatusColor={getPaymentStatusColor}
        />
      ))}
    </div>
  );
};
