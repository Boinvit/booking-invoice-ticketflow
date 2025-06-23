
-- Add missing columns to staff table
ALTER TABLE public.staff 
ADD COLUMN workload TEXT,
ADD COLUMN shift TEXT;
