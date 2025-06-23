
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
}

interface ServicesListProps {
  services: Service[];
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

export const ServicesList = ({ services, selectedService, onServiceSelect }: ServicesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Our Services</CardTitle>
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
            onClick={() => onServiceSelect(service)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-sm break-words flex-1 pr-2">{service.name}</h3>
              <Badge variant="outline" className="flex-shrink-0">${service.price}</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{service.duration_minutes} min</span>
            </div>
            {service.description && (
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 break-words">{service.description}</p>
            )}
          </div>
        ))}
        {(!services || services.length === 0) && (
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm">No services available at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
