
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
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
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {business?.name?.charAt(0) || 'B'}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
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
          <SheetContent side="right" className="w-full max-w-sm">
            <div className="py-4">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};
