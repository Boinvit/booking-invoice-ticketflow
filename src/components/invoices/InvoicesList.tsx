
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, Calendar, User, Edit, Send, Check } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface InvoicesListProps {
  onEditInvoice?: (invoice: any) => void;
}

export const InvoicesList = ({ onEditInvoice }: InvoicesListProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices', business?.id],
    queryFn: async () => {
      if (!business) return [];
      
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients:client_id(name, email),
          bookings:booking_id(ticket_number, booking_date)
        `)
        .eq('business_id', business.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  const updateInvoiceMutation = useMutation({
    mutationFn: async ({ invoiceId, status }: { invoiceId: string; status: string }) => {
      const updateData: any = { status };
      
      if (status === 'paid') {
        updateData.paid_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('invoices')
        .update(updateData)
        .eq('id', invoiceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice updated successfully');
    },
    onError: () => {
      toast.error('Failed to update invoice');
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
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

  if (!invoices || invoices.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
          <p className="text-gray-600">
            Create your first invoice to start billing clients.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <Card key={invoice.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{invoice.invoice_number}</h3>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {invoice.clients && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {invoice.clients.name}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${invoice.total_amount}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(invoice.created_at), 'MMM d, yyyy')}
                  </div>
                </div>

                {invoice.due_date && (
                  <div className="text-sm text-gray-600">
                    Due: {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                  </div>
                )}

                {invoice.bookings && (
                  <div className="text-sm text-gray-600">
                    Booking: {invoice.bookings.ticket_number}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {invoice.status === 'draft' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateInvoiceMutation.mutate({ 
                      invoiceId: invoice.id, 
                      status: 'sent' 
                    })}
                    disabled={updateInvoiceMutation.isPending}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                )}
                
                {invoice.status === 'sent' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateInvoiceMutation.mutate({ 
                      invoiceId: invoice.id, 
                      status: 'paid' 
                    })}
                    disabled={updateInvoiceMutation.isPending}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Paid
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditInvoice?.(invoice)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
