
-- Add the missing 'notes' column to the invoices table
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add currency support to businesses table
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';

-- Add currency to services table  
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';

-- Add currency to invoices table
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';

-- Enable real-time updates for dashboard data
ALTER TABLE public.bookings REPLICA IDENTITY FULL;
ALTER TABLE public.invoices REPLICA IDENTITY FULL;
ALTER TABLE public.clients REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.invoices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.clients;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
