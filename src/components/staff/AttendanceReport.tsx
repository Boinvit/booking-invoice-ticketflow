
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { format, parseISO, differenceInHours } from 'date-fns';

export const AttendanceReport = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

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

  const { data: attendanceData } = useQuery({
    queryKey: ['attendance-report', business?.id, startDate, endDate],
    queryFn: async () => {
      if (!business) return [];
      
      const { data, error } = await supabase
        .from('staff_attendance')
        .select(`
          *,
          staff:staff_id(name, email)
        `)
        .eq('business_id', business.id)
        .gte('attendance_date', startDate)
        .lte('attendance_date', endDate)
        .order('attendance_date', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  const calculateWorkingHours = (signIn: string, signOut: string | null) => {
    if (!signOut) return 'Still working';
    return `${differenceInHours(parseISO(signOut), parseISO(signIn))}h`;
  };

  const getStaffSummary = () => {
    if (!attendanceData) return [];

    const staffMap = new Map();
    
    attendanceData.forEach(record => {
      const staffId = record.staff_id;
      if (!staffMap.has(staffId)) {
        staffMap.set(staffId, {
          name: record.staff?.name,
          email: record.staff?.email,
          totalDays: 0,
          totalHours: 0,
          records: []
        });
      }
      
      const staff = staffMap.get(staffId);
      staff.records.push(record);
      staff.totalDays++;
      
      if (record.sign_out_time) {
        staff.totalHours += differenceInHours(
          parseISO(record.sign_out_time), 
          parseISO(record.sign_in_time)
        );
      }
    });

    return Array.from(staffMap.values());
  };

  const staffSummary = getStaffSummary();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <Label htmlFor="start-date">From:</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-auto"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="end-date">To:</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      {/* Staff Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffSummary.map((staff, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{staff.name}</CardTitle>
              <p className="text-sm text-gray-600">{staff.email}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Days worked: {staff.totalDays}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm">Total hours: {staff.totalHours}h</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Avg hours/day: {(staff.totalHours / staff.totalDays || 0).toFixed(1)}h</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Records */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          {attendanceData && attendanceData.length > 0 ? (
            <div className="space-y-3">
              {attendanceData.map((record) => (
                <div key={record.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="space-y-1">
                    <p className="font-medium">{record.staff?.name}</p>
                    <p className="text-sm text-gray-600">
                      {format(parseISO(record.attendance_date), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(parseISO(record.sign_in_time), 'HH:mm')}
                      {record.sign_out_time && ` - ${format(parseISO(record.sign_out_time), 'HH:mm')}`}
                    </p>
                    {record.notes && (
                      <p className="text-sm text-gray-500">Notes: {record.notes}</p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={record.status === 'signed_in' ? 'default' : 'secondary'}>
                      {record.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {calculateWorkingHours(record.sign_in_time, record.sign_out_time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No attendance records found for the selected period.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
