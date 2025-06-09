
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { BookingList } from '@/components/booking/BookingList';
import { BlockedTimeSlots } from '@/components/booking/BlockedTimeSlots';
import { CapacitySettings } from '@/components/booking/CapacitySettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, List, Lock, Settings } from 'lucide-react';

const BookingManagementPage = () => {
  // For demo purposes, using a placeholder business ID
  // In a real app, this would come from the user's business context
  const businessId = "demo-business-id";

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
                <BookingCalendar businessId={businessId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocked">
            <BlockedTimeSlots businessId={businessId} />
          </TabsContent>

          <TabsContent value="settings">
            <CapacitySettings businessId={businessId} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BookingManagementPage;
