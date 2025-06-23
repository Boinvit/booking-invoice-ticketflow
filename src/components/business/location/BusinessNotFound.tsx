
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export const BusinessNotFound: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Business Profile Not Found</h3>
            <p className="text-gray-600">Please complete your business setup first.</p>
          </div>
          <Button onClick={() => window.location.href = '/app'}>
            Complete Business Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
