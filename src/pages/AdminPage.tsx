
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AdminPanel } from '@/components/admin/AdminPanel';

const AdminPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600">Manage user roles and administrative functions</p>
        </div>
        
        <AdminPanel />
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
