
import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COUNTRIES = [
  'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'South Africa', 'Nigeria', 'Ghana', 'Egypt',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France'
];

interface RouteSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  readOnly?: boolean;
}

export const RouteSection = ({ register, setValue, watch, readOnly = false }: RouteSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Travel Route</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="departure_country">From (Country)</Label>
          {readOnly ? (
            <Input value={watch('departure_country')} readOnly className="bg-gray-50" />
          ) : (
            <Select
              value={watch('departure_country')}
              onValueChange={(value) => setValue('departure_country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label htmlFor="departure_city">City</Label>
          <Input
            id="departure_city"
            {...register('departure_city', { required: 'Departure city is required' })}
            placeholder="e.g., Nairobi"
            readOnly={readOnly}
            className={readOnly ? "bg-gray-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="arrival_country">To (Country)</Label>
          {readOnly ? (
            <Input value={watch('arrival_country')} readOnly className="bg-gray-50" />
          ) : (
            <Select
              value={watch('arrival_country')}
              onValueChange={(value) => setValue('arrival_country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label htmlFor="arrival_city">City</Label>
          <Input
            id="arrival_city"
            {...register('arrival_city', { required: 'Arrival city is required' })}
            placeholder="e.g., Mombasa"
            readOnly={readOnly}
            className={readOnly ? "bg-gray-50" : ""}
          />
        </div>
      </div>
    </div>
  );
};
