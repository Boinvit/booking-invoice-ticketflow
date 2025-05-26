
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ServicesList } from '@/components/services/ServicesList';
import { ServiceForm } from '@/components/services/ServiceForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ServicesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-600">Manage your business services and pricing</p>
          </div>
          <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
            <SheetTrigger asChild>
              <Button onClick={handleCreateService} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{editingService ? 'Edit Service' : 'Create New Service'}</SheetTitle>
                <SheetDescription>
                  {editingService ? 'Update your service details' : 'Add a new service to your business'}
                </SheetDescription>
              </SheetHeader>
              <ServiceForm 
                service={editingService} 
                onSuccess={handleFormClose}
                onCancel={handleFormClose}
              />
            </SheetContent>
          </Sheet>
        </div>

        <ServicesList onEditService={handleEditService} />
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
