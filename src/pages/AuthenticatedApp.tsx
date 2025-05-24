
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BusinessSetup } from '@/components/dashboard/BusinessSetup';

export const AuthenticatedApp = () => {
  const { user } = useAuth();

  // Check if user has a business
  const { data: business, isLoading } = useQuery({
    queryKey: ['business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {!business ? (
        <BusinessSetup />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Clients</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-500">Total clients</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-purple-600">$0</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Services</h3>
              <p className="text-3xl font-bold text-orange-600">0</p>
              <p className="text-sm text-gray-500">Available services</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity. Start by adding your first service!</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
