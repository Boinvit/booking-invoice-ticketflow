
-- Add the missing is_transport_service column to the services table
ALTER TABLE public.services 
ADD COLUMN is_transport_service BOOLEAN DEFAULT FALSE;

-- Add transport_details column to store transport-specific information
ALTER TABLE public.services 
ADD COLUMN transport_details JSONB DEFAULT NULL;

-- Update existing transport services to set is_transport_service = true
UPDATE public.services 
SET is_transport_service = TRUE 
WHERE category IN ('bus', 'train', 'taxi', 'flight', 'ride-sharing', 'courier', 'car-rental');
