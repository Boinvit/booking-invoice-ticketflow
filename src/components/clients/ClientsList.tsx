<<<<<<< HEAD
=======

>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
<<<<<<< HEAD
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Edit, Calendar } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/loading-skeleton';
=======
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, MapPin, Edit, Calendar } from 'lucide-react';
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
import { format } from 'date-fns';

interface ClientsListProps {
  onEditClient?: (client: any) => void;
}

export const ClientsList = ({ onEditClient }: ClientsListProps) => {
  const { user } = useAuth();
<<<<<<< HEAD
  const { handleError } = useErrorHandler();
=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

<<<<<<< HEAD
  const { data: clients, isLoading, error } = useQuery({
=======
  const { data: clients, isLoading } = useQuery({
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
    queryKey: ['clients', business?.id],
    queryFn: async () => {
      if (!business) return [];
      
      const { data: clientsData, error } = await supabase
        .from('clients')
        .select(`
          *,
          bookings(id, booking_date, status)
        `)
        .eq('business_id', business.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return clientsData;
    },
    enabled: !!business,
  });

<<<<<<< HEAD
  // Handle error using useEffect
  React.useEffect(() => {
    if (error) {
      handleError(error, { customMessage: 'Failed to load clients' });
    }
  }, [error, handleError]);

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-red-600 mb-4">
            <User className="mx-auto h-12 w-12 mb-2" />
            <p>Failed to load clients</p>
          </div>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
<<<<<<< HEAD
          <CardSkeleton key={i} />
=======
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
        ))}
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
          <p className="text-gray-600">
            Add your first client to start managing their information and bookings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => {
        const totalBookings = client.bookings?.length || 0;
        const lastBooking = client.bookings?.[0];
        
        return (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {totalBookings} booking{totalBookings !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditClient?.(client)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {client.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {client.email}
                </div>
              )}
              
              {client.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {client.phone}
                </div>
              )}
<<<<<<< HEAD
=======
              
              {client.address && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {client.address}
                </div>
              )}
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca

              {lastBooking && (
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t">
                  <Calendar className="h-4 w-4" />
                  Last booking: {format(new Date(lastBooking.booking_date), 'MMM d, yyyy')}
                </div>
              )}

              {client.notes && (
                <div className="text-sm text-gray-600 pt-2 border-t">
                  <p className="line-clamp-2">{client.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
