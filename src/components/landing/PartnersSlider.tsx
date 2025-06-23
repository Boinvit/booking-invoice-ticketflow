
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PARTNER_BUSINESSES = [
  { name: 'Salon Beauty Plus', category: 'Beauty & Spa', logo: '💅', location: 'Nairobi' },
  { name: 'FitLife Gym', category: 'Fitness', logo: '💪', location: 'Mombasa' },
  { name: 'DrCare Clinic', category: 'Healthcare', logo: '🏥', location: 'Kisumu' },
  { name: 'QuickCuts Barber', category: 'Barber Shop', logo: '💈', location: 'Eldoret' },
  { name: 'Luxury Hotel Suites', category: 'Hospitality', logo: '🏨', location: 'Nakuru' },
  { name: 'Express Transport', category: 'Transport', logo: '🚌', location: 'Thika' },
  { name: 'Yoga Zen Studio', category: 'Wellness', logo: '🧘‍♀️', location: 'Nairobi' },
  { name: 'TechRepair Pro', category: 'Repair Services', logo: '🔧', location: 'Mombasa' },
  { name: 'Fresh Dental Care', category: 'Dental', logo: '🦷', location: 'Kisumu' },
  { name: 'Elite Car Rental', category: 'Car Rental', logo: '🚗', location: 'Nairobi' }
];

export const PartnersSlider = () => {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Businesses Across Kenya
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of businesses using Boinvit to manage their operations
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-scroll space-x-6">
            {/* First set of partners */}
            {PARTNER_BUSINESSES.map((partner, index) => (
              <Card key={`first-${index}`} className="flex-shrink-0 w-64 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h3 className="font-semibold text-lg mb-1">{partner.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{partner.category}</p>
                  <p className="text-gray-500 text-xs">{partner.location}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {PARTNER_BUSINESSES.map((partner, index) => (
              <Card key={`second-${index}`} className="flex-shrink-0 w-64 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h3 className="font-semibold text-lg mb-1">{partner.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{partner.category}</p>
                  <p className="text-gray-500 text-xs">{partner.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </section>
  );
};
