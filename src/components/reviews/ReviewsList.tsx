
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewsListProps {
  businessId: string;
}

export const ReviewsList = ({ businessId }: ReviewsListProps) => {
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
        `)
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

      if (error) throw error;
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
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
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
