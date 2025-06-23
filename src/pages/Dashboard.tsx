
import React from "react";
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardKPISection } from '@/components/dashboard/DashboardKPISection';
import { DashboardQuickActions } from '@/components/dashboard/DashboardQuickActions';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardHandlers } from '@/hooks/useDashboardHandlers';
import { useTheme } from "@/lib/ThemeProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";

const DashboardContent = () => {
  const { business, stats, currency, formatPrice, handleKpiRefresh } = useDashboardData();
  const { 
    handleNewBooking, 
    handleCreateInvoice, 
    handleViewClients, 
    handleManageServices, 
    handleUpdateSettings, 
    handleSubscription,
    navigate 
  } = useDashboardHandlers();
  
  const { theme, setTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader
          business={business}
          theme={theme}
          setTheme={setTheme}
          onNewBooking={handleNewBooking}
        />

        <DashboardKPISection
          business={business}
          stats={stats}
          currency={currency}
          formatPrice={formatPrice}
          onRefresh={handleKpiRefresh}
          onEditBusiness={handleUpdateSettings}
        />

        <DashboardQuickActions
          onNewBooking={handleNewBooking}
          onCreateInvoice={handleCreateInvoice}
          onViewClients={handleViewClients}
          onManageServices={handleManageServices}
          onSubscription={handleSubscription}
          onUpdateSettings={handleUpdateSettings}
        />

        <DashboardTabs
          handleCreateInvoice={handleCreateInvoice}
          handleViewClients={handleViewClients}
          handleUpdateSettings={handleUpdateSettings}
          handleManageServices={handleManageServices}
          handleSubscription={handleSubscription}
          currency={currency}
          navigate={navigate}
          showEditBusiness={false}
          setShowEditBusiness={() => {}}
        />
      </div>
    </DashboardLayout>
  );
};

const Dashboard = () => {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
};

export default Dashboard;
