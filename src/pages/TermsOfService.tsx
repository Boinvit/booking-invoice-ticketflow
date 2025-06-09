
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
              </p>
            </section>

            <section>
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
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;
