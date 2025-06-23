
-- Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    subdomain TEXT UNIQUE,
    logo_url TEXT,
    average_rating NUMERIC(3,2),
    total_reviews INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create business_settings table
CREATE TABLE IF NOT EXISTS public.business_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    max_bookings_per_slot INTEGER DEFAULT 5,
    booking_slot_duration_minutes INTEGER DEFAULT 30,
    timezone TEXT DEFAULT 'UTC',
    currency TEXT DEFAULT 'USD',
    auto_confirm_bookings BOOLEAN DEFAULT true,
    require_payment BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(business_id)
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    specialties TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(business_id, email)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    ticket_number TEXT UNIQUE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blocked_time_slots table
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

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    invoice_number TEXT NOT NULL UNIQUE,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create invoice_items table
CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for businesses
CREATE POLICY "Users can view their own business" ON public.businesses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own business" ON public.businesses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business" ON public.businesses
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for business_settings
CREATE POLICY "Business owners can manage settings" ON public.business_settings
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

-- Create RLS policies for services
CREATE POLICY "Business owners can manage services" ON public.services
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view active services" ON public.services
    FOR SELECT USING (is_active = true);

-- Create RLS policies for staff
CREATE POLICY "Business owners can manage staff" ON public.staff
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view active staff" ON public.staff
    FOR SELECT USING (is_active = true);

-- Create RLS policies for clients
CREATE POLICY "Business owners can manage clients" ON public.clients
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

-- Create RLS policies for bookings
CREATE POLICY "Business owners can manage bookings" ON public.bookings
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can view their own bookings" ON public.bookings
    FOR SELECT USING (
        client_id IN (
            SELECT id FROM public.clients WHERE email = auth.email()
        )
    );

-- Create RLS policies for blocked_time_slots
CREATE POLICY "Business owners can manage blocked slots" ON public.blocked_time_slots
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can view blocked slots for booking checks" ON public.blocked_time_slots
    FOR SELECT USING (true);

-- Create RLS policies for invoices
CREATE POLICY "Business owners can manage invoices" ON public.invoices
    FOR ALL USING (
        business_id IN (
            SELECT id FROM public.businesses WHERE user_id = auth.uid()
        )
    );

-- Create RLS policies for invoice_items
CREATE POLICY "Business owners can manage invoice items" ON public.invoice_items
    FOR ALL USING (
        invoice_id IN (
            SELECT id FROM public.invoices 
            WHERE business_id IN (
                SELECT id FROM public.businesses WHERE user_id = auth.uid()
            )
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_business_settings_updated_at
    BEFORE UPDATE ON public.business_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_staff_updated_at
    BEFORE UPDATE ON public.staff
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_blocked_time_slots_updated_at
    BEFORE UPDATE ON public.blocked_time_slots
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
