
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Business {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  rating?: number;
}

interface GoogleMapsIntegrationProps {
  businesses: Business[];
  onBusinessSelect?: (business: Business) => void;
}

export const GoogleMapsIntegration = ({ businesses, onBusinessSelect }: GoogleMapsIntegrationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Check if Google Maps script is loaded
    if (typeof google === 'undefined') {
      toast.error('Google Maps is not available. Please configure your API key.');
      return;
    }

    if (!mapRef.current) return;

    // Initialize map
    const mapInstance = new google.maps.Map(mapRef.current, {
      zoom: 10,
      center: { lat: 0, lng: 0 }, // Will be updated with user location
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          mapInstance.setCenter(location);
          
          // Add user location marker
          new google.maps.Marker({
            position: location,
            map: mapInstance,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24)
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to New York if location access is denied
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          setUserLocation(defaultLocation);
          mapInstance.setCenter(defaultLocation);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!map || !businesses.length) return;

    // Clear existing markers
    // Note: In a real implementation, you'd track markers to clear them

    // Add business markers
    businesses.forEach((business) => {
      const marker = new google.maps.Marker({
        position: { lat: business.latitude, lng: business.longitude },
        map: map,
        title: business.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C11.582 2 8 5.582 8 10c0 7 8 18 8 18s8-11 8-18c0-4.418-3.582-8-8-8z" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
              <circle cx="16" cy="10" r="3" fill="#FFFFFF"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      // Add click listener
      marker.addListener('click', () => {
        if (onBusinessSelect) {
          onBusinessSelect(business);
        }
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-weight: bold;">${business.name}</h3>
              <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">${business.category}</p>
              <p style="margin: 0; color: #666; font-size: 12px;">${business.address}</p>
              ${business.rating ? `<p style="margin: 4px 0 0 0; color: #f59e0b;">★ ${business.rating}</p>` : ''}
            </div>
          `
        });
        
        infoWindow.open(map, marker);
      });
    });
  }, [map, businesses, onBusinessSelect]);

  const handleSearch = () => {
    if (!map || !searchQuery.trim()) return;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      query: searchQuery,
      location: userLocation || { lat: 40.7128, lng: -74.0060 },
      radius: 5000
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        // Focus on first result
        if (results[0] && results[0].geometry?.location) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Business Map
        </CardTitle>
        <div className="flex gap-2">
          <Input
            placeholder="Search for businesses or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg"
          style={{ minHeight: '400px' }}
        />
        <p className="text-sm text-gray-500 mt-2">
          Click on markers to view business details
        </p>
      </CardContent>
    </Card>
  );
};
