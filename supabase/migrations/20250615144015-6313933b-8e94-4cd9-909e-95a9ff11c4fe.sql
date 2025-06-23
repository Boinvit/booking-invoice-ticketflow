
-- Create staff attendance table for digital work register
CREATE TABLE public.staff_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  sign_in_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sign_out_time TIMESTAMP WITH TIME ZONE NULL,
  attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT NULL,
  location_info JSONB NULL, -- For storing GPS coordinates if needed
  status TEXT NOT NULL DEFAULT 'signed_in' CHECK (status IN ('signed_in', 'signed_out', 'break', 'late', 'absent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.staff_attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for staff attendance
CREATE POLICY "Business owners can view all attendance records"
  ON public.staff_attendance
  FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can create attendance records"
  ON public.staff_attendance
  FOR INSERT
  WITH CHECK (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can update attendance records"
  ON public.staff_attendance
  FOR UPDATE
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE user_id = auth.uid()
    )
  );

-- Create index for performance
CREATE INDEX idx_staff_attendance_staff_date ON public.staff_attendance(staff_id, attendance_date);
CREATE INDEX idx_staff_attendance_business_date ON public.staff_attendance(business_id, attendance_date);

-- Create trigger for updated_at
CREATE TRIGGER update_staff_attendance_updated_at
  BEFORE UPDATE ON public.staff_attendance
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();
