
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, User, Calendar as CalendarIcon, Users, Lock } from 'lucide-react';
import { format, addMinutes, setHours, setMinutes, isSameDay, isAfter, isBefore } from 'date-fns';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  is_active: boolean;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  is_active: boolean;
}

interface BookingCalendarProps {
  businessId: string;
  onBookingComplete?: () => void;
}

export const BookingCalendar = ({ businessId, onBookingComplete }: BookingCalendarProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Fetch services
  const { data: services } = useQuery({
    queryKey: ['services', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId)
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as Service[];
    },
  });

  // Fetch staff
  const { data: staff } = useQuery({
    queryKey: ['staff', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('business_id', businessId)
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as Staff[];
    },
  });

  // Fetch business settings for capacity
  const { data: businessSettings } = useQuery({
    queryKey: ['business-settings', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_settings')
        .select('max_bookings_per_slot, booking_slot_duration_minutes')
        .eq('business_id', businessId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch existing bookings for selected date
  const { data: existingBookings } = useQuery({
    queryKey: ['bookings', businessId, selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('business_id', businessId)
        .eq('booking_date', format(selectedDate, 'yyyy-MM-dd'))
        .neq('status', 'cancelled');
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedDate,
  });

  // Fetch blocked time slots for selected date
  const { data: blockedSlots } = useQuery({
    queryKey: ['blocked-slots', businessId, selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      
      const { data, error } = await supabase
        .from('blocked_time_slots')
        .select('*')
        .eq('business_id', businessId)
        .eq('blocked_date', format(selectedDate, 'yyyy-MM-dd'));
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedDate,
  });

  // Generate available time slots with booking counts
  const generateTimeSlots = () => {
    if (!selectedService) return [];
    
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const slotDuration = businessSettings?.booking_slot_duration_minutes || 30;
    const maxCapacity = businessSettings?.max_bookings_per_slot || 5;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotTime = setMinutes(setHours(new Date(), hour), minute);
        const slotEndTime = addMinutes(slotTime, selectedService.duration_minutes);
        
        // Check if slot fits within business hours
        if (slotEndTime.getHours() <= endHour) {
          const timeString = format(slotTime, 'HH:mm');
          
          // Check if slot is blocked
          const isBlocked = blockedSlots?.some(blocked => blocked.blocked_time === timeString);
          
          // Count current bookings for this time slot
          const currentBookings = existingBookings?.filter(booking => 
            booking.booking_time === timeString
          ).length || 0;
          
          // Check availability
          const isAvailable = !isBlocked && currentBookings < maxCapacity;
          
          slots.push({
            time: timeString,
            available: isAvailable,
            currentBookings,
            maxCapacity,
            isBlocked,
          });
        }
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedService || !selectedTimeSlot || !user) {
        throw new Error('Missing required booking information');
      }

      // First, get or create client
      const { data: existingClient } = await supabase
        .from('clients')
        .select('id')
        .eq('business_id', businessId)
        .eq('email', user.email)
        .single();

      let clientId = existingClient?.id;

      if (!clientId) {
        const { data: newClient, error: clientError } = await supabase
          .from('clients')
          .insert([{
            business_id: businessId,
            name: user.email?.split('@')[0] || 'Guest',
            email: user.email,
          }])
          .select('id')
          .single();

        if (clientError) throw clientError;
        clientId = newClient.id;
      }

      // Generate ticket number
      const ticketNumber = `TKT-${format(new Date(), 'yyyyMMdd')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

      // Create booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          business_id: businessId,
          client_id: clientId,
          service_id: selectedService.id,
          staff_id: selectedStaff?.id || null,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          booking_time: selectedTimeSlot,
          duration_minutes: selectedService.duration_minutes,
          total_amount: selectedService.price,
          status: 'confirmed',
          ticket_number: ticketNumber,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Booking created successfully!');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      setSelectedService(null);
      setSelectedStaff(null);
      setSelectedTimeSlot(null);
      onBookingComplete?.();
    },
    onError: (error) => {
      console.error('Booking error:', error);
      toast.error('Failed to create booking');
    },
  });

  const handleBooking = () => {
    createBookingMutation.mutate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Service Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Select Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services?.map((service) => (
            <div
              key={service.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedService?.id === service.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedService(service)}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">{service.name}</h3>
                <Badge variant="outline">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {service.price}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-3 w-3" />
                {service.duration_minutes} min
              </div>
              {service.description && (
                <p className="text-xs text-gray-500 mt-1">{service.description}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Date and Time Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />

          {selectedService && selectedDate && (
            <div className="space-y-2">
              <h4 className="font-medium">Available Times</h4>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(({ time, available, currentBookings, maxCapacity, isBlocked }) => (
                  <div key={time} className="relative">
                    <Button
                      variant={selectedTimeSlot === time ? "default" : "outline"}
                      size="sm"
                      disabled={!available}
                      onClick={() => setSelectedTimeSlot(time)}
                      className="w-full text-xs"
                    >
                      {time}
                      {isBlocked && <Lock className="h-3 w-3 ml-1" />}
                    </Button>
                    <div className="flex items-center justify-center mt-1">
                      <Badge variant={currentBookings >= maxCapacity ? "destructive" : "secondary"} className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {currentBookings}/{maxCapacity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Staff Selection & Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {staff && staff.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Select Staff (Optional)</h4>
              <div className="space-y-2">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className={`p-2 border rounded cursor-pointer text-sm ${
                      selectedStaff?.id === member.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedStaff(selectedStaff?.id === member.id ? null : member)}
                  >
                    {member.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedService && selectedDate && selectedTimeSlot && (
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{format(selectedDate, 'PPP')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{selectedService.duration_minutes} minutes</span>
                </div>
                {selectedStaff && (
                  <div className="flex justify-between">
                    <span>Staff:</span>
                    <span>{selectedStaff.name}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${selectedService.price}</span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={createBookingMutation.isPending}
                className="w-full"
              >
                {createBookingMutation.isPending ? 'Creating Booking...' : 'Book Appointment'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
