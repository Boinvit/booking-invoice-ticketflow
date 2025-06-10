import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const GeneralSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    timezone: 'UTC',
    currency: 'USD',
    booking_advance_days: 30,
    booking_buffer_minutes: 15,
    max_bookings_per_slot: 5,
    booking_slot_duration_minutes: 30,
    default_tax_rate: 0,
  });

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

  const { data: businessSettings } = useQuery({
    queryKey: ['business-settings', business?.id],
    queryFn: async () => {
      if (!business) return null;
      
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .eq('business_id', business.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  // Use useEffect to handle data updates instead of onSuccess
  useEffect(() => {
    if (businessSettings) {
      setSettings({
        timezone: businessSettings.timezone || 'UTC',
        currency: businessSettings.currency || 'USD',
        booking_advance_days: businessSettings.booking_advance_days || 30,
        booking_buffer_minutes: businessSettings.booking_buffer_minutes || 15,
        max_bookings_per_slot: businessSettings.max_bookings_per_slot || 5,
        booking_slot_duration_minutes: businessSettings.booking_slot_duration_minutes || 30,
        default_tax_rate: businessSettings.default_tax_rate || 0,
      });
    }
  }, [businessSettings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: typeof settings) => {
      if (!business) throw new Error('No business found');
      
      const settingsData = {
        business_id: business.id,
        ...updatedSettings,
      };

      if (businessSettings) {
        const { data, error } = await supabase
          .from('business_settings')
          .update(settingsData)
          .eq('business_id', business.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('business_settings')
          .insert(settingsData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast.success('General settings updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
    },
    onError: (error) => {
      toast.error('Failed to update general settings: ' + error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateSettingsMutation.mutateAsync(settings);
    } finally {
      setIsLoading(false);
    }
  };

  if (!business) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No business found. Please set up your business first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="booking_advance_days">Booking Advance Days</Label>
              <Input
                id="booking_advance_days"
                type="number"
                min="1"
                max="365"
                value={settings.booking_advance_days}
                onChange={(e) => setSettings(prev => ({ ...prev, booking_advance_days: parseInt(e.target.value) || 30 }))}
              />
              <p className="text-sm text-gray-500 mt-1">How many days in advance can clients book</p>
            </div>

            <div>
              <Label htmlFor="booking_buffer_minutes">Booking Buffer (minutes)</Label>
              <Input
                id="booking_buffer_minutes"
                type="number"
                min="0"
                max="120"
                value={settings.booking_buffer_minutes}
                onChange={(e) => setSettings(prev => ({ ...prev, booking_buffer_minutes: parseInt(e.target.value) || 15 }))}
              />
              <p className="text-sm text-gray-500 mt-1">Buffer time between bookings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max_bookings_per_slot">Max Bookings Per Slot</Label>
              <Input
                id="max_bookings_per_slot"
                type="number"
                min="1"
                max="50"
                value={settings.max_bookings_per_slot}
                onChange={(e) => setSettings(prev => ({ ...prev, max_bookings_per_slot: parseInt(e.target.value) || 5 }))}
              />
              <p className="text-sm text-gray-500 mt-1">Maximum concurrent bookings per time slot</p>
            </div>

            <div>
              <Label htmlFor="slot_duration">Slot Duration (minutes)</Label>
              <Select 
                value={settings.booking_slot_duration_minutes.toString()} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, booking_slot_duration_minutes: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="default_tax_rate">Default Tax Rate (%)</Label>
            <Input
              id="default_tax_rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={settings.default_tax_rate}
              onChange={(e) => setSettings(prev => ({ ...prev, default_tax_rate: parseFloat(e.target.value) || 0 }))}
              className="w-32"
            />
            <p className="text-sm text-gray-500 mt-1">Default tax rate for services</p>
          </div>

          <Button type="submit" disabled={isLoading || updateSettingsMutation.isPending}>
            {isLoading ? 'Updating...' : 'Update General Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
