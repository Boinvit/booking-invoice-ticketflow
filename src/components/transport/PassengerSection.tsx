
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Users } from 'lucide-react';

interface PassengerSectionProps {
  register: UseFormRegister<any>;
}

export const PassengerSection = ({ register }: PassengerSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Users className="h-5 w-5" />
        Passenger Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="adults">Adults</Label>
          <Input
            id="adults"
            type="number"
            min="1"
            {...register('adults', { required: 'Number of adults is required' })}
          />
        </div>

        <div>
          <Label htmlFor="children">Children (2-11 years)</Label>
          <Input
            id="children"
            type="number"
            min="0"
            {...register('children')}
          />
        </div>

        <div>
          <Label htmlFor="infants">Infants (under 2 years)</Label>
          <Input
            id="infants"
            type="number"
            min="0"
            {...register('infants')}
          />
        </div>
      </div>
    </div>
  );
};
