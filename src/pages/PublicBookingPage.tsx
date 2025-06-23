
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
  );
};

export default PublicBookingPage;
