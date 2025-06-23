
export const validateGeneralForm = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const slotDuration = formData.get('slot_duration') as string;
  const maxBookings = formData.get('max_bookings') as string;
  
  if (!slotDuration || parseInt(slotDuration) < 15) {
    errors.slot_duration = 'Slot duration must be at least 15 minutes';
  }
  
  if (!maxBookings || parseInt(maxBookings) < 1) {
    errors.max_bookings = 'Maximum bookings must be at least 1';
  }
  
  return errors;
};
