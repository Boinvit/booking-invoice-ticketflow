
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { toast } from 'sonner';
import { Loader2, MessageCircle, Phone, Mail } from 'lucide-react';

interface NotificationPreferences {
  email_bookings?: boolean;
  email_cancellations?: boolean;
  email_reminders?: boolean;
  sms_bookings?: boolean;
  sms_reminders?: boolean;
  whatsapp_bookings?: boolean;
  whatsapp_reminders?: boolean;
  whatsapp_number?: string;
}

export const EnhancedNotificationSettings = () => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  const [whatsappNumber, setWhatsappNumber] = useState('+254702359618');

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

  const { data: settings, isLoading, error } = useQuery({
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

  React.useEffect(() => {
    if (error) {
      handleError(error, { customMessage: 'Failed to load notification settings' });
    }
  }, [error, handleError]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!business) throw new Error('No business found');

      const notificationPrefs = {
        email_bookings: formData.get('email_bookings') === 'on',
        email_cancellations: formData.get('email_cancellations') === 'on',
        email_reminders: formData.get('email_reminders') === 'on',
        sms_bookings: formData.get('sms_bookings') === 'on',
        sms_reminders: formData.get('sms_reminders') === 'on',
        whatsapp_bookings: formData.get('whatsapp_bookings') === 'on',
        whatsapp_reminders: formData.get('whatsapp_reminders') === 'on',
        whatsapp_number: whatsappNumber
      };

      const updates = {
        notification_preferences: notificationPrefs as any,
      };

      if (settings) {
        const { error } = await supabase
          .from('business_settings')
          .update(updates)
          .eq('business_id', business.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('business_settings')
          .insert({ ...updates, business_id: business.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success('Notification settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
    },
    onError: (error) => {
      handleError(error, { customMessage: 'Failed to update notification settings' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSettingsMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton lines={4} />
        </CardContent>
      </Card>
    );
  }

  const notificationPrefs: NotificationPreferences = (settings?.notification_preferences as NotificationPreferences) || {
    email_bookings: true,
    email_cancellations: true,
    email_reminders: false,
    sms_bookings: false,
    sms_reminders: false,
    whatsapp_bookings: true,
    whatsapp_reminders: true,
    whatsapp_number: '+254702359618'
  };

  React.useEffect(() => {
    if (notificationPrefs.whatsapp_number) {
      setWhatsappNumber(notificationPrefs.whatsapp_number);
    }
  }, [notificationPrefs.whatsapp_number]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <p className="text-sm text-gray-600">
          Configure how you want to be notified about booking activities via Email, SMS, and WhatsApp.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Notifications
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_bookings">New bookings</Label>
                <p className="text-sm text-gray-600">Get notified when someone books an appointment</p>
              </div>
              <Switch
                id="email_bookings"
                name="email_bookings"
                defaultChecked={notificationPrefs.email_bookings}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_cancellations">Cancellations</Label>
                <p className="text-sm text-gray-600">Get notified when bookings are cancelled</p>
              </div>
              <Switch
                id="email_cancellations"
                name="email_cancellations"
                defaultChecked={notificationPrefs.email_cancellations}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_reminders">Daily reminders</Label>
                <p className="text-sm text-gray-600">Daily summary of upcoming appointments</p>
              </div>
              <Switch
                id="email_reminders"
                name="email_reminders"
                defaultChecked={notificationPrefs.email_reminders}
              />
            </div>
          </div>
          
          {/* SMS Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              SMS Notifications
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms_bookings">New bookings</Label>
                <p className="text-sm text-gray-600">SMS alerts for new bookings</p>
              </div>
              <Switch
                id="sms_bookings"
                name="sms_bookings"
                defaultChecked={notificationPrefs.sms_bookings}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms_reminders">Appointment reminders</Label>
                <p className="text-sm text-gray-600">SMS reminders before appointments</p>
              </div>
              <Switch
                id="sms_reminders"
                name="sms_reminders"
                defaultChecked={notificationPrefs.sms_reminders}
              />
            </div>
          </div>

          {/* WhatsApp Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-600" />
              WhatsApp Notifications
            </h3>

            <div>
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_number"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+254702359618"
                className="mt-1"
              />
              <p className="text-sm text-gray-600 mt-1">
                Include country code (e.g., +254 for Kenya)
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp_bookings">New bookings</Label>
                <p className="text-sm text-gray-600">WhatsApp alerts for new bookings</p>
              </div>
              <Switch
                id="whatsapp_bookings"
                name="whatsapp_bookings"
                defaultChecked={notificationPrefs.whatsapp_bookings}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp_reminders">Appointment reminders</Label>
                <p className="text-sm text-gray-600">WhatsApp reminders before appointments</p>
              </div>
              <Switch
                id="whatsapp_reminders"
                name="whatsapp_reminders"
                defaultChecked={notificationPrefs.whatsapp_reminders}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={updateSettingsMutation.isPending}
            className="w-full md:w-auto"
          >
            {updateSettingsMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
