
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Mail, Send, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface EmailSettings {
  bookingConfirmation: boolean;
  bookingReminder: boolean;
  cancellationNotice: boolean;
  paymentReceipt: boolean;
  reminderHours: number;
}

const EmailService = () => {
  const [settings, setSettings] = useState<EmailSettings>({
    bookingConfirmation: true,
    bookingReminder: true,
    cancellationNotice: true,
    paymentReceipt: true,
    reminderHours: 24
  });

  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSettingChange = (key: keyof EmailSettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Here you would save to your backend/database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Email settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setLoading(true);
    try {
      // Here you would call your email service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Test email sent successfully');
      setTestEmail('');
    } catch (error) {
      toast.error('Failed to send test email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Email Notification Settings
          </CardTitle>
          <CardDescription>
            Configure when automatic emails are sent to your customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="booking-confirmation">Booking Confirmation</Label>
                  <p className="text-sm text-gray-600">Send email when booking is confirmed</p>
                </div>
                <Switch
                  id="booking-confirmation"
                  checked={settings.bookingConfirmation}
                  onCheckedChange={(checked) => handleSettingChange('bookingConfirmation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="booking-reminder">Booking Reminder</Label>
                  <p className="text-sm text-gray-600">Send reminder before appointment</p>
                </div>
                <Switch
                  id="booking-reminder"
                  checked={settings.bookingReminder}
                  onCheckedChange={(checked) => handleSettingChange('bookingReminder', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cancellation-notice">Cancellation Notice</Label>
                  <p className="text-sm text-gray-600">Send email when booking is cancelled</p>
                </div>
                <Switch
                  id="cancellation-notice"
                  checked={settings.cancellationNotice}
                  onCheckedChange={(checked) => handleSettingChange('cancellationNotice', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="payment-receipt">Payment Receipt</Label>
                  <p className="text-sm text-gray-600">Send receipt after payment</p>
                </div>
                <Switch
                  id="payment-receipt"
                  checked={settings.paymentReceipt}
                  onCheckedChange={(checked) => handleSettingChange('paymentReceipt', checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="reminder-hours">Reminder Timing (hours)</Label>
                <Input
                  id="reminder-hours"
                  type="number"
                  min="1"
                  max="168"
                  value={settings.reminderHours}
                  onChange={(e) => handleSettingChange('reminderHours', parseInt(e.target.value) || 24)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  How many hours before the appointment to send reminder
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveSettings} disabled={loading} className="bg-royal-red hover:bg-royal-red-accent">
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Test Email Service
          </CardTitle>
          <CardDescription>
            Send a test email to verify your email configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="test-email">Test Email Address</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSendTestEmail} 
                disabled={loading || !testEmail}
                className="bg-royal-red hover:bg-royal-red-accent"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailService;
