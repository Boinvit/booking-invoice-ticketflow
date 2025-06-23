
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ClientInformationCardProps {
  clientName: string;
  clientEmail: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  isValid: boolean;
}

export const ClientInformationCard: React.FC<ClientInformationCardProps> = ({
  clientName,
  clientEmail,
  onNameChange,
  onEmailChange,
  onSubmit,
  isValid
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="Enter your full name"
            value={clientName}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="(555) 123-4567" />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your@email.com"
            value={clientEmail}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="notes">Special Requests</Label>
          <Textarea 
            id="notes" 
            placeholder="Any special requests or notes..."
            className="resize-none"
            rows={3}
          />
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!isValid}
          onClick={onSubmit}
        >
          View Payment Instructions
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Payment instructions will be provided after booking confirmation
        </p>
      </CardContent>
    </Card>
  );
};
