
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const LocationWarning: React.FC = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800">Location Not Set</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Your business won't appear on the public map until you add location coordinates below.
          </p>
        </div>
      </div>
    </div>
  );
};
