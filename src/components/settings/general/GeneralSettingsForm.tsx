
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormError } from '@/components/ui/form-error';

interface GeneralSettingsFormProps {
  settings: any;
  errors: Record<string, string>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({
  settings,
  errors,
  isLoading,
  onSubmit
}) => {
  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Africa/Nairobi', label: 'Nairobi' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'KES', label: 'KES - Kenyan Shilling' },
    { value: 'NGN', label: 'NGN - Nigerian Naira' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Regional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select name="timezone" defaultValue={settings?.timezone || 'UTC'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select name="currency" defaultValue={settings?.currency || 'USD'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.value} value={curr.value}>
                        {curr.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Booking Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="slot_duration">Slot Duration (minutes)</Label>
                <Input
                  id="slot_duration"
                  name="slot_duration"
                  type="number"
                  min="15"
                  step="15"
                  defaultValue={settings?.booking_slot_duration_minutes || 30}
                />
                {errors.slot_duration && (
                  <FormError message={errors.slot_duration} />
                )}
              </div>

              <div>
                <Label htmlFor="max_bookings">Maximum Bookings Per Slot</Label>
                <Input
                  id="max_bookings"
                  name="max_bookings"
                  type="number"
                  min="1"
                  defaultValue={settings?.max_bookings_per_slot || 5}
                />
                {errors.max_bookings && (
                  <FormError message={errors.max_bookings} />
                )}
              </div>

              <div>
                <Label htmlFor="booking_advance_days">Booking Advance Limit (days)</Label>
                <Input
                  id="booking_advance_days"
                  name="booking_advance_days"
                  type="number"
                  min="1"
                  defaultValue={settings?.booking_advance_days || 30}
                />
                {errors.booking_advance_days && (
                  <FormError message={errors.booking_advance_days} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Booking Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto_confirm">Auto-confirm bookings</Label>
                <p className="text-sm text-gray-600">Automatically confirm new bookings without manual approval</p>
              </div>
              <Switch
                id="auto_confirm"
                name="auto_confirm"
                defaultChecked={settings?.auto_confirm_bookings ?? true}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="require_payment">Require payment</Label>
                <p className="text-sm text-gray-600">Require payment before booking confirmation</p>
              </div>
              <Switch
                id="require_payment"
                name="require_payment"
                defaultChecked={settings?.require_payment ?? false}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="send_reminders">Send booking reminders</Label>
                <p className="text-sm text-gray-600">Send automated reminders to clients</p>
              </div>
              <Switch
                id="send_reminders"
                name="send_reminders"
                defaultChecked={settings?.send_reminders ?? true}
              />
            </div>

            {settings?.send_reminders && (
              <div>
                <Label htmlFor="reminder_hours">Reminder time (hours before)</Label>
                <Input
                  id="reminder_hours"
                  name="reminder_hours"
                  type="number"
                  min="1"
                  max="168"
                  defaultValue={settings?.reminder_hours_before || 24}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};
