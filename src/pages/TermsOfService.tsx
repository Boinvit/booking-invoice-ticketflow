
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-gray-600">Effective Date: January 2024</p>
        </div>

        <Card>
          <CardContent className="prose max-w-none p-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Boinvit's business management and booking platform, you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, 
                you are prohibited from using or accessing this platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Boinvit provides a comprehensive business management platform that includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Booking and appointment management systems</li>
                <li>Customer relationship management tools</li>
                <li>Payment processing and invoicing capabilities</li>
                <li>Transport service integration and management</li>
                <li>Multi-currency and international market support</li>
                <li>Analytics and business intelligence features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Account Security</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Maintain confidentiality of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Use strong passwords and enable two-factor authentication</li>
                    <li>Regularly update your account information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Acceptable Use</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Use the platform only for legitimate business purposes</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Respect intellectual property rights</li>
                    <li>Maintain accurate and up-to-date business information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Prohibited Activities</h2>
              <p className="text-gray-700 leading-relaxed">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the platform's functionality</li>
                <li>Transmit viruses, malware, or other harmful content</li>
                <li>Engage in fraudulent activities or misrepresent your identity</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Pricing and Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Subscription Plans</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Freemium Trial: 30 days free with limited features</li>
                    <li>Standard Plan: $9/month for growing businesses</li>
                    <li>Premium Plan: $19/month for established businesses</li>
                    <li>Corporate Plan: $29/month for enterprise organizations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Payment Terms</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>All payments are processed securely through our payment partners</li>
                    <li>Subscriptions are billed monthly in advance</li>
                    <li>Prices are subject to change with 30 days notice</li>
                    <li>Refunds are available according to our refund policy</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Boinvit platform and its original content, features, and functionality are owned by Boinvit and are 
                protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. 
                You retain ownership of content you create using our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain 99.9% uptime for our platform. However, we do not guarantee uninterrupted access 
                and may need to suspend service for maintenance, updates, or due to circumstances beyond our control. 
                We will provide reasonable notice for planned maintenance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Boinvit be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including loss of profits, data, or business interruption, arising from your use of the platform. 
                Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding 
                the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">International Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                As a global platform competing with international services like Booking.com, we comply with various 
                international regulations including GDPR, CCPA, and other applicable data protection and business laws. 
                Users are responsible for compliance with their local regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                Either party may terminate this agreement at any time. Upon termination, your access to the platform 
                will be revoked, and we will provide you with a reasonable opportunity to export your data. 
                We reserve the right to terminate accounts that violate these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with international commercial 
                law principles, with disputes resolved through binding arbitration in a neutral jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Boinvit Legal Team</p>
                <p>Email: legal@boinvit.com</p>
                <p>Address: Global Legal Department</p>
                <p>Response Time: Within 5 business days</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
