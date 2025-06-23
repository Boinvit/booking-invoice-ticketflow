
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface LocationData {
  latitude: string;
  longitude: string;
  service_radius_km: string;
  show_on_map: boolean;
  map_description: string;
}

interface LocationFormProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
  onSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
  hasLocation: boolean;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  locationData,
  setLocationData,
  onSubmit,
  isUpdating,
  hasLocation
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="service_radius">Service Radius (km)</Label>
        <Input
          id="service_radius"
          type="number"
          min="1"
          max="100"
          value={locationData.service_radius_km}
          onChange={(e) => setLocationData(prev => ({ ...prev, service_radius_km: e.target.value }))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="show_on_map"
          checked={locationData.show_on_map}
          onCheckedChange={(checked) => setLocationData(prev => ({ ...prev, show_on_map: checked }))}
        />
        <Label htmlFor="show_on_map">Show business on public map</Label>
      </div>

      <div>
        <Label htmlFor="map_description">Map Description</Label>
        <Textarea
          id="map_description"
          value={locationData.map_description}
          onChange={(e) => setLocationData(prev => ({ ...prev, map_description: e.target.value }))}
          placeholder="Brief description for map display..."
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        disabled={isUpdating || !locationData.latitude || !locationData.longitude}
        className="w-full md:w-auto"
      >
        {isUpdating && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {hasLocation ? 'Update Location Settings' : 'Save Location & Enable Map Visibility'}
      </Button>
    </form>
  );
};
