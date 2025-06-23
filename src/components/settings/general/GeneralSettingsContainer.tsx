
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface GeneralSettingsContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const GeneralSettingsContainer: React.FC<GeneralSettingsContainerProps> = ({
  isLoading,
  children
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton lines={6} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
