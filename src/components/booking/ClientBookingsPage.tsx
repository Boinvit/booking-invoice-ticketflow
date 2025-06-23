
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { PaystackPayment, loadPaystackScript } from '../payment/PaystackPayment';
import { BookingsList } from './BookingsList';
import { PaymentModal } from './PaymentModal';

export const ClientBookingsPage = () => {
  const { user } = useAuth();
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<any>(null);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  React.useEffect(() => {
    loadPaystackScript()
      .then(() => setPaystackLoaded(true))
      .catch(() => toast.error('Failed to load payment system'));
  }, []);

  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['client-bookings', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          services:service_id(name, price, currency),
          businesses:business_id(name, address, city, currency)
        `)
        .eq('customer_email', user.email)
        .order('booking_date', { ascending: false })
        .order('booking_time', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.email,
  });

  const handlePaymentSuccess = async (reference: string, bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'completed',
          payment_reference: reference
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast.success('Payment completed successfully!');
      setSelectedBookingForPayment(null);
      refetch();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Payment successful but failed to update booking status');
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KES') {
      return `KES ${price.toLocaleString()}`;
    }
    return `${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">You haven't made any bookings yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your service bookings</p>
        </div>

        <BookingsList
          bookings={bookings}
          onPaymentClick={setSelectedBookingForPayment}
          paystackLoaded={paystackLoaded}
        />

        {selectedBookingForPayment && (
          <PaymentModal
            booking={selectedBookingForPayment}
            userEmail={user?.email || ''}
            onSuccess={handlePaymentSuccess}
            onClose={() => setSelectedBookingForPayment(null)}
            formatPrice={formatPrice}
          />
        )}
      </div>
    </div>
  );
};
