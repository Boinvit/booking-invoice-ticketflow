
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClientsList } from '@/components/clients/ClientsList';
import { ClientForm } from '@/components/clients/ClientForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ClientsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const handleCreateClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600">Manage your client information and history</p>
          </div>
          <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
            <SheetTrigger asChild>
              <Button onClick={handleCreateClient} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Client
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</SheetTitle>
                <SheetDescription>
                  {editingClient ? 'Update client information' : 'Add a new client to your database'}
                </SheetDescription>
              </SheetHeader>
              <ClientForm 
                client={editingClient} 
                onSuccess={handleFormClose}
                onCancel={handleFormClose}
              />
            </SheetContent>
          </Sheet>
        </div>

        <ClientsList onEditClient={handleEditClient} />
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
