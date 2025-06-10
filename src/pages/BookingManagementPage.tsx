
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { BookingList } from '@/components/booking/BookingList';
import { BlockedTimeSlots } from '@/components/booking/BlockedTimeSlots';
import { CapacitySettings } from '@/components/booking/CapacitySettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, List, Lock, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const BookingManagementPage = () => {
  const { user } = useAuth();

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!business) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Business Found</h1>
          <p className="text-gray-600">Please set up your business first to manage bookings.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600">Manage appointments, capacity, and time slots</p>
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              All Bookings
            </TabsTrigger>
            <TabsTrigger value="blocked" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Blocked Slots
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Capacity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Book New Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingCalendar businessId={business.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingList businessId={business.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocked">
            <BlockedTimeSlots businessId={business.id} />
          </TabsContent>

          <TabsContent value="settings">
            <CapacitySettings businessId={business.id} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BookingManagementPage;
