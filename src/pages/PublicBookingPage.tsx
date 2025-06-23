
<<<<<<< HEAD
import React from 'react';
import { useParams } from 'react-router-dom';
import { BookingPageError } from '@/components/booking/BookingPageError';
import { BookingPageLoading } from '@/components/booking/BookingPageLoading';
import { EnhancedPublicBookingContent } from '@/components/booking/EnhancedPublicBookingContent';
import { usePublicBookingData } from '@/hooks/usePublicBookingData';
import { isValidUUID, logQRCodeDebugInfo } from '@/utils/uuidValidation';

const PublicBookingPage = () => {
  const { businessId } = useParams<{ businessId: string }>();

  // Enhanced validation and error handling
  React.useEffect(() => {
    if (businessId) {
      logQRCodeDebugInfo(businessId);
    }
  }, [businessId]);

  // Validate UUID format before making database calls
  if (businessId && !isValidUUID(businessId)) {
    return (
      <BookingPageError 
        type="invalid-format" 
        businessId={businessId} 
      />
    );
  }

  const { 
    business, 
    businessLoading, 
    businessError, 
    services, 
    servicesLoading 
  } = usePublicBookingData(businessId);

  if (!businessId) {
    return <BookingPageError type="no-business-id" />;
  }

  if (businessLoading || servicesLoading) {
    return <BookingPageLoading businessId={businessId} />;
  }

  if (businessError || !business) {
    return (
      <BookingPageError 
        type="not-found" 
        businessId={businessId}
        errorMessage={businessError?.message}
      />
    );
  }

  return (
    <EnhancedPublicBookingContent 
      business={business}
      services={services || []}
      businessId={businessId}
    />
=======
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PublicBookingCalendar } from '@/components/booking/PublicBookingCalendar';
import { ReviewDisplay } from '@/components/reviews/ReviewDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket, MapPin, Phone, Mail, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';

const PublicBookingPage = () => {
  const { subdomain } = useParams();
  const [selectedService, setSelectedService] = useState(null);

  // Fetch business by subdomain
  const { data: business, isLoading: businessLoading } = useQuery({
    queryKey: ['public-business', subdomain],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('subdomain', subdomain)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!subdomain,
  });

  // Fetch business services
  const { data: services } = useQuery({
    queryKey: ['public-services', business?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', business.id)
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: !!business?.id,
  });

  // Fetch business reviews with client names
  const { data: reviews } = useQuery({
    queryKey: ['public-reviews', business?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_reviews')
        .select(`
          *,
          bookings (
            clients (
              name
            )
          )
        `)
        .eq('business_id', business.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
    enabled: !!business?.id,
  });

  if (businessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading business information...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Not Found</h1>
          <p className="text-gray-600">The business you're looking for doesn't exist or is no longer available.</p>
        </div>
      </div>
    );
  }

  const handleBookingComplete = () => {
    toast.success('Booking created successfully! You will receive a confirmation shortly.');
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Business Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              {business.logo_url ? (
                <img src={business.logo_url} alt={business.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <Ticket className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
              {business.description && (
                <p className="text-gray-600 mt-1">{business.description}</p>
              )}
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {business.status === 'active' ? 'Open' : 'Closed'}
                </Badge>
                {business.average_rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{business.average_rating}</span>
                    <span className="text-sm text-gray-500">({business.total_reviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            {business.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {business.address}, {business.city}, {business.country}
              </div>
            )}
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {business.phone}
              </div>
            )}
            {business.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {business.email}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Services List */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {services?.map((service) => (
                  <div
                    key={service.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                      selectedService?.id === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{service.name}</h3>
                      <Badge variant="outline">${service.price}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      {service.duration_minutes} min
                    </div>
                    {service.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{service.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewDisplay 
                  reviews={reviews || []} 
                  averageRating={business.average_rating}
                  totalReviews={business.total_reviews}
                />
              </CardContent>
            </Card>
          </div>

          {/* Booking Calendar */}
          <div className="lg:col-span-3">
            {selectedService ? (
              <PublicBookingCalendar 
                businessId={business.id} 
                selectedService={selectedService}
                onBookingComplete={handleBookingComplete}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Ticket className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Service</h3>
                  <p className="text-gray-600">
                    Choose a service from the list to start booking your appointment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
  );
};

export default PublicBookingPage;
