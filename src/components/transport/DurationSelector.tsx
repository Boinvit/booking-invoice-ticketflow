
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DurationSelectorProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
}

export const DurationSelector = ({ hours, minutes, onHoursChange, onMinutesChange }: DurationSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Journey Duration</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="duration_hours" className="text-sm">Hours</Label>
          <Input
            id="duration_hours"
            type="number"
            min="0"
            max="72"
            value={hours}
            onChange={(e) => onHoursChange(parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="duration_minutes" className="text-sm">Minutes</Label>
          <Select value={minutes.toString()} onValueChange={(value) => onMinutesChange(parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="0" />
            </SelectTrigger>
            <SelectContent>
              {[0, 15, 30, 45].map((min) => (
                <SelectItem key={min} value={min.toString()}>{min}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Total: {hours}h {minutes}m
      </p>
    </div>
  );
};
