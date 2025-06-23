
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">Effective Date: January 2024</p>
        </div>

        <Card>
          <CardContent className="prose max-w-none p-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At Boinvit, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                business management and booking platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Personal Information</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Name, email address, phone number</li>
                    <li>Business information and location data</li>
                    <li>Payment and billing information</li>
                    <li>Profile information and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Usage Information</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Platform usage patterns and analytics</li>
                    <li>Device information and IP addresses</li>
                    <li>Booking and transaction history</li>
                    <li>Communication logs and support interactions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and maintain our booking and business management services</li>
                <li>Process transactions and manage your account</li>
                <li>Send important notifications about bookings and services</li>
                <li>Improve our platform through analytics and user feedback</li>
                <li>Ensure platform security and prevent fraudulent activities</li>
                <li>Comply with legal obligations and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>End-to-end encryption for sensitive data transmission</li>
                <li>Secure cloud infrastructure with regular security audits</li>
                <li>Access controls and authentication protocols</li>
                <li>Regular security updates and vulnerability assessments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                As Boinvit operates globally, we may transfer your information to countries outside your residence. 
                We ensure appropriate safeguards are in place to protect your data in accordance with applicable 
                privacy laws, including GDPR for European users and similar regulations worldwide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Access and portability of your personal data</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to certain processing activities</li>
                <li>Withdrawal of consent where processing is based on consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform integrates with third-party services including payment processors, mapping services, 
                and analytics providers. These services have their own privacy policies, and we encourage you to 
                review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes through email or platform notifications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Boinvit Privacy Team</p>
                <p>Email: privacy@boinvit.com</p>
                <p>Address: Global Operations Center</p>
                <p>Response Time: Within 48 hours</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
