
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/loading-skeleton';
import { toast } from 'sonner';

interface StaffListProps {
  onEditStaff?: (staff: any) => void;
}

export const StaffList = ({ onEditStaff }: StaffListProps) => {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();

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

  const { data: staff, isLoading, error } = useQuery({
    queryKey: ['staff', business?.id],
    queryFn: async () => {
      if (!business) return [];
      
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('business_id', business.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!business,
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (staffId: string) => {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', staffId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Staff member deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
    onError: (error) => {
      handleError(error, { customMessage: 'Failed to delete staff member' });
    },
  });

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-red-600 mb-4">
            <User className="mx-auto h-12 w-12 mb-2" />
            <p>Failed to load staff</p>
          </div>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!staff || staff.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members yet</h3>
          <p className="text-gray-600">
            Add your first staff member to start managing your team.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member) => (
        <Card key={member.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant={member.is_active ? "default" : "secondary"}>
                    {member.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditStaff?.(member)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteStaffMutation.mutate(member.id)}
                  disabled={deleteStaffMutation.isPending}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              {member.email}
            </div>
            
            {member.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                {member.phone}
              </div>
            )}

            {member.specialties && member.specialties.length > 0 && (
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-gray-700 mb-1">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
