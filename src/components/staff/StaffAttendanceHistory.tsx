
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clock } from "lucide-react";
import { format } from "date-fns";

interface StaffAttendanceHistoryProps {
  staff: any;
  businessId: string;
}

const StaffAttendanceHistory = ({ staff, businessId }: StaffAttendanceHistoryProps) => {
  const { data: attendance, isLoading } = useQuery({
    queryKey: ["staff-attendance-history", staff.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_attendance")
        .select("*")
        .eq("staff_id", staff.id)
        .order("attendance_date", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
    enabled: !!staff.id
  });

  if (isLoading) return <div>Loading attendance...</div>;
  if (!attendance || attendance.length === 0) return null;

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-5 w-5 text-green-600" />
        <span className="font-medium">Recent Attendance</span>
      </div>
      <ul className="text-sm space-y-2">
        {attendance.map((rec: any) => (
          <li key={rec.id}>
            <div>
              {format(new Date(rec.attendance_date), "PP")} &mdash;{" "}
              {rec.status.replace("_", " ")}
            </div>
            <div className="text-xs text-gray-400">
              {rec.sign_in_time ? `In: ${format(new Date(rec.sign_in_time), "p")}` : ""}
              {rec.sign_out_time ? `, Out: ${format(new Date(rec.sign_out_time), "p")}` : ""}
            </div>
            {rec.notes && (
              <div className="text-xs text-gray-500">Notes: {rec.notes}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffAttendanceHistory;
