
import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ExternalBookingSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  serviceType: string;
}

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

export const ExternalBookingSection = ({ register, setValue, watch, serviceType }: ExternalBookingSectionProps) => {
  const isExternalBooking = watch('is_external_booking');

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="is_external_booking"
          checked={isExternalBooking}
          onCheckedChange={(checked) => setValue('is_external_booking', checked)}
        />
        <Label htmlFor="is_external_booking">Use External Booking System</Label>
      </div>

      {isExternalBooking && (
        <div>
          <Label htmlFor="external_booking_url">External Booking URL</Label>
          <div className="flex gap-2">
            <Input
              id="external_booking_url"
              {...register('external_booking_url')}
              placeholder={getExternalUrl(serviceType)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setValue('external_booking_url', getExternalUrl(serviceType))}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
