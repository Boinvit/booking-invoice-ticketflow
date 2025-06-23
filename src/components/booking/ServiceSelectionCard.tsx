
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  currency?: string;
}

interface ServiceSelectionCardProps {
  services: Service[];
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
  business?: { currency?: string };
}

export const ServiceSelectionCard: React.FC<ServiceSelectionCardProps> = ({
  services,
  selectedService,
  onServiceSelect,
  business
}) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KES' || currency === 'KSH') {
      return `KSh ${price.toLocaleString()}`;
    }
    return `${currency} ${price.toLocaleString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Service</CardTitle>
        <CardDescription>Choose from our available services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                selectedService === service.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => onServiceSelect(service.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{service.name}</h3>
                <Badge variant="outline">
                  {formatPrice(service.price, service.currency || business?.currency || 'KES')}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
