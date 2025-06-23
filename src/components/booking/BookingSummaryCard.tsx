
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  currency?: string;
}

interface BookingSummaryCardProps {
  selectedService: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  services: Service[];
  business?: { currency?: string };
}

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  selectedService,
  selectedDate,
  selectedTime,
  services,
  business
}) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KES' || currency === 'KSH') {
      return `KSh ${price.toLocaleString()}`;
    }
    return `${currency} ${price.toLocaleString()}`;
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedServiceData && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{selectedServiceData.name}</span>
              <span className="font-bold">
                {formatPrice(
                  selectedServiceData.price,
                  selectedServiceData.currency || business?.currency || 'KES'
                )}
              </span>
            </div>
            <p className="text-sm text-gray-600">{selectedServiceData.description}</p>
          </div>
        )}

        {selectedDate && (
          <div className="text-sm">
            <span className="font-medium">Date: </span> 
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </div>
        )}

        {selectedTime && (
          <div className="text-sm">
            <span className="font-medium">Time: </span>
            {selectedTime}
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>
              {selectedServiceData ? formatPrice(
                selectedServiceData.price,
                selectedServiceData.currency || business?.currency || 'KES'
              ) : formatPrice(0, 'KES')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
