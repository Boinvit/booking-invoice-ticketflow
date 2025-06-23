
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            <CardTitle className="text-3xl text-center">Privacy Policy</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
              <p>
                Boinvit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our booking and invoice management platform, whether accessed via our website, mobile application, or other digital services (collectively, the "Service").
              </p>
              <p className="mt-4">
                This policy applies to all users worldwide and complies with major international privacy regulations including GDPR (European Union), CCPA (California), PIPEDA (Canada), and other applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email address, phone number)</li>
                <li>Business information (company name, address, industry type)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Profile information (profile picture, business description)</li>
                <li>Communication data (messages, support tickets)</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6">2.2 Booking and Transaction Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service bookings and appointments</li>
                <li>Invoice and payment records</li>
                <li>Customer information entered by business users</li>
                <li>QR code generation and usage data</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6">2.3 Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and location data</li>
                <li>Device information and browser type</li>
                <li>Usage analytics and performance metrics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our booking and invoicing services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send service-related communications and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our services through analytics and user feedback</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Information Sharing and Disclosure</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in providing our services (payment processors, cloud hosting, email services)</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Legal Compliance:</strong> When required by law, court order, or regulatory authority</li>
                <li><strong>Safety and Security:</strong> To protect our rights, property, or safety, or that of our users</li>
                <li><strong>With Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted data storage and regular security audits</li>
                <li>Access controls and authentication measures</li>
                <li>Regular security training for our employees</li>
                <li>Compliance with PCI DSS standards for payment data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Your Rights and Choices</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Restriction:</strong> Request limitation of processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at privacy@boinvit.com. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Standard Contractual Clauses approved by relevant authorities</li>
                <li>Adequacy decisions by data protection authorities</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Specific retention periods include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Account information: Until account deletion plus 7 years for legal compliance</li>
                <li>Transaction records: 7 years for tax and financial regulations</li>
                <li>Marketing data: Until you unsubscribe or object</li>
                <li>Technical logs: 12 months for security and performance analysis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If you become aware that a child has provided personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of any material changes by email or through our Service. The "Last updated" date indicates when the policy was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Contact Information</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>Email:</strong> privacy@boinvit.com</p>
                <p><strong>Address:</strong> Boinvit Privacy Office, [Address to be updated]</p>
                <p><strong>Data Protection Officer:</strong> dpo@boinvit.com</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
