
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessDiscoveryGoogleMap } from './GoogleMap';
import { BusinessSearchBar } from './BusinessSearchBar';
import { BusinessList } from './BusinessList';
import { useBusinessMapData } from '@/hooks/useBusinessMapData';

interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  featured_image_url: string;
  latitude: number;
  longitude: number;
  average_rating: number;
  total_reviews: number;
  business_hours: any;
  is_verified: boolean;
  service_radius_km: number;
  currency: string;
  show_on_map: boolean;
  map_description: string;
  service_categories: string[];
  service_names: string[];
  total_services: number;
  distance_km?: number;
}

export const BusinessMap = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  
  const { businesses, isLoading, userLocation } = useBusinessMapData(searchQuery);

  const handleBusinessSelect = (business: Business) => setSelectedBusiness(business);

  const handleBookNow = (businessId: string) => {
    navigate(`/booking/${businessId}`);
  };

  return (
    <div className="h-screen flex flex-col">
      <BusinessSearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex bg-gray-100 dark:bg-gray-900">
        <div className="flex-1 relative">
          <BusinessDiscoveryGoogleMap
            businesses={businesses}
            userLocation={userLocation}
            onBusinessSelect={handleBusinessSelect}
            selectedBusiness={selectedBusiness}
            onMapSettingsClick={() => {
              window.alert("Map settings coming soon!");
            }}
          />
        </div>

        <BusinessList
          businesses={businesses}
          isLoading={isLoading}
          searchQuery={searchQuery}
          selectedBusiness={selectedBusiness}
          onBusinessSelect={handleBusinessSelect}
          onBookNow={handleBookNow}
        />
      </div>
    </div>
  );
};
