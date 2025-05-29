
import React from 'react';
import { Button } from '@/components/ui/button';

export const ContactSalesSection = () => {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a custom solution?</h2>
      <p className="text-gray-600 mb-6">
        Contact us for enterprise pricing and custom features tailored to your business needs.
      </p>
      <Button size="lg">Contact Sales</Button>
    </div>
  );
};
