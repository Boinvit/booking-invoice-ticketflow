
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onNewBooking: () => void;
  onCreateInvoice: () => void;
  onViewClients: () => void;
  onManageServices: () => void;
  onSubscription: () => void;
  onUpdateSettings: () => void;
};

export const DashboardQuickActions: React.FC<Props> = ({
  onNewBooking, onCreateInvoice, onViewClients, onManageServices, onSubscription, onUpdateSettings
}) => (
  <div className="flex flex-wrap gap-4 mb-8">
    <Button variant="outline" onClick={onNewBooking}>+ New Booking</Button>
    <Button variant="outline" onClick={onCreateInvoice}>Create Invoice</Button>
    <Button variant="outline" onClick={onViewClients}>View Clients</Button>
    <Button variant="outline" onClick={onManageServices}>Manage Services</Button>
    <Button variant="outline" onClick={onSubscription}>Subscription</Button>
    <Button variant="outline" onClick={onUpdateSettings}>Settings</Button>
  </div>
);
