
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ExternalLink, MapPin, Clock, Users } from 'lucide-react';

interface TransportServiceFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export const TransportServiceForm = ({ onSubmit, defaultValues }: TransportServiceFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      service_type: 'bus',
      departure_location: '',
      arrival_location: '',
      departure_time: '',
      arrival_time: '',
      available_seats: 50,
      price_per_seat: 0,
      external_booking_url: '',
      is_external_booking: false,
      ...defaultValues
    }
  });

  const isExternalBooking = watch('is_external_booking');
  const serviceType = watch('service_type');

  const getExternalUrl = (type: string) => {
    switch (type) {
      case 'train':
        return 'https://buupass.com/';
      case 'bus':
        return 'https://buupass.com/';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Transport Service Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_type">Service Type</Label>
              <Select
                value={watch('service_type')}
                onValueChange={(value) => setValue('service_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus">Bus Service</SelectItem>
                  <SelectItem value="train">Train Service</SelectItem>
                  <SelectItem value="taxi">Taxi Service</SelectItem>
                  <SelectItem value="shuttle">Shuttle Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="available_seats">Available Seats</Label>
              <Input
                id="available_seats"
                type="number"
                min="1"
                {...register('available_seats', { required: 'Available seats is required' })}
                className="flex items-center"
              />
              {errors.available_seats && (
                <p className="text-sm text-red-500 mt-1">{errors.available_seats.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure_location">Departure Location</Label>
              <Input
                id="departure_location"
                {...register('departure_location', { required: 'Departure location is required' })}
                placeholder="e.g., Nairobi CBD"
              />
              {errors.departure_location && (
                <p className="text-sm text-red-500 mt-1">{errors.departure_location.message as string}</p>
              )}
            </div>

            <div>
              <Label htmlFor="arrival_location">Arrival Location</Label>
              <Input
                id="arrival_location"
                {...register('arrival_location', { required: 'Arrival location is required' })}
                placeholder="e.g., Mombasa"
              />
              {errors.arrival_location && (
                <p className="text-sm text-red-500 mt-1">{errors.arrival_location.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="departure_time">Departure Time</Label>
              <Input
                id="departure_time"
                type="time"
                {...register('departure_time', { required: 'Departure time is required' })}
              />
              {errors.departure_time && (
                <p className="text-sm text-red-500 mt-1">{errors.departure_time.message as string}</p>
              )}
            </div>

            <div>
              <Label htmlFor="arrival_time">Arrival Time</Label>
              <Input
                id="arrival_time"
                type="time"
                {...register('arrival_time', { required: 'Arrival time is required' })}
              />
              {errors.arrival_time && (
                <p className="text-sm text-red-500 mt-1">{errors.arrival_time.message as string}</p>
              )}
            </div>

            <div>
              <Label htmlFor="price_per_seat">Price per Seat</Label>
              <Input
                id="price_per_seat"
                type="number"
                step="0.01"
                min="0"
                {...register('price_per_seat', { required: 'Price per seat is required' })}
                placeholder="0.00"
              />
              {errors.price_per_seat && (
                <p className="text-sm text-red-500 mt-1">{errors.price_per_seat.message as string}</p>
              )}
            </div>
          </div>

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
                <p className="text-sm text-gray-600 mt-1">
                  {serviceType === 'train' && 'For Kenya trains, use: https://buupass.com/'}
                  {serviceType === 'bus' && 'For bus services, use: https://buupass.com/'}
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Save Transport Service
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
