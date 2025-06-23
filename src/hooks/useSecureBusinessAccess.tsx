
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useSecureBusinessAccess = (businessId?: string) => {
  const { user } = useAuth();

  const { data: hasAccess, isLoading, error } = useQuery({
    queryKey: ['business-access', businessId, user?.id],
    queryFn: async () => {
      if (!user?.id || !businessId) return false;

      // Validate business ID format (UUID)
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidPattern.test(businessId)) {
        throw new Error('Invalid business ID format');
      }

      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('id, user_id, name')
          .eq('id', businessId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No rows returned - user doesn't own this business
            return false;
          }
          throw error;
        }

        return !!data;
      } catch (err) {
        console.error('Business access check failed:', err);
        throw err;
      }
    },
    enabled: !!user?.id && !!businessId,
    retry: false,
  });

  const validateBusinessAccess = (requiredBusinessId: string): boolean => {
    if (!user?.id) {
      toast.error('Authentication required');
      return false;
    }

    if (!hasAccess) {
      toast.error('Access denied: You do not own this business');
      return false;
    }

    return true;
  };

  return {
    hasAccess: hasAccess || false,
    isLoading,
    error,
    validateBusinessAccess
  };
};
