
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Users } from 'lucide-react';
import { toast } from 'sonner';

interface CapacitySettingsProps {
  businessId: string;
}

export const CapacitySettings = ({ businessId }: CapacitySettingsProps) => {
  const queryClient = useQueryClient();
  const [maxBookings, setMaxBookings] = useState<number>(5);
  const [slotDuration, setSlotDuration] = useState<number>(30);

  // Fetch business settings
  const { data: settings } = useQuery({
    queryKey: ['business-settings', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .eq('business_id', businessId)
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        setMaxBookings(data.max_bookings_per_slot || 5);
        setSlotDuration(data.booking_slot_duration_minutes || 30);
      }
    }
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('business_settings')
        .upsert({
          business_id: businessId,
          max_bookings_per_slot: maxBookings,
          booking_slot_duration_minutes: slotDuration,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Capacity settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
    },
    onError: (error) => {
      console.error('Update settings error:', error);
      toast.error('Failed to update settings');
    },
  });

  const handleUpdateSettings = () => {
    updateSettingsMutation.mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Booking Capacity Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="max-bookings">
              <Users className="h-4 w-4 inline mr-2" />
              Maximum Bookings per Time Slot
            </Label>
            <Input
              id="max-bookings"
              type="number"
              min="1"
              max="50"
              value={maxBookings}
              onChange={(e) => setMaxBookings(Number(e.target.value))}
            />
            <p className="text-sm text-gray-600 mt-1">
              How many clients can book the same time slot
            </p>
          </div>

          <div>
            <Label htmlFor="slot-duration">
              Time Slot Duration (minutes)
            </Label>
            <Input
              id="slot-duration"
              type="number"
              min="15"
              max="120"
              step="15"
              value={slotDuration}
              onChange={(e) => setSlotDuration(Number(e.target.value))}
            />
            <p className="text-sm text-gray-600 mt-1">
              Duration of each booking time slot
            </p>
          </div>
        </div>

        <Button
          onClick={handleUpdateSettings}
          disabled={updateSettingsMutation.isPending}
          className="w-full"
        >
          {updateSettingsMutation.isPending ? 'Updating...' : 'Update Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};
