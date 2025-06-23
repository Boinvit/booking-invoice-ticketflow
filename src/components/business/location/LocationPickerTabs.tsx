
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationPickerMap } from '../LocationPickerMap';

interface LocationData {
  latitude: string;
  longitude: string;
  service_radius_km: string;
  show_on_map: boolean;
  map_description: string;
}

interface LocationPickerTabsProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialMapLocation: { lat: number; lng: number } | null;
}

export const LocationPickerTabs: React.FC<LocationPickerTabsProps> = ({
  locationData,
  setLocationData,
  onLocationSelect,
  initialMapLocation
}) => {
  return (
    <Tabs defaultValue="map" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="map">Select on Map</TabsTrigger>
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
      </TabsList>
      
      <TabsContent value="map" className="space-y-4">
        <LocationPickerMap
          initialLocation={initialMapLocation}
          onLocationSelect={onLocationSelect}
        />
      </TabsContent>
      
      <TabsContent value="manual" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude">Latitude *</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              value={locationData.latitude}
              onChange={(e) => setLocationData(prev => ({ ...prev, latitude: e.target.value }))}
              placeholder="e.g., -1.2921"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Required to show on map</p>
          </div>
          
          <div>
            <Label htmlFor="longitude">Longitude *</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              value={locationData.longitude}
              onChange={(e) => setLocationData(prev => ({ ...prev, longitude: e.target.value }))}
              placeholder="e.g., 36.8219"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Required to show on map</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
