
import React from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SERVICE_CLASSES = {
  bus: ['Economy', 'VIP', 'Premium'],
  shuttle: ['Standard', 'Premium'],
  flight: ['Economy', 'Business', 'First Class'],
  train: ['Economy', 'Business', 'First Class']
};

const DEFAULT_SEATS = {
  bus: 50,
  shuttle: 14,
  flight: 180,
  train: 120
};

interface ServiceTypeSectionProps {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const ServiceTypeSection = ({ setValue, watch }: ServiceTypeSectionProps) => {
  const serviceType = watch('service_type');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="service_type">Service Type</Label>
        <Select
          value={watch('service_type')}
          onValueChange={(value) => {
            setValue('service_type', value);
            setValue('available_seats', DEFAULT_SEATS[value as keyof typeof DEFAULT_SEATS]);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bus">Bus Service</SelectItem>
            <SelectItem value="train">Train Service</SelectItem>
            <SelectItem value="flight">Flight Service</SelectItem>
            <SelectItem value="shuttle">Shuttle Service (14-seater)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="service_class">Service Class</Label>
        <Select
          value={watch('service_class')}
          onValueChange={(value) => setValue('service_class', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_CLASSES[serviceType as keyof typeof SERVICE_CLASSES]?.map((cls) => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
