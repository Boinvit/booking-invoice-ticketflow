
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
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
            <CardTitle className="text-3xl text-center">Cookie Policy</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and analyzing how you use our service.
              </p>
              <p className="mt-4">
                This Cookie Policy explains what cookies we use, why we use them, and how you can control them. This policy applies to all users of Boinvit's website and services worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium mb-2">2.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for our website to function properly. They enable core features such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>User authentication and session management</li>
                <li>Security and fraud prevention</li>
                <li>Website functionality and navigation</li>
                <li>Load balancing and performance optimization</li>
              </ul>
              <p className="mt-4">
                <strong>Legal Basis:</strong> These cookies are necessary for the performance of our contract with you and cannot be disabled.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">2.2 Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting anonymous information:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Page views and user journey tracking</li>
                <li>Performance metrics and error reporting</li>
                <li>Feature usage and engagement analytics</li>
                <li>Geographic and demographic insights</li>
              </ul>
              <p className="mt-4">
                <strong>Third-party services:</strong> Google Analytics, Mixpanel, Hotjar
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">2.3 Functional Cookies</h3>
              <p>
                These cookies enhance your experience by remembering your preferences:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Language and regional settings</li>
                <li>Theme preferences (light/dark mode)</li>
                <li>Dashboard layout customizations</li>
                <li>Recently accessed features</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6">2.4 Marketing Cookies</h3>
              <p>
                These cookies are used to deliver relevant advertisements and measure campaign effectiveness:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Retargeting and remarketing campaigns</li>
                <li>Conversion tracking and attribution</li>
                <li>Social media integration</li>
                <li>Third-party advertising platforms</li>
              </ul>
              <p className="mt-4">
                <strong>Third-party services:</strong> Google Ads, Facebook Pixel, LinkedIn Insight Tag
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Cookie Duration</h2>
              
              <h3 className="text-xl font-medium mb-2">3.1 Session Cookies</h3>
              <p>
                These cookies are temporary and are deleted when you close your browser. They are primarily used for authentication and maintaining your session while using our service.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">3.2 Persistent Cookies</h3>
              <p>
                These cookies remain on your device for a specified period or until you delete them. Common durations include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Authentication cookies: 30 days</li>
                <li>Preference cookies: 1 year</li>
                <li>Analytics cookies: 2 years</li>
                <li>Marketing cookies: 90 days to 2 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Third-Party Cookies</h2>
              <p>
                We work with trusted third-party partners who may set cookies on our website. These include:
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Google Services</h4>
                  <p className="text-sm mt-2">Analytics, Ads, reCAPTCHA, Maps integration</p>
                  <p className="text-sm">Privacy Policy: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Google Privacy Policy</a></p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Payment Processors</h4>
                  <p className="text-sm mt-2">Stripe, PayPal, and other payment gateways</p>
                  <p className="text-sm">These services use cookies for fraud prevention and secure processing</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Communication Tools</h4>
                  <p className="text-sm mt-2">Customer support chat, email marketing platforms</p>
                  <p className="text-sm">Used to provide customer support and send relevant communications</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-medium mb-2">5.1 Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>View and delete existing cookies</li>
                <li>Block all cookies or only third-party cookies</li>
                <li>Set up notifications when cookies are set</li>
                <li>Enable private/incognito browsing mode</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6">5.2 Browser-Specific Instructions</h3>
              <div className="mt-4 space-y-2">
                <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
                <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
                <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
              </div>

              <h3 className="text-xl font-medium mb-2 mt-6">5.3 Opt-Out Links</h3>
              <p>
                You can opt out of specific tracking services:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">Google Analytics Opt-out</a></li>
                <li><a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline">Facebook Ad Preferences</a></li>
                <li><a href="http://optout.aboutads.info/" className="text-blue-600 hover:underline">Digital Advertising Alliance Opt-out</a></li>
                <li><a href="http://www.youronlinechoices.eu/" className="text-blue-600 hover:underline">European Interactive Digital Advertising Alliance</a></li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6">5.4 Impact of Disabling Cookies</h3>
              <p>
                Please note that disabling certain cookies may affect your experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You may need to log in repeatedly</li>
                <li>Some features may not work properly</li>
                <li>Personalized content may not be available</li>
                <li>Website performance may be reduced</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Mobile Apps and SDKs</h2>
              <p>
                Our mobile applications may use similar technologies to cookies, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Local storage and caching</li>
                <li>Device identifiers and advertising IDs</li>
                <li>Third-party SDKs for analytics and advertising</li>
                <li>Push notification tokens</li>
              </ul>
              <p className="mt-4">
                You can manage these preferences through your device settings or within our mobile app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. International Considerations</h2>
              
              <h3 className="text-xl font-medium mb-2">7.1 GDPR Compliance (EU)</h3>
              <p>
                For users in the European Union, we obtain explicit consent for non-essential cookies and provide granular control options through our consent management platform.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">7.2 CCPA Compliance (California)</h3>
              <p>
                California residents can opt out of the sale of personal information, which includes some cookie-based tracking activities.
              </p>

              <h3 className="text-xl font-medium mb-2 mt-6">7.3 Other Jurisdictions</h3>
              <p>
                We comply with applicable cookie laws in other jurisdictions, including Canada (PIPEDA), Brazil (LGPD), and other countries where we operate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy periodically to reflect changes in our practices or applicable laws. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Updating the "Last updated" date at the top of this policy</li>
                <li>Sending email notifications for significant changes</li>
                <li>Displaying prominent notices on our website</li>
                <li>Updating our consent management platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Contact Us</h2>
              <p>
                If you have questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>Email:</strong> privacy@boinvit.com</p>
                <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
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

export default CookiePolicy;
