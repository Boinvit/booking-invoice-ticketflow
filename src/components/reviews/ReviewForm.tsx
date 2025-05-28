import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ReviewFormProps {
  businessId: string;
  bookingId: string;
  onSuccess?: () => void;
}

export const ReviewForm = ({ businessId, bookingId, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('business_reviews')
        .insert({
          business_id: businessId,
          booking_id: bookingId,
          rating: rating,
          comment: data.comment,
        });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Rating</Label>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={cn(
                "p-1 hover:text-yellow-400 transition-colors",
                rating >= star ? "text-yellow-400" : "text-gray-300"
              )}
            >
              <StarIcon className="h-8 w-8" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          {...register('comment', { required: 'Please provide your feedback' })}
          placeholder="Share your experience..."
          className="mt-2"
        />
        {errors.comment && (
          <p className="text-sm text-red-500 mt-1">{errors.comment.message as string}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};