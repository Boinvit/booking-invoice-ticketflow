
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe, Star, Clock, CheckCircle } from 'lucide-react';

interface EnhancedBusinessHeaderProps {
  business: {
    id: string;
    name: string;
    description?: string;
    address?: string;
    city?: string;
    country?: string;
    phone?: string;
    website?: string;
    logo_url?: string;
    featured_image_url?: string;
    average_rating?: number;
    total_reviews?: number;
    is_verified?: boolean;
    business_hours?: any;
  };
}

export const EnhancedBusinessHeader: React.FC<EnhancedBusinessHeaderProps> = ({ business }) => {
  const formatBusinessHours = (hours: any) => {
    if (!hours || typeof hours !== 'object') return 'Hours not specified';
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase(); // Fix: use toLocaleDateString instead of toLocaleLowerCase
    const todayHours = hours[today];
    
    if (todayHours && todayHours.open && todayHours.close) {
      return `Today: ${todayHours.open} - ${todayHours.close}`;
    }
    
    return 'Hours available on request';
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600">
          {business.featured_image_url && (
            <img
              src={business.featured_image_url}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white w-full">
              <div className="flex items-center gap-4 mb-2">
                {business.logo_url && (
                  <img
                    src={business.logo_url}
                    alt={`${business.name} logo`}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                )}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
                    {business.name}
                    {business.is_verified && (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    {business.average_rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {business.average_rating} ({business.total_reviews || 0} reviews)
                        </span>
                      </div>
                    )}
                    {business.is_verified && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Verified Business
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Business Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Location Card */}
        {business.address && (
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-sm text-gray-600">
                    {business.address}
                    {business.city && `, ${business.city}`}
                    {business.country && `, ${business.country}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Card */}
        {business.phone && (
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a 
                    href={`tel:${business.phone}`}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Hours Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                <p className="text-sm text-gray-600">
                  {formatBusinessHours(business.business_hours)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description Card */}
      {business.description && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">About {business.name}</h3>
            <p className="text-gray-700 leading-relaxed">{business.description}</p>
            
            {business.website && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Booking Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 How to Book</h3>
          <div className="space-y-2 text-blue-800">
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Choose your preferred service below
            </p>
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Select date and time that works for you
            </p>
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Complete your booking with payment
            </p>
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Receive confirmation and enjoy your service!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
