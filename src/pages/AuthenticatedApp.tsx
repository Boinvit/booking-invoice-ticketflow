
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import ServicesPage from '@/pages/ServicesPage';
import BookingManagementPage from '@/pages/BookingManagementPage';
import ClientsPage from '@/pages/ClientsPage';
import StaffPage from '@/pages/StaffPage';
import InvoicesPage from '@/pages/InvoicesPage';
import SettingsPage from '@/pages/SettingsPage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import StaffDashboardPage from '@/pages/StaffDashboardPage';
import StaffAttendancePage from '@/pages/StaffAttendancePage';
import BusinessDiscoveryPage from '@/pages/BusinessDiscoveryPage';
import NotFound from '@/pages/NotFound';

const AuthenticatedApp = () => {
  return (
    <Routes>
      {/* Default route - redirect to dashboard */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      
      {/* Main app routes */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="bookings" element={<BookingManagementPage />} />
      <Route path="clients" element={<ClientsPage />} />
      <Route path="staff" element={<StaffPage />} />
      <Route path="invoices" element={<InvoicesPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="subscription" element={<SubscriptionPage />} />
      <Route path="staff-dashboard" element={<StaffDashboardPage />} />
      <Route path="staff-attendance" element={<StaffAttendancePage />} />
      <Route path="discover" element={<BusinessDiscoveryPage />} />
      
      {/* Catch all for unmatched routes within /app */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthenticatedApp;
