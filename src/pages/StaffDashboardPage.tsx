
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import StaffPerformanceCard from "@/components/staff/StaffPerformanceCard";
import StaffUpcomingBookings from "@/components/staff/StaffUpcomingBookings";
import StaffAttendanceHistory from "@/components/staff/StaffAttendanceHistory";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Users } from "lucide-react";

const StaffDashboardPage = () => {
  const { user } = useAuth();

  // Fetch business id
  const { data: business, isLoading: businessLoading, error: businessError } = useQuery({
    queryKey: ["user-business", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        console.error("Error fetching business for staff dashboard:", error);
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });

  // Fetch staff list
  const { data: staff, isLoading: staffLoading, error: staffError } = useQuery({
    queryKey: ["staff", business?.id],
    queryFn: async () => {
      if (!business) return [];
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .eq("business_id", business.id)
        .eq("is_active", true)
        .order('name');
      if (error) {
        console.error("Error fetching staff for staff dashboard:", error);
        throw error;
      }
      return data || [];
    },
    enabled: !!business,
  });

  const isLoading = businessLoading || staffLoading;

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Please log in to view the staff dashboard.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (businessError) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <Users className="mx-auto h-12 w-12 mb-2" />
            <p>Failed to load business information.</p>
            <p className="text-sm mt-2">{businessError.message}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (staffError) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <Users className="mx-auto h-12 w-12 mb-2" />
            <p>Failed to load staff data.</p>
            <p className="text-sm mt-2">{staffError.message}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!business) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Business Found</h3>
          <p className="text-gray-600">
            Please set up your business profile before viewing the staff dashboard.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!staff || staff.length === 0) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Staff Members</h3>
            <p className="text-gray-600">
              Add staff members to your team to see their performance and attendance data here.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Dashboard</h1>
          <p className="text-gray-600">
            Monitor your team's performance and attendance for {business.name}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {staff.map((member: any) => (
            <div key={member.id} className="space-y-4">
              <StaffPerformanceCard staff={member} businessId={business.id} />
              <StaffUpcomingBookings staff={member} businessId={business.id} />
              <StaffAttendanceHistory staff={member} businessId={business.id} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboardPage;
