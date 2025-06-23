
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BusinessSettings } from '@/components/settings/BusinessSettings';
import { BusinessLocationSettings } from '@/components/business/BusinessLocationSettings';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your business settings and preferences</p>
        </div>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <BusinessSettings />
          </TabsContent>

          <TabsContent value="location">
            <BusinessLocationSettings />
          </TabsContent>

          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
