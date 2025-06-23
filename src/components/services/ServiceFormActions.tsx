
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  currency: string;
  is_active: boolean;
  is_transport_service: boolean;
  transport_details?: any;
}

interface ServiceFormActionsProps {
  form: UseFormReturn<ServiceFormData>;
  service?: any;
  onCancel: () => void;
}

export const ServiceFormActions = ({ form, service, onCancel }: ServiceFormActionsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel className="text-sm">Active Service</FormLabel>
              <FormDescription className="text-xs">
                Only active services can be booked
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1" size="sm">
          {service ? 'Update' : 'Create'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} size="sm">
          Cancel
        </Button>
      </div>
    </>
  );
};
