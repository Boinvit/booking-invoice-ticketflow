
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="mt-2 text-gray-600">Effective Date: January 2024</p>
        </div>

        <Card>
          <CardContent className="prose max-w-none p-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What Are Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit the Boinvit platform. 
                They help us provide you with a better experience by remembering your preferences, analyzing how 
                you use our platform, and personalizing content for you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are necessary for the platform to function properly. They enable core functionality 
                    such as security, network management, and accessibility. You cannot opt-out of these cookies.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Authentication and session management</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                  <p className="text-gray-700">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences 
                    and settings.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Language and currency preferences</li>
                    <li>Dashboard layout and customizations</li>
                    <li>Form data and user inputs</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-700">
                    These cookies help us understand how visitors interact with our platform by collecting and 
                    reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Page views and user journey tracking</li>
                    <li>Feature usage and performance metrics</li>
                    <li>Error tracking and debugging information</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are used to track visitors across websites to display relevant and engaging 
                    advertisements for individual users.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Personalized content and recommendations</li>
                    <li>Advertising effectiveness measurement</li>
                    <li>Social media integration and sharing</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We work with trusted third-party services that may also set cookies on your device. These include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Google Analytics</h4>
                  <p className="text-sm text-gray-700">For website analytics and performance monitoring</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Payment Processors</h4>
                  <p className="text-sm text-gray-700">For secure payment processing and fraud prevention</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Google Maps</h4>
                  <p className="text-sm text-gray-700">For location services and mapping functionality</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Social Media Platforms</h4>
                  <p className="text-sm text-gray-700">For social sharing and authentication features</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">International Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                As a global platform competing with international services, we comply with various cookie regulations including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li><strong>GDPR (European Union):</strong> Consent-based cookie management</li>
                <li><strong>CCPA (California):</strong> Right to opt-out of cookie tracking</li>
                <li><strong>LGPD (Brazil):</strong> Data processing transparency</li>
                <li><strong>PIPEDA (Canada):</strong> Privacy protection standards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Browser Settings</h3>
                  <p className="text-gray-700">
                    You can control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>View and delete cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block third-party cookies</li>
                    <li>Clear all cookies when closing the browser</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Platform Cookie Settings</h3>
                  <p className="text-gray-700">
                    You can manage your cookie preferences directly through our platform settings. 
                    Look for the "Cookie Preferences" option in your account settings or the cookie banner 
                    that appears on your first visit.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Disabling certain cookies may affect the functionality of our platform 
                    and your user experience. Essential cookies cannot be disabled as they are necessary for 
                    platform operation.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cookie Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain for a specified period (typically 1-24 months)</li>
                <li><strong>Authentication Cookies:</strong> Expire after period of inactivity</li>
                <li><strong>Preference Cookies:</strong> Retained until you change or delete them</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices, 
                technology, or legal requirements. We will notify you of any significant changes through 
                our platform or by email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Boinvit Privacy Team</p>
                <p>Email: cookies@boinvit.com</p>
                <p>Privacy Settings: Available in your account dashboard</p>
                <p>Response Time: Within 48 hours</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
