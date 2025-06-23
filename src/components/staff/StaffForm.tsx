
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface StaffFormProps {
  staff?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const StaffForm = ({ staff, onSuccess, onCancel }: StaffFormProps) => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  const [specialties, setSpecialties] = useState<string[]>(staff?.specialties || []);
  const [newSpecialty, setNewSpecialty] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: staff?.name || '',
      email: staff?.email || '',
      phone: staff?.phone || '',
      is_active: staff?.is_active ?? true,
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

  const createStaffMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!business) {
        throw new Error('No business found');
      }

      const staffData = {
        business_id: business.id,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        is_active: data.is_active,
        specialties: specialties,
      };

      if (staff) {
        const { error } = await supabase
          .from('staff')
          .update(staffData)
          .eq('id', staff.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('staff')
          .insert([staffData]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(staff ? 'Staff member updated successfully' : 'Staff member added successfully');
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      onSuccess?.();
    },
    onError: (error) => {
      handleError(error, { customMessage: 'Failed to save staff member' });
    },
  });

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  const onSubmit = (data: any) => {
    createStaffMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Staff member's full name"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="staff@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>
        )}
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
        <Label>Specialties</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={newSpecialty}
            onChange={(e) => setNewSpecialty(e.target.value)}
            placeholder="Add a specialty"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
          />
          <Button type="button" onClick={addSpecialty} variant="outline">
            Add
          </Button>
        </div>
        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                {specialty}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSpecialty(specialty)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          {...register('is_active')}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={createStaffMutation.isPending}
          className="flex-1"
        >
          {createStaffMutation.isPending 
            ? (staff ? 'Updating...' : 'Adding...') 
            : (staff ? 'Update Staff Member' : 'Add Staff Member')
          }
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
