
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedStaffFormProps {
  staff?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EnhancedStaffForm = ({ staff, onSuccess, onCancel }: EnhancedStaffFormProps) => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  const [specialties, setSpecialties] = useState<string[]>(staff?.specialties || []);
  const [newSpecialty, setNewSpecialty] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      name: staff?.name || '',
      email: staff?.email || '',
      phone: staff?.phone || '',
      gender: staff?.gender || '',
      is_active: staff?.is_active ?? true,
      workload: staff?.workload || '',
      shift: staff?.shift || '',
    }
  });

  const watchedGender = watch('gender');

  const { data: business, isLoading: businessLoading, error: businessError } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        console.error('Error fetching business for EnhancedStaffForm:', error);
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });

  const createStaffMutation = useMutation({
    mutationFn: async (data: any) => {
      if (businessLoading) throw new Error('Business is still loading...');
      if (!user) {
        throw new Error('You must be logged in to add staff.');
      }
      if (!business) {
        throw new Error('No business found for your account. Please complete your business setup before adding staff. (Staff entries are not permitted without this).');
      }
      if (!data.name || !data.email) {
        throw new Error('Name and email are required.');
      }
      if (!business.id) {
        throw new Error('Invalid business id.');
      }
      const staffData = {
        business_id: business.id,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        gender: data.gender || null,
        is_active: data.is_active,
        specialties: specialties,
        workload: data.workload || null,
        shift: data.shift || null,
      };

      let response;
      if (staff) {
        response = await supabase.from('staff').update(staffData).eq('id', staff.id);
      } else {
        response = await supabase.from('staff').insert([staffData]);
      }
      console.log('Staff mutation response:', response);
      if (response.error) {
        // Surfaces raw supabase database error for transparency
        throw new Error(response.error.message || 'Failed to save staff member (Supabase error)');
      }
      // If inserting, confirm at least one row inserted
      if (response.data && !staff && (!Array.isArray(response.data) || response.data.length === 0)) {
        throw new Error('Failed to create staff member. No rows inserted.');
      }
    },
    onSuccess: () => {
      toast.success(staff ? 'Staff member updated successfully' : 'Staff member added successfully');
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, { customMessage: error?.message || 'Failed to save staff member' });
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
      {businessLoading && (
        <div className="text-blue-600">Loading business details…</div>
      )}
      {!businessLoading && !business && (
        <div className="text-red-500 border border-red-300 rounded p-2">
          <strong>Set up required:</strong> You have no business profile set up.<br />
          <span>
            Please complete your business registration before adding staff members.
          </span>
        </div>
      )}
      {businessError && (
        <div className="text-red-600">
          Error loading business: {businessError.message}
        </div>
      )}

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="+254 700 000 000"
          />
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select value={watchedGender} onValueChange={(value) => setValue('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="workload">Max Weekly Workload (hours)</Label>
          <Input
            id="workload"
            {...register('workload')}
            placeholder="40"
            type="number"
          />
        </div>

        <div>
          <Label htmlFor="shift">Usual Shift</Label>
          <Input
            id="shift"
            {...register('shift')}
            placeholder="e.g. 9am - 5pm"
          />
        </div>
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
          disabled={createStaffMutation.isPending || !business}
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
