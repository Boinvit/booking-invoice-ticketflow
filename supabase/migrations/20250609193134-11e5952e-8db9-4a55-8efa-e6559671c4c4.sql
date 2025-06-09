
-- Add capacity management to business settings
ALTER TABLE public.business_settings 
ADD COLUMN IF NOT EXISTS max_bookings_per_slot INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS booking_slot_duration_minutes INTEGER DEFAULT 30;

-- Create table for blocked time slots
CREATE TABLE IF NOT EXISTS public.blocked_time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    blocked_date DATE NOT NULL,
    blocked_time TIME NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(business_id, blocked_date, blocked_time)
);

-- Enable RLS on blocked_time_slots
ALTER TABLE public.blocked_time_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for blocked_time_slots
CREATE POLICY "Business owners can manage blocked slots" ON public.blocked_time_slots
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can view blocked slots for booking checks" ON public.blocked_time_slots
    FOR SELECT USING (true);

-- Create function to get booking count for specific time slot
CREATE OR REPLACE FUNCTION get_booking_count_for_slot(
    p_business_id UUID,
    p_date DATE,
    p_time TIME
) RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM public.bookings
        WHERE business_id = p_business_id
        AND booking_date = p_date
        AND booking_time = p_time
        AND status NOT IN ('cancelled', 'no_show')
    );
END;
$$ LANGUAGE plpgsql STABLE;

-- Create function to check if time slot is available
CREATE OR REPLACE FUNCTION is_time_slot_available(
    p_business_id UUID,
    p_date DATE,
    p_time TIME
) RETURNS BOOLEAN AS $$
DECLARE
    current_bookings INTEGER;
    max_capacity INTEGER;
    is_blocked BOOLEAN;
BEGIN
    -- Check if slot is blocked
    SELECT EXISTS(
        SELECT 1 FROM public.blocked_time_slots
        WHERE business_id = p_business_id
        AND blocked_date = p_date
        AND blocked_time = p_time
    ) INTO is_blocked;
    
    IF is_blocked THEN
        RETURN FALSE;
    END IF;
    
    -- Get current booking count
    SELECT get_booking_count_for_slot(p_business_id, p_date, p_time) INTO current_bookings;
    
    -- Get max capacity from business settings
    SELECT COALESCE(max_bookings_per_slot, 5) INTO max_capacity
    FROM public.business_settings
    WHERE business_id = p_business_id;
    
    RETURN current_bookings < max_capacity;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create trigger to automatically generate invoices after booking creation
CREATE OR REPLACE FUNCTION auto_generate_invoice_after_booking()
RETURNS TRIGGER AS $$
DECLARE
    invoice_num TEXT;
    new_invoice_id UUID;
BEGIN
    -- Generate invoice only for confirmed or completed bookings
    IF NEW.status IN ('confirmed', 'completed') THEN
        -- Generate invoice number
        invoice_num := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        
        -- Create invoice
        INSERT INTO public.invoices (
            business_id,
            client_id,
            booking_id,
            invoice_number,
            subtotal,
            total_amount,
            status,
            due_date
        ) VALUES (
            NEW.business_id,
            NEW.client_id,
            NEW.id,
            invoice_num,
            NEW.total_amount,
            NEW.total_amount,
            'sent',
            CURRENT_DATE + INTERVAL '30 days'
        ) RETURNING id INTO new_invoice_id;
        
        -- Create invoice item from the booking service
        INSERT INTO public.invoice_items (
            invoice_id,
            service_id,
            description,
            quantity,
            unit_price,
            total_price
        )
        SELECT 
            new_invoice_id,
            s.id,
            s.name,
            1,
            s.price,
            s.price
        FROM public.services s
        WHERE s.id = NEW.service_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS auto_invoice_trigger ON public.bookings;
CREATE TRIGGER auto_invoice_trigger
    AFTER INSERT OR UPDATE OF status ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION auto_generate_invoice_after_booking();

-- Add updated_at trigger to blocked_time_slots
CREATE TRIGGER update_blocked_time_slots_updated_at
    BEFORE UPDATE ON public.blocked_time_slots
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();
