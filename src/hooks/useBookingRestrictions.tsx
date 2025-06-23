
import { useState, useEffect } from 'react';
import { differenceInHours, parseISO } from 'date-fns';

interface BookingRestrictions {
  canReschedule: boolean;
  hoursUntilBooking: number;
  requiresPrepayment: boolean;
  rescheduleDeadline: Date | null;
}

export const useBookingRestrictions = (
  bookingDate: string,
  bookingTime: string,
  subscriptionPlan?: string
) => {
  const [restrictions, setRestrictions] = useState<BookingRestrictions>({
    canReschedule: false,
    hoursUntilBooking: 0,
    requiresPrepayment: false,
    rescheduleDeadline: null
  });

  useEffect(() => {
    if (!bookingDate || !bookingTime) return;

    const bookingDateTime = parseISO(`${bookingDate}T${bookingTime}`);
    const now = new Date();
    const hoursUntilBooking = differenceInHours(bookingDateTime, now);
    const canReschedule = hoursUntilBooking > 2;
    const rescheduleDeadline = new Date(bookingDateTime.getTime() - (2 * 60 * 60 * 1000)); // 2 hours before

    // Pay-as-you-go plans require prepayment
    const requiresPrepayment = subscriptionPlan === 'payasyougo';

    setRestrictions({
      canReschedule,
      hoursUntilBooking,
      requiresPrepayment,
      rescheduleDeadline
    });
  }, [bookingDate, bookingTime, subscriptionPlan]);

  return restrictions;
};
