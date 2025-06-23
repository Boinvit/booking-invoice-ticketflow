
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  activeBookings: number;
  todayRevenue: number;
  monthlyBookings: number;
  totalClients: number;
}

export const useDashboardData = (businessId?: string) => {
  // Get business data
  const { data: business } = useQuery({
    queryKey: ['business-data', businessId],
    queryFn: async () => {
      if (!businessId) return null;

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!businessId,
  });

  const actualBusinessId = businessId || business?.id;

  // Get dashboard statistics - only count revenue from completed payments
  const { data: stats, isLoading: statsLoading, refetch } = useQuery({
    queryKey: ['dashboard-stats', actualBusinessId],
    queryFn: async () => {
      if (!actualBusinessId) return {
        activeBookings: 0,
        todayRevenue: 0,
        monthlyBookings: 0,
        totalClients: 0,
      };

      const today = new Date().toISOString().split('T')[0];
      const thisMonth = new Date().toISOString().slice(0, 7);

      // Get today's confirmed bookings
      const { data: todayBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('business_id', actualBusinessId)
        .eq('booking_date', today)
        .in('status', ['confirmed', 'completed']);

      // Get today's revenue from completed payments only
      const { data: todayPayments } = await supabase
        .from('bookings')
        .select('total_amount')
        .eq('business_id', actualBusinessId)
        .eq('booking_date', today)
        .eq('payment_status', 'completed')
        .in('status', ['confirmed', 'completed']);

      // Get this month's bookings
      const { data: monthlyBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('business_id', actualBusinessId)
        .gte('booking_date', `${thisMonth}-01`)
        .in('status', ['confirmed', 'completed']);

      // Get total clients
      const { data: clients } = await supabase
        .from('clients')
        .select('id')
        .eq('business_id', actualBusinessId);

      const todayRevenue = todayPayments?.reduce((sum, booking) => sum + Number(booking.total_amount || 0), 0) || 0;

      return {
        activeBookings: todayBookings?.length || 0,
        todayRevenue,
        monthlyBookings: monthlyBookings?.length || 0,
        totalClients: clients?.length || 0,
      };
    },
    enabled: !!actualBusinessId,
  });

  // Get currency from business data
  const currency = business?.currency || 'KES';

  // Format price function
  const formatPrice = (amount: number) => {
    if (currency === 'KES') {
      return `KES ${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()}`;
  };

  // Handle KPI refresh
  const handleKpiRefresh = () => {
    refetch();
  };

  return {
    business,
    stats: stats || {
      activeBookings: 0,
      todayRevenue: 0,
      monthlyBookings: 0,
      totalClients: 0,
    },
    statsLoading,
    currency,
    formatPrice,
    handleKpiRefresh,
  };
};
