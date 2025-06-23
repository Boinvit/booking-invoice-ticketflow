
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MobileBookingHeaderProps {
  business: any;
  children: React.ReactNode;
}

export const MobileBookingHeader: React.FC<MobileBookingHeaderProps> = ({ 
  business, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              {business?.logo_url ? (
                <img 
                  src={business.logo_url} 
                  alt={business?.name} 
                  className="w-10 h-10 rounded-full object-cover" 
                />
              ) : (
                <span className="text-white text-sm font-bold">
                  {business?.name?.charAt(0) || 'B'}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                {business?.name || 'Business Services'}
              </h1>
              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                Available for Booking
              </Badge>
            </div>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Business Info</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Business Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      {business?.logo_url ? (
                        <img 
                          src={business.logo_url} 
                          alt={business?.name} 
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                      ) : (
                        <span className="text-white font-bold">
                          {business?.name?.charAt(0) || 'B'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{business?.name}</h3>
                      {business?.description && (
                        <p className="text-sm text-gray-600">{business.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    {business?.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a 
                          href={`tel:${business.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {business.phone}
                        </a>
                      </div>
                    )}
                    
                    {business?.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a 
                          href={`mailto:${business.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {business.email}
                        </a>
                      </div>
                    )}
                    
                    {business?.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">
                          {business.address}
                          {business.city && `, ${business.city}`}
                          {business.country && `, ${business.country}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t space-y-2">
                  {business?.phone && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open(`tel:${business.phone}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  )}
                  
                  {business?.whatsapp && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-green-600 border-green-300"
                      onClick={() => window.open(`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`, '_blank')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="max-h-96 overflow-y-auto">
                  {children}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};
