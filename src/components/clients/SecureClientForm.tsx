
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useInputSanitizer } from '@/components/input-validation/InputSanitizer';
import { useSecureBusinessAccess } from '@/hooks/useSecureBusinessAccess';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface SecureClientFormProps {
  client?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const SecureClientForm = ({ client, onSuccess, onCancel }: SecureClientFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { 
    sanitizeText, 
    sanitizeEmail, 
    sanitizePhone, 
    validateRequired 
  } = useInputSanitizer();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ClientFormData>({
    defaultValues: {
      name: client?.name || '',
      email: client?.email || '',
      phone: client?.phone || '',
      address: client?.address || '',
      notes: client?.notes || '',
    }
  });

  // Get user's business with security validation
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

  const { hasAccess, validateBusinessAccess } = useSecureBusinessAccess(business?.id);

  // Watch form values for real-time sanitization
  const watchedValues = watch();

  React.useEffect(() => {
    // Sanitize inputs in real-time with proper typing
    if (watchedValues.email) {
      const sanitized = sanitizeEmail(watchedValues.email);
      if (sanitized !== watchedValues.email) {
        setValue('email', sanitized);
      }
    }
    if (watchedValues.phone) {
      const sanitized = sanitizePhone(watchedValues.phone);
      if (sanitized !== watchedValues.phone) {
        setValue('phone', sanitized);
      }
    }
    if (watchedValues.name) {
      const sanitized = sanitizeText(watchedValues.name, { maxLength: 100 });
      if (sanitized !== watchedValues.name) {
        setValue('name', sanitized);
      }
    }
    if (watchedValues.address) {
      const sanitized = sanitizeText(watchedValues.address, { maxLength: 200 });
      if (sanitized !== watchedValues.address) {
        setValue('address', sanitized);
      }
    }
    if (watchedValues.notes) {
      const sanitized = sanitizeText(watchedValues.notes, { maxLength: 500 });
      if (sanitized !== watchedValues.notes) {
        setValue('notes', sanitized);
      }
    }
  }, [watchedValues, setValue, sanitizeText, sanitizeEmail, sanitizePhone]);

  const createClientMutation = useMutation({
    mutationFn: async (data: ClientFormData) => {
      if (!business) {
        throw new Error('No business found');
      }

      // Validate business access
      if (!validateBusinessAccess(business.id)) {
        throw new Error('Access denied');
      }

      // Additional server-side validation
      const nameError = validateRequired(data.name, 'Name');
      if (nameError) {
        throw new Error(nameError);
      }

      if (data.email && !data.email.includes('@')) {
        throw new Error('Invalid email format');
      }

      // Sanitize all inputs before sending to database
      const clientData = {
        business_id: business.id,
        name: sanitizeText(data.name, { maxLength: 100 }),
        email: data.email ? sanitizeEmail(data.email) : null,
        phone: data.phone ? sanitizePhone(data.phone) : null,
        address: data.address ? sanitizeText(data.address, { maxLength: 200 }) : null,
        notes: data.notes ? sanitizeText(data.notes, { maxLength: 500 }) : null,
      };

      // Validate sanitized data
      if (!clientData.name) {
        throw new Error('Name cannot be empty after validation');
      }

      if (client) {
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', client.id)
          .eq('business_id', business.id); // Double-check ownership

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
      toast.error(`Failed to save client: ${error.message}`);
    },
  });

  const onSubmit = (data: ClientFormData) => {
    if (!hasAccess) {
      toast.error('Access denied: Invalid business access');
      return;
    }
    createClientMutation.mutate(data);
  };

  if (!hasAccess && business?.id) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Access denied. You do not have permission to manage this business.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register('name', { 
            required: 'Name is required',
            maxLength: { value: 100, message: 'Name must be less than 100 characters' }
          })}
          placeholder="Client's full name"
          maxLength={100}
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
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format'
            },
            maxLength: { value: 254, message: 'Email must be less than 254 characters' }
          })}
          placeholder="client@example.com"
          maxLength={254}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          {...register('phone', {
            maxLength: { value: 20, message: 'Phone number must be less than 20 characters' }
          })}
          placeholder="+1 (555) 123-4567"
          maxLength={20}
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register('address', {
            maxLength: { value: 200, message: 'Address must be less than 200 characters' }
          })}
          placeholder="Street address, city, state"
          maxLength={200}
        />
        {errors.address && (
          <p className="text-sm text-red-500 mt-1">{errors.address.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register('notes', {
            maxLength: { value: 500, message: 'Notes must be less than 500 characters' }
          })}
          placeholder="Additional notes about the client..."
          rows={3}
          maxLength={500}
        />
        {errors.notes && (
          <p className="text-sm text-red-500 mt-1">{errors.notes.message as string}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={createClientMutation.isPending || !hasAccess}
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
