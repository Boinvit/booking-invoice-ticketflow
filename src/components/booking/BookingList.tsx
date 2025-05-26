
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, DollarSign, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface BookingListProps {
  businessId?: string;
  clientView?: boolean;
}

export const BookingList = ({ businessId, clientView = false }: BookingListProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (businessId) return { id: businessId };
      
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const actualBusinessId = businessId || business?.id;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings-list', actualBusinessId, clientView],
    queryFn: async () => {
      if (!actualBusinessId) return [];
      
      let query = supabase
        .from('bookings')
        .select(`
          *,
          services:service_id(name, price),
          clients:client_id(name, email),
          staff:staff_id(name)
        `)
        .eq('business_id', actualBusinessId)
        .order('booking_date', { ascending: true })
        .order('booking_time', { ascending: true });

      if (clientView) {
        // For client view, only show their bookings
        const { data: client } = await supabase
          .from('clients')
          .select('id')
          .eq('business_id', actualBusinessId)
          .eq('email', user?.email)
          .single();
        
        if (client) {
          query = query.eq('client_id', client.id);
        } else {
          return [];
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!actualBusinessId,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Booking cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['bookings-list'] });
    },
    onError: () => {
      toast.error('Failed to cancel booking');
    },
  });

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

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600">
            {clientView ? 'You have no bookings at this time.' : 'No bookings have been made yet.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{booking.services?.name}</h3>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(booking.booking_date), 'PPP')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {booking.booking_time}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${booking.total_amount}
                  </div>
                </div>

                {!clientView && booking.clients && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    {booking.clients.name} ({booking.clients.email})
                  </div>
                )}

                {booking.staff && (
                  <div className="text-sm text-gray-600">
                    Staff: {booking.staff.name}
                  </div>
                )}

                {booking.notes && (
                  <div className="text-sm text-gray-600">
                    Notes: {booking.notes}
                  </div>
                )}
              </div>

              {booking.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cancelBookingMutation.mutate(booking.id)}
                  disabled={cancelBookingMutation.isPending}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
