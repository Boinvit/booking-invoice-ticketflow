
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface InvoiceFormProps {
  invoice?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const formatPrice = (price: number, currency: string = 'USD') => {
  if (currency === 'KES') {
    return `KES ${price}`;
  }
  return `$${price}`;
};

export const InvoiceForm = ({ invoice, onSuccess, onCancel }: InvoiceFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dueDate, setDueDate] = useState<Date | undefined>(
    invoice?.due_date ? new Date(invoice.due_date) : undefined
  );
  const [selectedClient, setSelectedClient] = useState(invoice?.client_id || '');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      subtotal: invoice?.subtotal || 0,
      tax_amount: invoice?.tax_amount || 0,
      total_amount: invoice?.total_amount || 0,
      notes: invoice?.notes || '',
    }
  });

  const subtotal = watch('subtotal');
  const taxAmount = watch('tax_amount');

  useEffect(() => {
    const total = Number(subtotal) + Number(taxAmount);
    setValue('total_amount', total);
  }, [subtotal, taxAmount, setValue]);

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: clients } = useQuery({
    queryKey: ['clients', business?.id],
    queryFn: async () => {
      if (!business) return [];
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('business_id', business.id)
        .order('name');

      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}${month}${day}-${random}`;
  };

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!business || !selectedClient) {
        throw new Error('Missing required information');
      }

      const currency = business?.currency || 'KES';
      const invoiceData = {
        business_id: business.id,
        client_id: selectedClient,
        invoice_number: invoice?.invoice_number || generateInvoiceNumber(),
        subtotal: Number(data.subtotal),
        tax_amount: Number(data.tax_amount),
        total_amount: Number(data.total_amount),
        due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
        notes: data.notes,
        status: 'draft' as const,
        currency: currency,
      };

      if (invoice) {
        const { error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', invoice.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('invoices')
          .insert([invoiceData]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(invoice ? 'Invoice updated successfully' : 'Invoice created successfully');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Invoice error:', error);
      toast.error('Failed to save invoice');
    },
  });

  const onSubmit = (data: any) => {
    createInvoiceMutation.mutate(data);
  };

  const currency = business?.currency || 'KES';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <div>
        <Label htmlFor="client">Client</Label>
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger>
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {clients?.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name} ({client.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subtotal">Subtotal ({currency})</Label>
        <Input
          id="subtotal"
          type="number"
          step="0.01"
          {...register('subtotal', { required: 'Subtotal is required', min: 0 })}
        />
        {errors.subtotal && (
          <p className="text-sm text-red-500 mt-1">{errors.subtotal.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tax_amount">Tax Amount ({currency})</Label>
        <Input
          id="tax_amount"
          type="number"
          step="0.01"
          {...register('tax_amount', { min: 0 })}
        />
      </div>

      <div>
        <Label htmlFor="total_amount">Total Amount</Label>
        <Input
          id="total_amount"
          type="number"
          step="0.01"
          {...register('total_amount')}
          readOnly
          className="bg-gray-100"
        />
        <p className="text-sm text-gray-500 mt-1">
          {formatPrice(watch('total_amount') || 0, currency)}
        </p>
      </div>

      <div>
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder="Additional notes for the invoice..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={createInvoiceMutation.isPending || !selectedClient}
          className="flex-1"
        >
          {createInvoiceMutation.isPending 
            ? (invoice ? 'Updating...' : 'Creating...') 
            : (invoice ? 'Update Invoice' : 'Create Invoice')
          }
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
