import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', country: 'Tanzania' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', country: 'Uganda' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', country: 'Ghana' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound', country: 'Egypt' },
  { code: 'MAD', symbol: 'DH', name: 'Moroccan Dirham', country: 'Morocco' }
];

const GLOBAL_TIMEZONES = [
  { value: 'UTC', label: 'UTC - Coordinated Universal Time' },
  { value: 'America/New_York', label: 'EST/EDT - Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'CST/CDT - Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'MST/MDT - Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'PST/PDT - Pacific Time (US & Canada)' },
  { value: 'Europe/London', label: 'GMT/BST - London, Dublin' },
  { value: 'Europe/Paris', label: 'CET/CEST - Central European Time' },
  { value: 'Europe/Berlin', label: 'CET/CEST - Berlin, Amsterdam' },
  { value: 'Europe/Rome', label: 'CET/CEST - Rome, Madrid' },
  { value: 'Africa/Nairobi', label: 'EAT - East Africa Time (Kenya, Tanzania)' },
  { value: 'Africa/Lagos', label: 'WAT - West Africa Time (Nigeria, Ghana)' },
  { value: 'Africa/Johannesburg', label: 'SAST - South Africa Standard Time' },
  { value: 'Africa/Cairo', label: 'EET - Eastern European Time (Egypt)' },
  { value: 'Asia/Tokyo', label: 'JST - Japan Standard Time' },
  { value: 'Asia/Shanghai', label: 'CST - China Standard Time' },
  { value: 'Asia/Hong_Kong', label: 'HKT - Hong Kong Time' },
  { value: 'Asia/Singapore', label: 'SGT - Singapore Time' },
  { value: 'Asia/Kolkata', label: 'IST - India Standard Time' },
  { value: 'Asia/Dubai', label: 'GST - Gulf Standard Time' },
  { value: 'Australia/Sydney', label: 'AEST/AEDT - Australian Eastern Time' },
  { value: 'Australia/Melbourne', label: 'AEST/AEDT - Melbourne' },
  { value: 'Pacific/Auckland', label: 'NZST/NZDT - New Zealand Time' },
  { value: 'America/Toronto', label: 'EST/EDT - Toronto' },
  { value: 'America/Vancouver', label: 'PST/PDT - Vancouver' },
  { value: 'America/Sao_Paulo', label: 'BRT - Brazil Time' },
  { value: 'America/Mexico_City', label: 'CST/CDT - Mexico City' }
];

export const GlobalBusinessSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  const { data: settings } = useQuery({
    queryKey: ['business-settings', business?.id],
    queryFn: async () => {
      if (!business) return null;
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .eq('business_id', business.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  const [formData, setFormData] = useState({
    currency: business?.currency || 'USD',
    timezone: settings?.timezone || 'UTC',
    country: business?.country || '',
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!business) throw new Error('No business found');

      // Update business currency and country
      const { error: businessError } = await supabase
        .from('businesses')
        .update({
          currency: data.currency,
          country: data.country
        })
        .eq('id', business.id);

      if (businessError) throw businessError;

      // Update business settings timezone
      const { error: settingsError } = await supabase
        .from('business_settings')
        .upsert({
          business_id: business.id,
          timezone: data.timezone,
          currency: data.currency
        }, {
          onConflict: 'business_id'
        });

      if (settingsError) throw settingsError;
    },
    onSuccess: () => {
      toast.success('Global settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user-business'] });
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingsMutation.mutate(formData);
  };

  const selectedCurrency = CURRENCIES.find(c => c.code === formData.currency);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Business Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Business Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{currency.symbol}</span>
                        <span>{currency.name}</span>
                        <span className="text-gray-500 text-sm">({currency.country})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCurrency && (
                <p className="text-sm text-gray-600 mt-1">
                  Symbol: {selectedCurrency.symbol} • {selectedCurrency.country}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="timezone">Business Timezone</Label>
              <Select
                value={formData.timezone}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {GLOBAL_TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country/Region</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              placeholder="e.g., United States, Kenya, United Kingdom"
            />
          </div>

          <Button type="submit" disabled={updateSettingsMutation.isPending}>
            {updateSettingsMutation.isPending ? 'Updating...' : 'Update Global Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
