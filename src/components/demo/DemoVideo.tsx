
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

const DemoVideo = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg mb-4">
          <div className="text-center space-y-4">
            <Play className="h-16 w-16 text-blue-500 mx-auto" />
            <p className="text-gray-600">Demo Video Coming Soon</p>
            <p className="text-sm text-gray-500">
              Watch how Boinvit revolutionizes booking management
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Platform Overview</h3>
          <p className="text-sm text-gray-600">
            See how our comprehensive booking system helps businesses compete globally with advanced features and local market expertise.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoVideo;
