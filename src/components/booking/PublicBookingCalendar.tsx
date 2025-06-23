<<<<<<< HEAD
=======

>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Calendar as CalendarIcon, Users, Lock, User } from 'lucide-react';
import { format, addMinutes, setHours, setMinutes } from 'date-fns';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
<<<<<<< HEAD
  currency?: string;
=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
}

interface Staff {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  is_active: boolean;
}

interface PublicBookingCalendarProps {
  businessId: string;
  selectedService: Service;
  onBookingComplete?: () => void;
}

<<<<<<< HEAD
const formatPrice = (price: number, currency: string = 'USD') => {
  if (currency === 'KES') {
    return `KES ${price}`;
  }
  return `$${price}`;
};

=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
export const PublicBookingCalendar = ({ businessId, selectedService, onBookingComplete }: PublicBookingCalendarProps) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

<<<<<<< HEAD
  // Fetch business info for currency
  const { data: business } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('currency')
        .eq('id', businessId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
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

<<<<<<< HEAD
  // Improved booking mutation with better error handling
  const createBookingMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedTimeSlot || !customerInfo.name.trim() || !customerInfo.email.trim()) {
        throw new Error('Please fill in all required fields');
      }

      const email = customerInfo.email.toLowerCase().trim();
      const name = customerInfo.name.trim();

      // Step 1: Handle client creation/update with simpler logic
      let clientId = null;
      
      // Check for existing client
=======
  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedTimeSlot || !customerInfo.name || !customerInfo.email) {
        throw new Error('Please fill in all required fields');
      }

      // First, get or create client
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      const { data: existingClient } = await supabase
        .from('clients')
        .select('id')
        .eq('business_id', businessId)
<<<<<<< HEAD
        .eq('email', email)
        .maybeSingle();

      if (existingClient) {
        clientId = existingClient.id;
      } else {
        // Create new client
        const { data: newClient, error: createError } = await supabase
          .from('clients')
          .insert({
            business_id: businessId,
            name: name,
            email: email,
            phone: customerInfo.phone?.trim() || null,
          })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating client:', createError);
          throw new Error('Failed to create client profile');
        }

        clientId = newClient.id;
      }

      // Step 2: Create booking
      const ticketNumber = `TKT-${Date.now()}`;
      const currency = business?.currency || selectedService.currency || 'USD';

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
=======
        .eq('email', customerInfo.email)
        .single();

      let clientId = existingClient?.id;

      if (!clientId) {
        const { data: newClient, error: clientError } = await supabase
          .from('clients')
          .insert([{
            business_id: businessId,
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
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
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
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
<<<<<<< HEAD
          notes: customerInfo.notes?.trim() || null,
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        throw new Error('Failed to create booking');
      }

      return booking;
    },
    onSuccess: (data) => {
      toast.success(`Booking confirmed! Your ticket number is ${data.ticket_number}`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      
      // Reset form
=======
          notes: customerInfo.notes,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Booking created successfully!');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      setSelectedStaff(null);
      setSelectedTimeSlot(null);
      setCustomerInfo({ name: '', email: '', phone: '', notes: '' });
      onBookingComplete?.();
    },
<<<<<<< HEAD
    onError: (error: any) => {
      console.error('Booking failed:', error);
      toast.error(error.message || 'Failed to create booking. Please try again.');
=======
    onError: (error) => {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
    },
  });

  const handleBooking = () => {
    createBookingMutation.mutate();
  };

<<<<<<< HEAD
  const isFormValid = customerInfo.name.trim() && customerInfo.email.trim() && selectedDate && selectedTimeSlot;
  const currency = business?.currency || selectedService.currency || 'USD';
=======
  const isFormValid = customerInfo.name && customerInfo.email && selectedDate && selectedTimeSlot;
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book {selectedService.name}</CardTitle>
        <p className="text-sm text-gray-600">
<<<<<<< HEAD
          Duration: {selectedService.duration_minutes} minutes • Price: {formatPrice(selectedService.price, currency)}
=======
          Duration: {selectedService.duration_minutes} minutes • Price: ${selectedService.price}
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Date and Time Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Select Date & Time
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <h4 className="font-medium">Available Times</h4>
                <div className="grid grid-cols-3 gap-2">
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

            {/* Staff Selection */}
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
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Your Information
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="notes">Special Requests</Label>
                <Textarea
                  id="notes"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requests or notes..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Booking Summary */}
            {isFormValid && (
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
<<<<<<< HEAD
                    <span>{formatPrice(selectedService.price, currency)}</span>
=======
                    <span>${selectedService.price}</span>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleBooking}
              disabled={!isFormValid || createBookingMutation.isPending}
              className="w-full"
            >
              {createBookingMutation.isPending ? 'Creating Booking...' : 'Book Appointment'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
<<<<<<< HEAD
              You'll receive a confirmation via email and be added as a client
=======
              You'll receive a confirmation via email
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
