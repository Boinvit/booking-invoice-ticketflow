
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, User, Briefcase } from "lucide-react";
import { format } from "date-fns";

interface StaffUpcomingBookingsProps {
  staff: any;
  businessId: string;
}

const StaffUpcomingBookings = ({ staff, businessId }: StaffUpcomingBookingsProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["staff-upcoming-bookings", staff.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          clients:client_id(name, email, phone),
          services:service_id(name, duration_minutes)
        `)
        .eq("business_id", businessId)
        .eq("staff_id", staff.id)
        .gte("booking_date", today)
        .neq("status", "cancelled")
        .order("booking_date", { ascending: true })
        .order("booking_time", { ascending: true })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
    enabled: !!staff.id && !!businessId
  });

  if (isLoading) {
    return (
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="font-medium">Upcoming Bookings</span>
        </div>
        <p className="text-sm text-gray-500">No upcoming bookings assigned</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-blue-500" />
        <span className="font-medium">Upcoming Bookings</span>
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          {bookings.length}
        </span>
      </div>
      <div className="space-y-3">
        {bookings.map((booking: any) => (
          <div key={booking.id} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded-r">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    {booking.services?.name || 'Service'}
                  </span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {booking.clients?.name || 'Unknown Client'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(booking.booking_date), "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{booking.booking_time}</span>
                  </div>
                  {booking.services?.duration_minutes && (
                    <span>({booking.services.duration_minutes} min)</span>
                  )}
                </div>
              </div>
            </div>
            {booking.notes && (
              <div className="mt-2 text-xs text-gray-600 italic">
                Note: {booking.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffUpcomingBookings;
