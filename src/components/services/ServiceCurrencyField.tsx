
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CURRENCIES } from '@/components/business/GlobalBusinessSettings';

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

interface ServiceCurrencyFieldProps {
  form: UseFormReturn<ServiceFormData>;
}

export const ServiceCurrencyField = ({ form }: ServiceCurrencyFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Currency</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <span>{currency.symbol}</span>
                    <span>{currency.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
