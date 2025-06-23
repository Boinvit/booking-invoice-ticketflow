
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import { DashboardMobileAppSection } from "./DashboardMobileAppSection";
import { BookingList } from "@/components/booking/BookingList";

type Props = {
  handleCreateInvoice: () => void;
  handleViewClients: () => void;
  handleUpdateSettings: () => void;
  handleManageServices: () => void;
  handleSubscription: () => void;
  currency: string;
  navigate: (p: string) => void;
  showEditBusiness: boolean;
  setShowEditBusiness: (v: boolean) => void;
};

export const DashboardTabs: React.FC<Props> = ({
  handleCreateInvoice, 
  handleViewClients, 
  handleUpdateSettings, 
  handleManageServices, 
  handleSubscription, 
  currency, 
  navigate
}) => (
  <div className="space-y-6">
    <DashboardMobileAppSection />
    
    <Tabs defaultValue="bookings" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="clients">Clients</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="bookings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Manage your upcoming and past appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingList />
            <div className="mt-4">
              <Button onClick={() => navigate('/app/bookings')} className="w-full">
                View All Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="invoices" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
            <CardDescription>Create and track your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <ArrowUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-600 mb-4">Start creating professional invoices for your services</p>
              <Button onClick={handleCreateInvoice}>Create First Invoice</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="clients" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Directory</CardTitle>
            <CardDescription>Manage your customer relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-gray-400">👥</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Building your client base</h3>
              <p className="text-gray-600 mb-4">Clients will appear here as they book through your QR codes</p>
              <Button variant="outline" onClick={handleViewClients}>View All Clients</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Settings</CardTitle>
            <CardDescription>Configure your business profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Business Information</h4>
                <Button variant="outline" onClick={handleUpdateSettings}>Edit Profile</Button>
              </div>
              <div>
                <h4 className="font-medium mb-2">Services & Pricing</h4>
                <Button variant="outline" onClick={handleManageServices}>Manage Services</Button>
              </div>
              <div>
                <h4 className="font-medium mb-2">Currency Settings</h4>
                <p className="text-sm text-gray-600 mb-2">Current: {currency}</p>
                <Button variant="outline" onClick={handleUpdateSettings}>Update Currency</Button>
              </div>
              <div>
                <h4 className="font-medium mb-2">Custom Subdomain</h4>
                <p className="text-sm text-gray-600 mb-2">your-business.bookflow.com</p>
                <Button variant="outline" onClick={handleUpdateSettings}>Update Subdomain</Button>
              </div>
              <div>
                <h4 className="font-medium mb-2">Subscription</h4>
                <Button variant="outline" onClick={handleSubscription}>Manage Subscription</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);
