
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plane } from 'lucide-react';
import { SeatSelectionMap } from './SeatSelectionMap';
import { DurationSelector } from './DurationSelector';
import { ServiceTypeSection } from './ServiceTypeSection';
import { RouteSection } from './RouteSection';
import { PassengerSection } from './PassengerSection';
import { TimeSection } from './TimeSection';
import { PricingSection } from './PricingSection';
import { CURRENCIES } from '@/components/business/GlobalBusinessSettings';

interface EnhancedTransportFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  businessId?: string;
  isClientBooking?: boolean;
  serviceDetails?: any;
}

export const EnhancedTransportForm = ({ 
  onSubmit, 
  defaultValues, 
  businessId, 
  isClientBooking = false,
  serviceDetails 
}: EnhancedTransportFormProps) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Fetch business currency and logo
  const { data: business } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const { data, error } = await supabase
        .from('businesses')
        .select('currency, logo_url, name')
        .eq('id', businessId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!businessId,
  });

  // Get pre-filled service details for client booking
  const prefilledData = isClientBooking && serviceDetails ? {
    service_type: serviceDetails.service_type || 'bus',
    departure_country: serviceDetails.departure_location?.split(', ')[1] || '',
    departure_city: serviceDetails.departure_location?.split(', ')[0] || '',
    arrival_country: serviceDetails.arrival_location?.split(', ')[1] || '',
    arrival_city: serviceDetails.arrival_location?.split(', ')[0] || '',
    departure_time: serviceDetails.departure_time || '',
    arrival_time: serviceDetails.arrival_time || '',
    service_class: serviceDetails.service_class || 'Economy',
    available_seats: serviceDetails.available_seats || 50,
    price_per_seat: serviceDetails.price_per_seat || 0,
    duration_hours: serviceDetails.duration_hours || 0,
    duration_minutes: serviceDetails.duration_minutes || 0,
    adults: 1,
    children: 0,
    infants: 0,
    ...defaultValues
  } : {
    service_type: 'bus',
    departure_country: '',
    departure_city: '',
    arrival_country: '',
    arrival_city: '',
    departure_time: '',
    arrival_time: '',
    adults: 1,
    children: 0,
    infants: 0,
    service_class: 'Economy',
    available_seats: 50,
    price_per_seat: 0,
    ...defaultValues
  };

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: prefilledData
  });

  const serviceType = watch('service_type');
  const adults = watch('adults');
  const children = watch('children');
  const totalPassengers = adults + children;

  const getCurrencySymbol = (currency: string) => {
    const currencyData = CURRENCIES.find(c => c.code === currency);
    return currencyData?.symbol || '$';
  };

  const businessCurrency = business?.currency || 'USD';
  const currencySymbol = getCurrencySymbol(businessCurrency);

  const handleFormSubmit = (data: any) => {
    if (isClientBooking) {
      // For client bookings, include selected seats and passenger info
      const bookingData = {
        service_id: serviceDetails?.id,
        selected_seats: selectedSeats,
        passenger_info: {
          adults: data.adults,
          children: data.children,
          infants: data.infants
        },
        total_amount: selectedSeats.length * data.price_per_seat,
        booking_date: new Date().toISOString().split('T')[0],
        booking_time: data.departure_time,
        currency: businessCurrency
      };
      onSubmit(bookingData);
    } else {
      // For business setup, save transport details
      const transportDetails = {
        service_type: data.service_type,
        departure_location: `${data.departure_city}, ${data.departure_country}`,
        arrival_location: `${data.arrival_city}, ${data.arrival_country}`,
        departure_time: data.departure_time,
        arrival_time: data.arrival_time,
        duration_hours: data.duration_hours || 0,
        duration_minutes: data.duration_minutes || 0,
        service_class: data.service_class,
        available_seats: data.available_seats,
        price_per_seat: data.price_per_seat,
        currency: businessCurrency
      };
      onSubmit(transportDetails);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {serviceType === 'flight' ? <Plane className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
            <CardTitle>
              {isClientBooking ? 'Book Your Transport' : 'Enhanced Transport Service Details'}
            </CardTitle>
          </div>
          {business?.logo_url && (
            <img 
              src={business.logo_url} 
              alt={business.name}
              className="h-12 w-auto object-contain"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {!isClientBooking && <ServiceTypeSection setValue={setValue} watch={watch} />}

          <RouteSection 
            register={register} 
            setValue={setValue} 
            watch={watch}
            readOnly={isClientBooking}
          />

          <PassengerSection register={register} />

          <TimeSection 
            register={register}
            readOnly={isClientBooking}
          />

          {!isClientBooking && (
            <DurationSelector
              hours={watch('duration_hours') || 0}
              minutes={watch('duration_minutes') || 0}
              onHoursChange={(hours) => setValue('duration_hours', hours)}
              onMinutesChange={(minutes) => setValue('duration_minutes', minutes)}
            />
          )}

          {isClientBooking && serviceDetails?.duration_hours && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">Journey Duration</h3>
              <p className="text-sm text-gray-600">
                {serviceDetails.duration_hours}h {serviceDetails.duration_minutes || 0}m
              </p>
            </div>
          )}

          <PricingSection 
            register={register} 
            watch={watch} 
            currencySymbol={currencySymbol}
            readOnly={isClientBooking}
          />

          {totalPassengers > 0 && (
            <SeatSelectionMap
              serviceType={serviceType}
              totalSeats={watch('available_seats')}
              occupiedSeats={serviceDetails?.occupied_seats || []}
              onSeatSelect={setSelectedSeats}
              passengerCount={totalPassengers}
              selectedSeats={selectedSeats}
            />
          )}

          <Button type="submit" className="w-full">
            {isClientBooking ? 'Proceed to Payment' : 'Save Enhanced Transport Service'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
