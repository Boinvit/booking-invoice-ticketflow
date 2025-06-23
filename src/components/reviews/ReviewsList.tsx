<<<<<<< HEAD

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Card, CardContent } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/loading-skeleton';
=======
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
import { format } from 'date-fns';

interface ReviewsListProps {
  businessId: string;
}

export const ReviewsList = ({ businessId }: ReviewsListProps) => {
<<<<<<< HEAD
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
=======
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['business-reviews', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_reviews')
        .select(`
          *,
          bookings (
            clients (
              name
            )
          )
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
        `)
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

      if (error) throw error;
<<<<<<< HEAD
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
=======
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (!reviews?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No reviews yet</p>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
<<<<<<< HEAD
      <p className="text-sm text-gray-600">
        Note: Review system will be fully functional once business_reviews table is properly set up.
      </p>
      {/* Placeholder for actual reviews when table is ready */}
    </div>
  );
};
=======
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {format(new Date(review.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="font-medium">
                  {review.bookings?.clients?.name || 'Anonymous'}
                </p>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
