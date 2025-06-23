
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from 'lucide-react';

export const EmptyServiceSelection = () => {
  return (
    <Card>
      <CardContent className="text-center py-8 sm:py-12">
        <Ticket className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Service</h3>
        <p className="text-gray-600 text-sm sm:text-base px-4">
          Choose a service from the list to start booking your appointment.
        </p>
      </CardContent>
    </Card>
  );
};
