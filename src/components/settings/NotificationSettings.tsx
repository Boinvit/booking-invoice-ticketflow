import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const NotificationSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    send_reminders: true,
    reminder_hours_before: 24,
    auto_confirm_bookings: false,
    email_notifications: true,
    sms_notifications: true,
    whatsapp_notifications: false,
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
        send_reminders: businessSettings.send_reminders ?? true,
        reminder_hours_before: businessSettings.reminder_hours_before ?? 24,
        auto_confirm_bookings: businessSettings.auto_confirm_bookings ?? false,
        email_notifications: businessSettings.notification_preferences?.email ?? true,
        sms_notifications: businessSettings.notification_preferences?.sms ?? true,
        whatsapp_notifications: businessSettings.notification_preferences?.whatsapp ?? false,
      });
    }
  }, [businessSettings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: typeof settings) => {
      if (!business) throw new Error('No business found');
      
      const settingsData = {
        business_id: business.id,
        send_reminders: updatedSettings.send_reminders,
        reminder_hours_before: updatedSettings.reminder_hours_before,
        auto_confirm_bookings: updatedSettings.auto_confirm_bookings,
        notification_preferences: {
          email: updatedSettings.email_notifications,
          sms: updatedSettings.sms_notifications,
          whatsapp: updatedSettings.whatsapp_notifications,
        },
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
      toast.success('Notification settings updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
    },
    onError: (error) => {
      toast.error('Failed to update notification settings: ' + error.message);
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
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="send_reminders">Send Booking Reminders</Label>
                <p className="text-sm text-gray-500">
                  Automatically send reminders to clients before their appointments
                </p>
              </div>
              <Switch
                id="send_reminders"
                checked={settings.send_reminders}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, send_reminders: checked }))
                }
              />
            </div>

            {settings.send_reminders && (
              <div>
                <Label htmlFor="reminder_hours">Reminder Time (hours before)</Label>
                <Input
                  id="reminder_hours"
                  type="number"
                  min="1"
                  max="168"
                  value={settings.reminder_hours_before}
                  onChange={(e) =>
                    setSettings(prev => ({ ...prev, reminder_hours_before: parseInt(e.target.value) || 24 }))
                  }
                  className="w-32"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto_confirm">Auto-confirm Bookings</Label>
                <p className="text-sm text-gray-500">
                  Automatically confirm new bookings without manual review
                </p>
              </div>
              <Switch
                id="auto_confirm"
                checked={settings.auto_confirm_bookings}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, auto_confirm_bookings: checked }))
                }
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-medium mb-4">Notification Channels</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email_notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email_notifications"
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, email_notifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms_notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  id="sms_notifications"
                  checked={settings.sms_notifications}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, sms_notifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="whatsapp_notifications">WhatsApp Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via WhatsApp
                  </p>
                </div>
                <Switch
                  id="whatsapp_notifications"
                  checked={settings.whatsapp_notifications}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, whatsapp_notifications: checked }))
                  }
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading || updateSettingsMutation.isPending}>
            {isLoading ? 'Updating...' : 'Update Notification Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
