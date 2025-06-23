
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PricingSectionProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  currencySymbol: string;
  readOnly?: boolean;
}

export const PricingSection = ({ register, watch, currencySymbol, readOnly = false }: PricingSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="available_seats">Available Seats</Label>
        <Input
          id="available_seats"
          type="number"
          min="1"
          {...register('available_seats', { required: 'Available seats is required' })}
          readOnly={readOnly}
          className={readOnly ? "bg-gray-50" : ""}
        />
      </div>

      <div>
        <Label htmlFor="price_per_seat">Price per Seat ({currencySymbol})</Label>
        <Input
          id="price_per_seat"
          type="number"
          step="0.01"
          min="0"
          {...register('price_per_seat', { required: 'Price per seat is required' })}
          placeholder="0.00"
          readOnly={readOnly}
          className={readOnly ? "bg-gray-50" : ""}
        />
      </div>
    </div>
  );
};
