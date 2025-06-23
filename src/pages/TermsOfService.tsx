
<<<<<<< HEAD
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
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Boinvit</span>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Terms of Service</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Boinvit's booking and invoice management platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
              </p>
              <p className="mt-4">
                These Terms constitute a legally binding agreement between you and Boinvit ("Company," "we," "our," or "us"). These Terms apply to all users worldwide, including businesses, individuals, and end customers.
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
              </p>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Boinvit Legal Team</p>
                <p>Email: legal@boinvit.com</p>
                <p>Address: Global Legal Department</p>
                <p>Response Time: Within 5 business days</p>
=======
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Description of Service</h2>
              <p>
                Boinvit provides a comprehensive platform for service businesses to manage bookings, generate invoices, create digital tickets, and process payments. Our Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Online booking system with custom subdomains</li>
                <li>Automated invoice generation and payment processing</li>
                <li>QR code generation for business profiles and tickets</li>
                <li>Customer management and communication tools</li>
                <li>Analytics and reporting features</li>
                <li>Integration with third-party payment processors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. User Accounts and Registration</h2>
              
              <h3 className="text-xl font-medium mb-2">3.1 Account Creation</h3>
              <p>
                To use our Service, you must create an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">3.2 Eligibility</h3>
              <p>
                You must be at least 18 years old and have the legal capacity to enter into contracts in your jurisdiction. By using our Service, you represent that you meet these requirements.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">3.3 Business Verification</h3>
              <p>
                For business accounts, you may be required to provide additional verification information, including business registration documents and tax identification numbers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Acceptable Use Policy</h2>
              <p>You agree not to use our Service to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Transmit malicious code, viruses, or harmful content</li>
                <li>Engage in fraudulent, deceptive, or misleading activities</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Interfere with or disrupt our Service or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access our Service without permission</li>
                <li>Resell or redistribute our Service without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Payment Terms and Billing</h2>
              
              <h3 className="text-xl font-medium mb-2">5.1 Subscription Fees</h3>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as expressly stated in these Terms or required by law.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">5.2 Payment Processing</h3>
              <p>
                We use third-party payment processors to handle transactions. You agree to their terms and conditions. We are not responsible for payment processing errors or failures.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">5.3 Transaction Fees</h3>
              <p>
                Additional transaction fees may apply for payment processing, depending on your subscription plan and payment methods used by your customers.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">5.4 Currency and Taxes</h3>
              <p>
                Prices are displayed in USD unless otherwise specified. You are responsible for any applicable taxes, duties, or fees imposed by your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-medium mb-2">6.1 Our Rights</h3>
              <p>
                Boinvit and its licensors own all rights, title, and interest in the Service, including all intellectual property rights. You may not copy, modify, or create derivative works of our Service.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">6.2 Your Content</h3>
              <p>
                You retain ownership of content you submit to our Service. However, you grant us a worldwide, royalty-free license to use, store, and display your content as necessary to provide our Service.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">6.3 Trademark Policy</h3>
              <p>
                You may not use our trademarks, logos, or brand names without our prior written consent. We respect the intellectual property rights of others and expect our users to do the same.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using our Service, you consent to our data practices as described in our Privacy Policy.
              </p>
              <p className="mt-4">
                We comply with applicable data protection laws, including GDPR, CCPA, and other international privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Service Availability and Modifications</h2>
              
              <h3 className="text-xl font-medium mb-2">8.1 Service Availability</h3>
              <p>
                We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may temporarily suspend service for maintenance, upgrades, or technical issues.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">8.2 Service Modifications</h3>
              <p>
                We reserve the right to modify, update, or discontinue any aspect of our Service at any time. We will provide reasonable notice of material changes that may affect your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Termination</h2>
              
              <h3 className="text-xl font-medium mb-2">9.1 Termination by You</h3>
              <p>
                You may terminate your account at any time by contacting our support team or through your account settings. Termination does not entitle you to a refund of any prepaid fees.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">9.2 Termination by Us</h3>
              <p>
                We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or fail to pay applicable fees. We will provide reasonable notice unless immediate termination is necessary.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">9.3 Effect of Termination</h3>
              <p>
                Upon termination, your access to the Service will cease, and we may delete your account data after a reasonable retention period for legal and business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Disclaimers and Limitation of Liability</h2>
              
              <h3 className="text-xl font-medium mb-2">10.1 Service Disclaimers</h3>
              <p>
                Our Service is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">10.2 Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, our total liability for any claims arising from these Terms or your use of our Service shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">10.3 Exclusion of Damages</h3>
              <p>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold us harmless from any claims, damages, losses, and expenses (including legal fees) arising from your use of our Service, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Dispute Resolution</h2>
              
              <h3 className="text-xl font-medium mb-2">12.1 Governing Law</h3>
              <p>
                These Terms are governed by the laws of [Jurisdiction to be specified], without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">12.2 Arbitration</h3>
              <p>
                Any disputes arising from these Terms or your use of our Service shall be resolved through binding arbitration, except where prohibited by law or for claims that may be brought in small claims court.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">12.3 Class Action Waiver</h3>
              <p>
                You agree to resolve disputes individually and waive any right to bring or participate in class action lawsuits or collective arbitrations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">13. General Provisions</h2>
              
              <h3 className="text-xl font-medium mb-2">13.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy and any additional terms for specific features, constitute the entire agreement between you and Boinvit.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">13.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">13.3 Force Majeure</h3>
              <p>
                We shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, or government actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">14. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>Email:</strong> legal@boinvit.com</p>
                <p><strong>Address:</strong> Boinvit Legal Department, [Address to be updated]</p>
                <p><strong>Support:</strong> support@boinvit.com</p>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
              </div>
            </section>
          </CardContent>
        </Card>
<<<<<<< HEAD
      </div>
=======
      </main>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
    </div>
  );
};

export default TermsOfService;
