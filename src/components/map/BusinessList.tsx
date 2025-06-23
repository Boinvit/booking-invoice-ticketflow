
import React from 'react';
import { MapPin } from 'lucide-react';
import { BusinessCard } from './BusinessCard';

interface Business {
  id: string;
  name: string;
  description: string;
  phone: string;
  logo_url: string;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
  map_description: string;
  service_categories: string[];
  distance_km?: number;
}

interface BusinessListProps {
  businesses: Business[];
  isLoading: boolean;
  searchQuery: string;
  selectedBusiness: Business | null;
  onBusinessSelect: (business: Business) => void;
  onBookNow: (businessId: string) => void;
}

export const BusinessList: React.FC<BusinessListProps> = ({
  businesses,
  isLoading,
  searchQuery,
  selectedBusiness,
  onBusinessSelect,
  onBookNow
}) => {
  return (
    <div className="w-96 bg-white border-l overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          {searchQuery ? `Results for "${searchQuery}"` : 'Nearby Businesses'}
          {!isLoading && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({businesses.length} found)
            </span>
          )}
        </h2>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-24 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                isSelected={selectedBusiness?.id === business.id}
                onClick={() => onBusinessSelect(business)}
                onBookNow={onBookNow}
              />
            ))}

            {businesses.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? `No businesses match "${searchQuery}" in your area.`
                    : 'No businesses available in your area yet.'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
