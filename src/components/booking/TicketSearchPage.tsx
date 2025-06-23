
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Ticket, Calendar, CreditCard, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const TicketSearchPage = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const navigate = useNavigate();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['ticket-search', ticketNumber],
    queryFn: async () => {
      if (!ticketNumber.trim()) return null;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          services:service_id(name, price, currency),
          businesses:business_id(name, address, city, currency)
        `)
        .or(`ticket_number.eq.${ticketNumber.trim()},ticket_code.eq.${ticketNumber.trim()}`)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    },
    enabled: searchTriggered && !!ticketNumber.trim(),
  });

  const handleSearch = () => {
    if (!ticketNumber.trim()) {
      toast.error('Please enter a ticket number');
      return;
    }
    setSearchTriggered(true);
  };

  const handleViewMyBookings = () => {
    if (booking?.customer_email) {
      // Store email in session storage for the client bookings page
      sessionStorage.setItem('clientEmail', booking.customer_email);
      navigate('/client-bookings');
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Booking</h1>
          <p className="text-gray-600">Enter your ticket number to view booking details</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Ticket Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ticket">Ticket Number</Label>
              <Input
                id="ticket"
                type="text"
                placeholder="Enter your ticket number (e.g., TKT-20241221-ABC123)"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} className="w-full">
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search Booking'}
            </Button>
          </CardContent>
        </Card>

        {searchTriggered && !isLoading && !booking && !error && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6 text-center">
              <Ticket className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-medium text-yellow-900 mb-2">No Booking Found</h3>
              <p className="text-yellow-700">
                We couldn't find a booking with that ticket number. Please check and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {booking && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                Booking Found
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg">{booking.services?.name}</h3>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
                <Badge className={getPaymentStatusColor(booking.payment_status)}>
                  {booking.payment_status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(booking.booking_date), 'PPP')} at {booking.booking_time}
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {formatPrice(
                    booking.total_amount, 
                    booking.services?.currency || booking.businesses?.currency || 'KES'
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {booking.businesses?.name} - {booking.businesses?.address}, {booking.businesses?.city}
              </div>

              {booking.notes && (
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Notes:</strong> {booking.notes}
                </div>
              )}

              <div className="pt-4 border-t">
                <Button onClick={handleViewMyBookings} className="w-full">
                  View All My Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
