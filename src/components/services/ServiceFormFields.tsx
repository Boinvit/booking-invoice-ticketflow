
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SERVICE_CATEGORIES = [
  'bus', 'train', 'taxi', 'flight', 'ride-sharing', 'courier', 'car-rental',
  'beauty', 'fitness', 'health', 'education', 'consulting', 'technology',
  'home-services', 'events', 'legal', 'financial', 'food-beverage', 'retail'
];

interface ServiceFormFieldsProps {
  form: UseFormReturn<any>;
  getCurrencySymbol: (currency: string) => string;
  watchedCurrency: string;
}

export const ServiceFormFields = ({ form, getCurrencySymbol, watchedCurrency }: ServiceFormFieldsProps) => {
  const watchedCategory = form.watch('category');
  const isTransportService = ['bus', 'train', 'taxi', 'flight', 'ride-sharing', 'courier', 'car-rental'].includes(watchedCategory);
  const useExternalBooking = form.watch('use_external_booking');

  const getExternalUrl = (type: string) => {
    switch (type) {
      case 'train':
        return 'https://booking.example.com/train';
      case 'bus':
        return 'https://booking.example.com/bus';
      case 'flight':
        return 'https://booking.example.com/flight';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter service name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your service" 
                rows={3}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SERVICE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  placeholder="60"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price ({getCurrencySymbol(watchedCurrency)})</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01"
                min="0"
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isTransportService && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Transport Service Options</h3>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="use_external_booking"
              checked={useExternalBooking}
              onCheckedChange={(checked) => form.setValue('use_external_booking', checked)}
            />
            <FormLabel htmlFor="use_external_booking">Use External Booking System</FormLabel>
          </div>

          {useExternalBooking && (
            <FormField
              control={form.control}
              name="external_booking_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Booking URL</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder={getExternalUrl(watchedCategory)}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.setValue('external_booking_url', getExternalUrl(watchedCategory))}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}

      <FormField
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Active Service</FormLabel>
              <div className="text-sm text-muted-foreground">
                Make this service available for booking
              </div>
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
    </div>
  );
};
