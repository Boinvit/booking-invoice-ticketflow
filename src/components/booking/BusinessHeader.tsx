
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Ticket, MapPin, Phone, Mail, Star } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  average_rating?: number;
  total_reviews?: number;
}

interface BusinessHeaderProps {
  business: Business;
}

export const BusinessHeader = ({ business }: BusinessHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            {business.logo_url ? (
              <img src={business.logo_url} alt={business.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover" />
            ) : (
              <Ticket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{business.name}</h1>
            {business.description && (
              <p className="text-gray-600 mt-1 text-sm sm:text-base">{business.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {business.is_active ? 'Open' : 'Closed'}
              </Badge>
              {business.average_rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{business.average_rating}</span>
                  <span className="text-sm text-gray-500">({business.total_reviews} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-600">
          {business.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="break-words">{business.address}, {business.city}, {business.country}</span>
            </div>
          )}
          {business.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
          {business.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="break-all">{business.email}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
