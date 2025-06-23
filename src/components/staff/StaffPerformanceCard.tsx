
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, TrendingUp } from "lucide-react";

interface StaffPerformanceCardProps {
  staff: any;
  businessId: string;
}

const StaffPerformanceCard = ({ staff, businessId }: StaffPerformanceCardProps) => {
  // Attendance summary
  const { data: attendance } = useQuery({
    queryKey: ["attendance-summary", staff.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_attendance")
        .select("*")
        .eq("staff_id", staff.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!staff.id
  });

  // Bookings summary
  const { data: bookings } = useQuery({
    queryKey: ["bookings-summary", staff.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("business_id", businessId)
        .eq("staff_id", staff.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!staff.id && !!businessId
  });

  const totalDays = attendance ? new Set(attendance.map((a: any) => a.attendance_date)).size : 0;
  const presentDays = attendance ? attendance.filter((a: any) => a.status === "signed_in" || a.status === "signed_out").length : 0;
  const totalBookings = bookings?.length || 0;

  const attendancePercent = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(0) : "0";

  return (
    <div className="bg-white p-5 shadow rounded-lg">
      <div className="flex items-center gap-4 mb-2">
        <BarChart3 className="h-6 w-6 text-blue-500" />
        <div>
          <div className="font-bold text-lg">{staff.name}</div>
          <div className="text-sm text-gray-500">{staff.email}</div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <div className="text-2xl font-bold">{totalBookings}</div>
          <div className="text-xs text-gray-600">Total Bookings</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{attendancePercent}%</div>
          <div className="text-xs text-gray-600">Attendance Rate</div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <div className="text-xs text-gray-600">Performance</div>
        </div>
      </div>
    </div>
  );
};

export default StaffPerformanceCard;
