import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Booking {
  id: string;
  business_id: string;
  client_id: string;
  service_id: string;
  staff_id: string | null;
  booking_date: string;
  booking_time: string;
  duration_minutes: number;
  total_amount: number;
  status: string;
  ticket_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface StaffMember {
  id: string;
  business_id: string;
  name: string;
  email: string;
  phone: string | null;
  gender: string | null;
  is_active: boolean;
  specialties: string[];
  created_at: string;
  updated_at: string;
}

interface Client {
  id: string;
  business_id: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface BookingCalendarProps {
  businessId: string;
}

export const BookingCalendar = ({ businessId }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [genderPreference, setGenderPreference] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: services } = useQuery({
    queryKey: ['services', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId);

      if (error) {
        throw new Error(error.message);
      }
      return data as Service[];
    },
  });

  const { data: staff } = useQuery({
    queryKey: ['staff', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('business_id', businessId);

      if (error) {
        throw new Error(error.message);
      }
      return data as StaffMember[];
    },
  });

  const { data: clients } = useQuery({
    queryKey: ['clients', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('business_id', businessId);

      if (error) {
        throw new Error(error.message);
      }
      return data as Client[];
    },
  });

  const { data: bookings, refetch } = useQuery({
    queryKey: ['bookings', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('business_id', businessId);

      if (error) {
        throw new Error(error.message);
      }
      return data as Booking[];
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (newBooking: any) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking]);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', businessId] });
      toast.success('Booking created successfully!');
      setIsBookingDialogOpen(false);
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Failed to create booking: ${error.message}`);
    },
  });

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setIsBookingDialogOpen(true);
  };

  const handleBookingDialogClose = () => {
    setIsBookingDialogOpen(false);
    setService(null);
    setStaffMember(null);
    setClient(null);
    setSelectedDate(null);
  };

  const handleCreateBooking = async () => {
    if (!service || !staffMember || !client || !selectedDate) {
      toast.error('Please select a service, staff member, client, and date.');
      return;
    }

    const bookingDate = format(selectedDate, 'yyyy-MM-dd');
    const bookingTime = '10:00'; // Default time for now

    const newBooking = {
      business_id: businessId,
      client_id: client.id,
      service_id: service.id,
      staff_id: staffMember.id,
      booking_date: bookingDate,
      booking_time: bookingTime,
      duration_minutes: service.duration_minutes,
      total_amount: service.price,
      status: 'confirmed',
      ticket_number: 'TBD',
      notes: '',
    };

    createBookingMutation.mutate(newBooking);
  };

  const availableGenders = [...new Set(staff?.map(s => s.gender).filter(Boolean))];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={handleDateClick}
        events={
          bookings?.map((booking) => ({
            title: `Booking ${booking.id}`,
            start: `${booking.booking_date}T${booking.booking_time}`,
            end: `${booking.booking_date}T${booking.booking_time}`,
          })) || []
        }
      />

      <Dialog open={isBookingDialogOpen} onOpenChange={handleBookingDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
          </DialogHeader>

          {selectedDate && (
            <div className="mb-4">
              <Label>Date:</Label>
              <Input
                type="text"
                value={format(selectedDate, 'PPP')}
                readOnly
              />
            </div>
          )}

          <div>
            <Label htmlFor="service">Service</Label>
            <select
              id="service"
              className="w-full border-gray-300 rounded px-2 py-2"
              value={service?.id || ''}
              onChange={(e) => {
                const selectedService = services?.find((s) => s.id === e.target.value);
                setService(selectedService || null);
              }}
            >
              <option value="">Select a service</option>
              {services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="staff">Staff Member</Label>
            <select
              id="staff"
              className="w-full border-gray-300 rounded px-2 py-2"
              value={staffMember?.id || ''}
              onChange={(e) => {
                const selectedStaff = staff?.find((s) => s.id === e.target.value);
                setStaffMember(selectedStaff || null);
              }}
            >
              <option value="">Select a staff member</option>
              {staff?.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <select
              id="client"
              className="w-full border-gray-300 rounded px-2 py-2"
              value={client?.id || ''}
              onChange={(e) => {
                const selectedClient = clients?.find((c) => c.id === e.target.value);
                setClient(selectedClient || null);
              }}
            >
              <option value="">Select a client</option>
              {clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add to the JSX of the booking form where clients select details */}
          <div>
            <label className="block font-medium mb-1">Staff Gender Preference (optional)</label>
            <select
              value={genderPreference}
              onChange={e => setGenderPreference(e.target.value)}
              className="w-full border-gray-300 rounded px-2 py-2"
            >
              <option value="">No Preference</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <Button onClick={handleCreateBooking} disabled={createBookingMutation.isPending}>
            {createBookingMutation.isPending ? 'Creating...' : 'Create Booking'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
