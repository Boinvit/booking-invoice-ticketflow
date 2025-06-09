
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface BlockedTimeSlotsProps {
  businessId: string;
}

export const BlockedTimeSlots = ({ businessId }: BlockedTimeSlotsProps) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Fetch blocked time slots
  const { data: blockedSlots } = useQuery({
    queryKey: ['blocked-slots', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blocked_time_slots')
        .select('*')
        .eq('business_id', businessId)
        .order('blocked_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Block time slot mutation
  const blockSlotMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both date and time');
      }

      const { error } = await supabase
        .from('blocked_time_slots')
        .insert([{
          business_id: businessId,
          blocked_date: format(selectedDate, 'yyyy-MM-dd'),
          blocked_time: selectedTime,
          reason: reason || 'Time slot blocked by business owner'
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Time slot blocked successfully');
      queryClient.invalidateQueries({ queryKey: ['blocked-slots'] });
      setSelectedTime('');
      setReason('');
    },
    onError: (error) => {
      console.error('Block slot error:', error);
      toast.error('Failed to block time slot');
    },
  });

  // Unblock time slot mutation
  const unblockSlotMutation = useMutation({
    mutationFn: async (slotId: string) => {
      const { error } = await supabase
        .from('blocked_time_slots')
        .delete()
        .eq('id', slotId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Time slot unblocked successfully');
      queryClient.invalidateQueries({ queryKey: ['blocked-slots'] });
    },
    onError: (error) => {
      console.error('Unblock slot error:', error);
      toast.error('Failed to unblock time slot');
    },
  });

  const handleBlockSlot = () => {
    blockSlotMutation.mutate();
  };

  const handleUnblockSlot = (slotId: string) => {
    unblockSlotMutation.mutate(slotId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Block Time Slots
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Reason (Optional)</Label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for blocking this time slot..."
                  rows={3}
                />
              </div>

              <Button
                onClick={handleBlockSlot}
                disabled={!selectedDate || !selectedTime || blockSlotMutation.isPending}
                className="w-full"
              >
                {blockSlotMutation.isPending ? 'Blocking...' : 'Block Time Slot'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currently Blocked Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          {blockedSlots && blockedSlots.length > 0 ? (
            <div className="space-y-3">
              {blockedSlots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">
                      <Lock className="h-3 w-3 mr-1" />
                      Blocked
                    </Badge>
                    <div>
                      <p className="font-medium">
                        {format(new Date(slot.blocked_date), 'PPP')} at {slot.blocked_time}
                      </p>
                      {slot.reason && (
                        <p className="text-sm text-gray-600">{slot.reason}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnblockSlot(slot.id)}
                    disabled={unblockSlotMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No blocked time slots</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
