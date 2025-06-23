
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Clock, DollarSign, Calendar as CalendarIcon, Users, Lock, User, CreditCard, ArrowLeft } from 'lucide-react';
import { format, addMinutes, setHours, setMinutes } from 'date-fns';
import { toast } from 'sonner';
import { ClientPaymentSection } from '@/components/payment/ClientPaymentSection';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  currency?: string;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  is_active: boolean;
}

interface MobileOptimizedBookingCalendarProps {
  businessId: string;
  selectedService: Service;
  onBookingComplete?: () => void;
}

const formatPrice = (price: number, currency: string = 'USD') => {
  if (currency === 'KES') {
    return `KSh ${price.toLocaleString()}`;
  }
  return `$${price}`;
};

export const MobileOptimizedBookingCalendar = ({ businessId, selectedService, onBookingComplete }: MobileOptimizedBookingCalendarProps) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'date' | 'time' | 'info' | 'payment'>('date');
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Fetch business info for currency and payment details
  const { data: business } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();
      
      if (error) throw error;
      return data;
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

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    const slotDuration = businessSettings?.booking_slot_duration_minutes || 30;
    const maxCapacity = businessSettings?.max_bookings_per_slot || 5;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotTime = setMinutes(setHours(new Date(), hour), minute);
        const slotEndTime = addMinutes(slotTime, selectedService.duration_minutes);
        
        if (slotEndTime.getHours() <= endHour) {
          const timeString = format(slotTime, 'HH:mm');
          const currentBookings = existingBookings?.filter(booking => 
            booking.booking_time === timeString
          ).length || 0;
          
          const isAvailable = currentBookings < maxCapacity;
          
          slots.push({
            time: timeString,
            available: isAvailable,
            currentBookings,
            maxCapacity,
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
      if (!selectedDate || !selectedTimeSlot || !customerInfo.name || !customerInfo.email) {
        throw new Error('Please fill in all required fields');
      }

      // Get or create client
      const { data: existingClient } = await supabase
        .from('clients')
        .select('id')
        .eq('business_id', businessId)
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
          business_id: businessId,
          client_id: clientId,
          service_id: selectedService.id,
          staff_id: selectedStaff?.id || null,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          booking_time: selectedTimeSlot,
          duration_minutes: selectedService.duration_minutes,
          total_amount: selectedService.price,
          status: 'confirmed',
          payment_status: 'pending',
          ticket_number: ticketNumber,
          notes: customerInfo.notes,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Booking confirmed! Your ticket number is ${data.ticket_number}`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      setShowPayment(true);
    },
    onError: (error) => {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    },
  });

  const handleBooking = () => {
    createBookingMutation.mutate();
  };

  const isFormValid = customerInfo.name && customerInfo.email && selectedDate && selectedTimeSlot;
  const currency = business?.currency || selectedService.currency || 'USD';

  const renderStepContent = () => {
    switch (currentStep) {
      case 'date':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border w-full"
            />
            {selectedDate && (
              <Button 
                onClick={() => setCurrentStep('time')} 
                className="w-full"
              >
                Continue to Time Selection
              </Button>
            )}
          </div>
        );

      case 'time':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep('date')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Select Time</h3>
            </div>
            
            <div className="text-sm text-gray-600">
              {format(selectedDate!, 'EEEE, MMMM d, yyyy')}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(({ time, available, currentBookings, maxCapacity }) => (
                <div key={time} className="relative">
                  <Button
                    variant={selectedTimeSlot === time ? "default" : "outline"}
                    size="sm"
                    disabled={!available}
                    onClick={() => setSelectedTimeSlot(time)}
                    className="w-full text-xs"
                  >
                    {time}
                    {!available && <Lock className="h-3 w-3 ml-1" />}
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

            {selectedTimeSlot && (
              <Button 
                onClick={() => setCurrentStep('info')} 
                className="w-full"
              >
                Continue to Your Information
              </Button>
            )}
          </div>
        );

      case 'info':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep('time')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Your Information</h3>
            </div>
            
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
                  placeholder="+1 (555) 123-4567"
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
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{format(selectedDate!, 'PPP')}</span>
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
                  <span>{formatPrice(selectedService.price, currency)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBooking}
              disabled={!isFormValid || createBookingMutation.isPending}
              className="w-full"
            >
              {createBookingMutation.isPending ? 'Creating Booking...' : 'Book Appointment'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (showPayment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Complete Your Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ClientPaymentSection
            services={[{
              id: selectedService.id,
              name: selectedService.name,
              price: selectedService.price,
              currency: currency
            }]}
            clientEmail={customerInfo.email}
            businessName={business?.name || ''}
            businessCurrency={currency}
            paymentInstructions={business?.payment_instructions}
            business={{
              id: businessId,
              phone: business?.phone,
              whatsapp: business?.whatsapp,
              email: business?.email,
              address: business?.address,
              latitude: business?.latitude,
              longitude: business?.longitude
            }}
            onPaymentSuccess={() => {
              toast.success('Payment completed successfully!');
              onBookingComplete?.();
            }}
          />
          <Button
            variant="outline"
            onClick={() => setShowPayment(false)}
            className="w-full mt-4"
          >
            Back to Booking Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book {selectedService.name}</CardTitle>
        <p className="text-sm text-gray-600">
          Duration: {selectedService.duration_minutes} minutes • Price: {formatPrice(selectedService.price, currency)}
        </p>
      </CardHeader>
      <CardContent>
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};
