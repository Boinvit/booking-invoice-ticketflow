
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Card, CardContent } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/loading-skeleton';
import { format } from 'date-fns';

interface ReviewsListProps {
  businessId: string;
}

export const ReviewsList = ({ businessId }: ReviewsListProps) => {
  const { handleError } = useErrorHandler();

  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['business-reviews', businessId],
    queryFn: async () => {
      // Note: business_reviews table doesn't exist yet in types, using placeholder
      // This will need to be updated when the table is properly created
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          clients(name)
        `)
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Handle error using useEffect
  React.useEffect(() => {
    if (error) {
      handleError(error, { customMessage: 'Failed to load reviews' });
    }
  }, [error, handleError]);

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-red-600 mb-4">
            <Star className="mx-auto h-12 w-12 mb-2" />
            <p>Failed to load reviews</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600">
            Reviews will appear here when clients leave feedback about your services.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Note: Review system will be fully functional once business_reviews table is properly set up.
      </p>
      {/* Placeholder for actual reviews when table is ready */}
    </div>
  );
};
