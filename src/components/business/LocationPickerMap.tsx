
import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface LocationPickerMapProps {
  initialLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  initialLocation,
  onLocationSelect,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation
  );
  const GOOGLE_MAPS_API_KEY = "AIzaSyA4F9QAPbmF2NfMAh82RqPDtrrMceit1Oc";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newLocation = { lat, lng };
      setSelectedLocation(newLocation);
      onLocationSelect(newLocation);
    }
  }, [onLocationSelect]);

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(newLocation);
          onLocationSelect(newLocation);
          if (mapRef.current) {
            mapRef.current.panTo(newLocation);
            mapRef.current.setZoom(15);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-50 rounded-lg">
        <span className="text-gray-500">Loading map...</span>
      </div>
    );
  }

  const center = selectedLocation || { lat: -1.2921, lng: 36.8219 }; // Default to Nairobi

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={getCurrentLocation}>
          <MapPin className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
        <p className="text-sm text-gray-600 self-center">
          Click on the map to select your business location
        </p>
      </div>
      
      <div className="rounded-lg overflow-hidden border">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={selectedLocation ? 15 : 12}
          onLoad={handleOnLoad}
          onClick={handleMapClick}
          options={{
            clickableIcons: false,
          }}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#EF4444",
                fillOpacity: 1,
                strokeColor: "#fff",
                strokeWeight: 2,
                scale: 8,
              }}
            />
          )}
        </GoogleMap>
      </div>
      
      {selectedLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            Selected location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};
