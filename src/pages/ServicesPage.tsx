
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ServicesList } from '@/components/services/ServicesList';
import { EnhancedServiceForm } from '@/components/services/EnhancedServiceForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';
import { QRCodeTester } from '@/components/qr/QRCodeTester';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const ServicesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const { user } = useAuth();

  const handleCreateService = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  // Fetch the business for the logged-in user
  const { data: business, isLoading: isLoadingBusiness } = useQuery({
    queryKey: ['current-business', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-600">Manage your business services with global currency support</p>
          </div>
          <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
            <SheetTrigger asChild>
              <Button onClick={handleCreateService} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[700px] sm:max-w-[700px] overflow-hidden">
              <SheetHeader>
                <SheetTitle>{editingService ? 'Edit Service' : 'Create New Service'}</SheetTitle>
                <SheetDescription>
                  {editingService ? 'Update your service details' : 'Add a new service with enhanced categories and currency support'}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 h-full">
                <EnhancedServiceForm 
                  service={editingService} 
                  onSuccess={handleFormClose}
                  onCancel={handleFormClose}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <ServicesList onEditService={handleEditService} />

        {/* QR Code generator section for in-shop booking */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Walk-In / Direct Booking QR Code</h2>
          <p className="text-gray-600 mb-4">
            Display this QR code at your shop. When customers scan it, they will be taken to your services booking page for easy reservations.
          </p>
          {!business && isLoadingBusiness ? (
            <div className="text-gray-400">Loading QR code...</div>
          ) : business ? (
            <QRCodeGenerator businessId={business.id} businessName={business.name} />
          ) : (
            <div className="text-red-500">Unable to load business QR code</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
