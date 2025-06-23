
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ClientPaymentSection } from "@/components/payment/ClientPaymentSection";
import { PaymentReceipt } from "@/components/payment/PaymentReceipt";
import { useClientPayments } from "@/hooks/useClientPayments";
import { BusinessPaymentInstructions } from "@/components/business/BusinessPaymentInstructions";
import { MobileBookingHeader } from "@/components/booking/MobileBookingHeader";
import { EnhancedBusinessHeader } from "@/components/booking/EnhancedBusinessHeader";
import { ServiceSelectionCard } from "@/components/booking/ServiceSelectionCard";
import { DateTimeSelectionCard } from "@/components/booking/DateTimeSelectionCard";
import { BookingSummaryCard } from "@/components/booking/BookingSummaryCard";
import { ClientInformationCard } from "@/components/booking/ClientInformationCard";

const BookingPage = () => {
  const { businessId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const { services, business, servicesLoading } = useClientPayments(businessId || '');

  const handleBookingSubmit = () => {
    if (!selectedService || !selectedDate || !selectedTime || !clientEmail || !clientName) {
      return;
    }
    setShowPayment(true);
  };

  const handleReceiptClose = () => {
    setPaymentCompleted(false);
    setShowPayment(false);
    // Reset form
    setSelectedDate(undefined);
    setSelectedService("");
    setSelectedTime("");
    setClientEmail("");
    setClientName("");
    setBookingDetails(null);
  };

  const isFormValid = selectedService && selectedDate && selectedTime && clientEmail && clientName;

  if (servicesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show payment receipt after successful payment
  if (paymentCompleted && bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <PaymentReceipt 
          booking={bookingDetails} 
          onClose={handleReceiptClose}
        />
      </div>
    );
  }

  const BookingContent = () => (
    <>
      {/* Enhanced Business Header */}
      {business && (
        <div className="mb-6">
          <EnhancedBusinessHeader business={business} />
        </div>
      )}

      {/* Payment Instructions Section - Always visible */}
      {business && !showPayment && (
        <div className="mb-6">
          <BusinessPaymentInstructions business={business} />
        </div>
      )}

      {showPayment && clientEmail ? (
        <ClientPaymentSection
          services={services.filter(s => s.id === selectedService)}
          clientEmail={clientEmail}
          businessName={business?.name || 'Business'}
          businessCurrency={business?.currency}
          paymentInstructions={business?.payment_instructions}
          business={business}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Selection */}
          <div className="lg:col-span-2 space-y-6">
            <ServiceSelectionCard
              services={services}
              selectedService={selectedService}
              onServiceSelect={setSelectedService}
              business={business}
            />

            <DateTimeSelectionCard
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
            />
          </div>

          {/* Booking Summary & Contact Info */}
          <div className="space-y-6">
            <BookingSummaryCard
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              services={services}
              business={business}
            />

            <ClientInformationCard
              clientName={clientName}
              clientEmail={clientEmail}
              onNameChange={setClientName}
              onEmailChange={setClientEmail}
              onSubmit={handleBookingSubmit}
              isValid={!!isFormValid}
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Menu */}
      <MobileBookingHeader business={business}>
        <BookingContent />
      </MobileBookingHeader>

      {/* Desktop Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 hidden lg:block">
        <BookingContent />
      </div>
    </div>
  );
};

export default BookingPage;
