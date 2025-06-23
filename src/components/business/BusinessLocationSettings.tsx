
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin } from 'lucide-react';
import { useBusinessLocationSettings } from '@/hooks/useBusinessLocationSettings';
import { LocationPickerTabs } from './location/LocationPickerTabs';
import { LocationForm } from './location/LocationForm';
import { LocationWarning } from './location/LocationWarning';
import { BusinessNotFound } from './location/BusinessNotFound';

export const BusinessLocationSettings = () => {
  const {
    business,
    isLoading,
    locationData,
    setLocationData,
    handleLocationSelect,
    handleSubmit,
    updateLocationMutation
  } = useBusinessLocationSettings();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!business) {
    return <BusinessNotFound />;
  }

  const hasLocation = Boolean(business.latitude && business.longitude);
  const initialMapLocation = hasLocation ? { lat: business.latitude, lng: business.longitude } : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location & Map Settings
        </CardTitle>
        {!hasLocation && <LocationWarning />}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <LocationPickerTabs
            locationData={locationData}
            setLocationData={setLocationData}
            onLocationSelect={handleLocationSelect}
            initialMapLocation={initialMapLocation}
          />

          <LocationForm
            locationData={locationData}
            setLocationData={setLocationData}
            onSubmit={handleSubmit}
            isUpdating={updateLocationMutation.isPending}
            hasLocation={hasLocation}
          />
        </div>
      </CardContent>
    </Card>
  );
};
