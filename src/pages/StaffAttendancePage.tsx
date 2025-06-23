
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StaffAttendance } from '@/components/staff/StaffAttendance';
import { AttendanceReport } from '@/components/staff/AttendanceReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, BarChart3 } from 'lucide-react';

const StaffAttendancePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Attendance</h1>
          <p className="text-gray-600">Digital work attendance register for your team</p>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Daily Attendance
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <StaffAttendance />
          </TabsContent>

          <TabsContent value="reports">
            <AttendanceReport />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StaffAttendancePage;
