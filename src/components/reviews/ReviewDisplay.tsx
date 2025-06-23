
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  created_at: string;
  bookings?: {
    clients?: {
      name: string;
    };
  };
}

interface ReviewDisplayProps {
  reviews: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export const ReviewDisplay = ({ reviews, averageRating, totalReviews }: ReviewDisplayProps) => {
  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`${size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'} ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  if (!reviews?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">Be the first to leave a review!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {averageRating && totalReviews && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">{renderStars(Math.round(averageRating), 'lg')}</div>
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600">
                Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="py-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="font-medium text-sm">
                    {review.bookings?.clients?.name || 'Anonymous Customer'}
                  </p>
                </div>
              </div>
              {review.comment && (
                <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
