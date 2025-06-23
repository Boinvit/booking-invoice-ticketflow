
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { InvoicesList } from '@/components/invoices/InvoicesList';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const InvoicesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600">Manage your business invoices and payments</p>
          </div>
          <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
            <SheetTrigger asChild>
              <Button onClick={handleCreateInvoice} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Invoice
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}</SheetTitle>
                <SheetDescription>
                  {editingInvoice ? 'Update your invoice details' : 'Create a new invoice for your client'}
                </SheetDescription>
              </SheetHeader>
              <InvoiceForm 
                invoice={editingInvoice} 
                onSuccess={handleFormClose}
                onCancel={handleFormClose}
              />
            </SheetContent>
          </Sheet>
        </div>

        <InvoicesList onEditInvoice={handleEditInvoice} />
      </div>
    </DashboardLayout>
  );
};

export default InvoicesPage;
