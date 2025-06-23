
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ClientFormProps {
  client?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ClientForm = ({ client, onSuccess, onCancel }: ClientFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: client?.name || '',
      email: client?.email || '',
      phone: client?.phone || '',
      address: client?.address || '',
      notes: client?.notes || '',
    }
  });

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

  const createClientMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!business) {
        throw new Error('No business found');
      }

      const clientData = {
        business_id: business.id,
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        notes: data.notes || null,
      };

      if (client) {
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', client.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('clients')
          .insert([clientData]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(client ? 'Client updated successfully' : 'Client added successfully');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Client error:', error);
      toast.error('Failed to save client');
    },
  });

  const onSubmit = (data: any) => {
    createClientMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Client's full name"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="client@example.com"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          {...register('phone')}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="Street address, city, state"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder="Additional notes about the client..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={createClientMutation.isPending}
          className="flex-1"
        >
          {createClientMutation.isPending 
            ? (client ? 'Updating...' : 'Adding...') 
            : (client ? 'Update Client' : 'Add Client')
          }
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
