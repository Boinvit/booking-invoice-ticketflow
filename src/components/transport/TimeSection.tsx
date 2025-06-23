
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TimeSectionProps {
  register: UseFormRegister<any>;
  readOnly?: boolean;
}

export const TimeSection = ({ register, readOnly = false }: TimeSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="departure_time">Departure Time</Label>
        <Input
          id="departure_time"
          type="time"
          {...register('departure_time', { required: 'Departure time is required' })}
          readOnly={readOnly}
          className={readOnly ? "bg-gray-50" : ""}
        />
      </div>

      <div>
        <Label htmlFor="arrival_time">Arrival Time</Label>
        <Input
          id="arrival_time"
          type="time"
          {...register('arrival_time', { required: 'Arrival time is required' })}
          readOnly={readOnly}
          className={readOnly ? "bg-gray-50" : ""}
        />
      </div>
    </div>
  );
};
