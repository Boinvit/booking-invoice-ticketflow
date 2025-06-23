
import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Business {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  average_rating?: number;
  total_reviews?: number;
  logo_url?: string;
  description?: string;
  service_categories?: string[];
}

interface GoogleMapProps {
  businesses: Business[];
  userLocation: { lat: number; lng: number } | null;
  onBusinessSelect: (business: Business | null) => void;
  selectedBusiness: Business | null;
  onMapSettingsClick?: () => void;
}

const DEFAULT_CENTER = { lat: -1.2921, lng: 36.8219 };

export const BusinessDiscoveryGoogleMap: React.FC<GoogleMapProps> = ({
  businesses,
  userLocation,
  onBusinessSelect,
  selectedBusiness,
  onMapSettingsClick,
}) => {
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const center = userLocation || DEFAULT_CENTER;
  const GOOGLE_MAPS_API_KEY = "AIzaSyA4F9QAPbmF2NfMAh82RqPDtrrMceit1Oc";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const getSymbolPath = () => {
    return window.google?.maps?.SymbolPath?.CIRCLE || 0;
  };
  
  const getBackwardArrow = () => {
    return window.google?.maps?.SymbolPath?.BACKWARD_CLOSED_ARROW || 0;
  };

  const getSize = () => {
    return window.google?.maps && window.google.maps.Size
      ? new window.google.maps.Size(32, 32)
      : undefined;
  };

  const handleOnLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (userLocation) {
      map.panTo(userLocation);
    }
  }, [userLocation]);

  React.useEffect(() => {
    if (selectedBusiness && mapRef.current) {
      mapRef.current.panTo({
        lat: selectedBusiness.latitude,
        lng: selectedBusiness.longitude,
      });
      mapRef.current.setZoom(15);
    }
  }, [selectedBusiness]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-50">
        <span className="text-gray-500">Loading map...</span>
      </div>
    );
  }

  const isDark = document.documentElement.classList.contains("dark");
  const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#383838" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#232f3e" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  ];

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleOnLoad}
        options={{
          clickableIcons: false,
          disableDefaultUI: false,
          scrollwheel: true,
          gestureHandling: 'greedy',
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          styles: isDark ? darkMapStyle : undefined,
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: getSymbolPath(),
              fillColor: "#3B82F6",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 2,
              scale: 9,
            } as google.maps.Symbol}
            title="Your Location"
          />
        )}

        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={{ lat: business.latitude, lng: business.longitude }}
            onClick={() => onBusinessSelect(business)}
            icon={
              business.logo_url
                ? {
                    url: business.logo_url,
                    scaledSize: getSize(),
                  }
                : {
                    path: getBackwardArrow(),
                    fillColor: selectedBusiness?.id === business.id ? "#10B981" : "#EF4444",
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
                    scale: selectedBusiness?.id === business.id ? 6 : 5,
                  }
            }
          />
        ))}

        {selectedBusiness && (
          <InfoWindow
            position={{ lat: selectedBusiness.latitude, lng: selectedBusiness.longitude }}
            onCloseClick={() => onBusinessSelect(null)}
          >
            <div className="max-w-xs p-2">
              <h3 className="font-semibold text-base mb-1">{selectedBusiness.name}</h3>
              {selectedBusiness.average_rating !== undefined && (
                <div className="flex items-center gap-1 mb-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  {selectedBusiness.average_rating.toFixed(1)}
                  {selectedBusiness.total_reviews !== undefined && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({selectedBusiness.total_reviews} reviews)
                    </span>
                  )}
                </div>
              )}
              {selectedBusiness.description && (
                <div className="text-xs text-gray-600 line-clamp-3 mb-1">
                  {selectedBusiness.description.substring(0, 120)}
                </div>
              )}
              {selectedBusiness.service_categories && (
                <div className="flex flex-wrap gap-1">
                  {selectedBusiness.service_categories.slice(0, 2).map((cat, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={onMapSettingsClick}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Settings className="h-4 w-4 mr-2" />
          Map Settings
        </Button>
      </div>
    </div>
  );
};
