
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DashboardMobileAppSection: React.FC = () => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Download Mobile Apps</CardTitle>
      <CardDescription>
        Manage your business on the go with our mobile applications
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download for iOS
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download for Android
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Native mobile apps coming soon! Get notified when they're available.
      </p>
    </CardContent>
  </Card>
);
