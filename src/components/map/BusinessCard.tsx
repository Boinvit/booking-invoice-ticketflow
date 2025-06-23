
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone } from 'lucide-react';

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

interface BusinessCardProps {
  business: Business;
  isSelected: boolean;
  onClick: () => void;
  onBookNow: (businessId: string) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  isSelected,
  onClick,
  onBookNow
}) => {
  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {business.logo_url ? (
            <img
              src={business.logo_url}
              alt={business.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-gray-400" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm truncate">{business.name}</h3>
              {business.is_verified && (
                <Badge variant="secondary" className="text-xs">Verified</Badge>
              )}
            </div>

            {business.average_rating && (
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">
                  {business.average_rating.toFixed(1)} ({business.total_reviews} reviews)
                </span>
              </div>
            )}

            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {business.map_description || business.description}
            </p>

            {business.service_categories && business.service_categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {business.service_categories.slice(0, 2).map((category, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {business.service_categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{business.service_categories.length - 2} more
                  </Badge>
                )}
              </div>
            )}

            {business.distance_km !== undefined && (
              <p className="text-xs text-gray-500 mb-2">
                {business.distance_km.toFixed(1)} km away
              </p>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookNow(business.id);
                }}
              >
                Book Now
              </Button>
              {business.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`tel:${business.phone}`);
                  }}
                >
                  <Phone className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
