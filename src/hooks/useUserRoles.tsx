
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'moderator' | 'user';

export const useUserRoles = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get current user's roles
  const { data: userRoles, isLoading: rolesLoading } = useQuery({
    queryKey: ['user-roles', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(r => r.role as UserRole);
    },
    enabled: !!user,
  });

  // Check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    return userRoles?.includes(role) || false;
  };

  // Assign admin role to a user by email
  const assignAdminMutation = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.rpc('assign_admin_role', {
        _user_email: email
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Admin role assigned successfully!');
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
    },
    onError: (error: any) => {
      console.error('Error assigning admin role:', error);
      toast.error(error.message || 'Failed to assign admin role');
    },
  });

  return {
    userRoles,
    rolesLoading,
    hasRole,
    isAdmin: hasRole('admin'),
    isModerator: hasRole('moderator'),
    assignAdmin: assignAdminMutation.mutate,
    assigningAdmin: assignAdminMutation.isPending,
  };
};
