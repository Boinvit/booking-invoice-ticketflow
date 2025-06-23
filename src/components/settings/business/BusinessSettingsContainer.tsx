
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface BusinessSettingsContainerProps {
  isLoading: boolean;
  business: any;
  children: React.ReactNode;
}

export const BusinessSettingsContainer: React.FC<BusinessSettingsContainerProps> = ({
  isLoading,
  business,
  children
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton lines={6} />
        </CardContent>
      </Card>
    );
  }

  if (!business) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-600">No business found. Please set up your business first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
