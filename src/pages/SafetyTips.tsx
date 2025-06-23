
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, CreditCard, MapPin, Phone, AlertTriangle } from 'lucide-react';

const SafetyTips = () => {
  const safetyCategories = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Platform Security',
      tips: [
        'Always verify business credentials before booking services',
        'Use secure payment methods provided by the platform',
        'Report suspicious activities immediately to our support team',
        'Keep your account information private and secure'
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Personal Safety',
      tips: [
        'Meet service providers in public or established business locations',
        'Share your booking details with trusted contacts',
        'Trust your instincts if something feels wrong',
        'Verify the identity of service providers when they arrive'
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Payment Security',
      tips: [
        'Pay through the platforms verified payment details/system',
        'Use verified payment methods with fraud protection',
        'Keep records of all transactions and receipts',
        'Report unauthorized charges immediately'
      ]
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Transport Safety',
      tips: [
        'Verify vehicle details and driver information before boarding',
        'Share your travel itinerary with family or friends',
        'Check vehicle condition and safety features',
        'Keep emergency contacts readily available during travel'
      ]
    }
  ];

  const emergencyContacts = [
    { country: 'Global Emergency', number: '+1-800-BOINVIT', type: 'Platform Support' },
    { country: 'United States', number: '911', type: 'Emergency Services' },
    { country: 'United Kingdom', number: '999', type: 'Emergency Services' },
    { country: 'Kenya', number: '999', type: 'Emergency Services' },
    { country: 'South Africa', number: '10111', type: 'Police' },
    { country: 'Nigeria', number: '199', type: 'Emergency Services' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Safety Guidelines</h1>
          <p className="mt-2 text-gray-600">Your safety is our top priority. Follow these guidelines for a secure experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {safetyCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="text-blue-600">{category.icon}</div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-800">
                <AlertTriangle className="h-6 w-6" />
                Red Flags to Watch For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-orange-800">
                <li>• Unusual location changes or meeting points</li>
                <li>• Pressure to complete transactions quickly</li>
                <li>• Unwillingness to provide proper identification</li>
                <li>• Services significantly below market rate</li>
                <li>• Communication only through contacts not listed on Boinvit</li>
                <li>• Requests for personal financial information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-800">
                <Phone className="h-6 w-6" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center text-green-800">
                    <div>
                      <p className="font-medium">{contact.country}</p>
                      <p className="text-sm text-green-600">{contact.type}</p>
                    </div>
                    <p className="font-mono font-bold">{contact.number}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-blue-900">Global Safety Commitment</h2>
              <p className="text-blue-800 max-w-3xl mx-auto">
                As a platform competing globally with other popular services and regional leaders, 
                we maintain the highest safety standards across all markets. Our 24/7 safety team monitors activities 
                and responds to incidents worldwide.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-blue-900">24/7 Support</p>
                  <p className="text-sm text-blue-700">Global assistance available</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-blue-900">Verified Providers</p>
                  <p className="text-sm text-blue-700">All businesses are screened</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-blue-900">Secure Payments</p>
                  <p className="text-sm text-blue-700">Bank-level encryption</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyTips;
