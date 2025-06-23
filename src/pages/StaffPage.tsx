
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EnhancedStaffList } from '@/components/staff/EnhancedStaffList';
import { EnhancedStaffForm } from '@/components/staff/EnhancedStaffForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const StaffPage = () => {
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  const handleEditStaff = (staff: any) => {
    setEditingStaff(staff);
  };

  const handleFormSuccess = () => {
    setIsAddingStaff(false);
    setEditingStaff(null);
  };

  const handleFormCancel = () => {
    setIsAddingStaff(false);
    setEditingStaff(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600">Manage your team members with gender preferences for client selection</p>
          </div>
          <Button onClick={() => setIsAddingStaff(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        <EnhancedStaffList onEditStaff={handleEditStaff} />

        <Dialog open={isAddingStaff || !!editingStaff} onOpenChange={() => handleFormCancel()}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
              </DialogTitle>
            </DialogHeader>
            <EnhancedStaffForm 
              staff={editingStaff}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default StaffPage;
