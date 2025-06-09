
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyTips = () => {
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
            <CardTitle className="text-3xl text-center">Safety Tips & Best Practices</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 1, 2025</p>
            <div className="flex justify-center mt-4">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-4 h-4 mr-2" />
                Your Security is Our Priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">📱 For Business Owners</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Account Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-green-700">
                    <ul className="space-y-2">
                      <li>✅ Use strong, unique passwords with 12+ characters</li>
                      <li>✅ Enable two-factor authentication (2FA)</li>
                      <li>✅ Log out from shared or public devices</li>
                      <li>✅ Regularly review account access logs</li>
                      <li>✅ Update contact information promptly</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Customer Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700">
                    <ul className="space-y-2">
                      <li>✅ Collect only necessary customer information</li>
                      <li>✅ Verify customer identity for high-value services</li>
                      <li>✅ Use secure communication channels</li>
                      <li>✅ Regularly backup your data</li>
                      <li>✅ Train staff on privacy practices</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h3 className="font-semibold text-yellow-800 flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  Payment Security Best Practices
                </h3>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Never store customer payment information on your own systems</li>
                  <li>• Use Boinvit's secure payment processing exclusively</li>
                  <li>• Verify suspicious payment requests through multiple channels</li>
                  <li>• Monitor for unusual booking patterns or payment anomalies</li>
                  <li>• Report any suspected fraudulent activity immediately</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">👥 For Customers</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Booking Safely
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-purple-700">
                    <ul className="space-y-2">
                      <li>✅ Verify business credentials and reviews</li>
                      <li>✅ Check for SSL encryption (https://) on booking pages</li>
                      <li>✅ Read service descriptions and terms carefully</li>
                      <li>✅ Save confirmation emails and booking references</li>
                      <li>✅ Contact businesses directly for clarifications</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 bg-indigo-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-indigo-800 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-indigo-700">
                    <ul className="space-y-2">
                      <li>✅ Only provide necessary information for bookings</li>
                      <li>✅ Use secure payment methods</li>
                      <li>✅ Avoid sharing sensitive data via unsecured channels</li>
                      <li>✅ Monitor bank statements for unauthorized charges</li>
                      <li>✅ Report suspicious activities promptly</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  Red Flags to Watch For
                </h3>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>⚠️ Requests for payment outside of Boinvit's secure system</li>
                  <li>⚠️ Businesses asking for excessive personal information</li>
                  <li>⚠️ Significantly below-market pricing (too good to be true)</li>
                  <li>⚠️ Poor communication or unprofessional correspondence</li>
                  <li>⚠️ Pressure to book immediately without time to consider</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">🌍 International Safety Considerations</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Cross-Border Transactions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Be aware of currency conversion rates and fees</li>
                    <li>• Understand local consumer protection laws</li>
                    <li>• Verify business registration in their jurisdiction</li>
                    <li>• Consider time zone differences for support</li>
                    <li>• Check visa/travel requirements for service appointments</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Cultural and Legal Awareness</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Respect local customs and business practices</li>
                    <li>• Understand cancellation and refund policies</li>
                    <li>• Be aware of local holidays and business hours</li>
                    <li>• Know emergency contact numbers in the service location</li>
                    <li>• Research local consumer rights and protections</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">🔒 Technical Security Measures</h2>
              
              <div className="grid md:grid-cols-1 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">What Boinvit Does to Protect You</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <ul className="space-y-2">
                      <li>🔐 End-to-end encryption for all data transmission</li>
                      <li>🛡️ PCI DSS compliance for payment processing</li>
                      <li>🔍 Regular security audits and penetration testing</li>
                      <li>⚡ Real-time fraud detection and prevention</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>📊 24/7 system monitoring and threat detection</li>
                      <li>💾 Secure data backup and disaster recovery</li>
                      <li>🔄 Regular security updates and patches</li>
                      <li>👮 Compliance with international security standards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">📞 Reporting Security Issues</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Immediate Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-orange-700">
                    <p className="mb-3">If you suspect immediate security threats:</p>
                    <ul className="space-y-2">
                      <li>🚨 Contact our security team: security@boinvit.com</li>
                      <li>📞 Emergency hotline: [To be updated]</li>
                      <li>💬 Use in-app emergency reporting feature</li>
                      <li>🏛️ Report to local authorities if necessary</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      General Concerns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    <p className="mb-3">For non-urgent security concerns:</p>
                    <ul className="space-y-2">
                      <li>📧 Email: support@boinvit.com</li>
                      <li>💬 In-app chat support</li>
                      <li>📝 Submit a support ticket</li>
                      <li>📞 Call our support line during business hours</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded">
                <h3 className="font-semibold text-green-800 mb-2">Response Time Commitment</h3>
                <p className="text-green-700 text-sm">
                  We commit to acknowledging security reports within 1 hour for critical issues and 24 hours for non-critical concerns. 
                  Our security team investigates all reports thoroughly and provides updates on resolution progress.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">🎓 Educational Resources</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Recommended Reading</h3>
                  <ul className="text-indigo-700 space-y-1 text-sm">
                    <li>• <a href="#" className="underline hover:no-underline">Cybersecurity Basics for Small Businesses</a></li>
                    <li>• <a href="#" className="underline hover:no-underline">Understanding Payment Card Security</a></li>
                    <li>• <a href="#" className="underline hover:no-underline">Digital Privacy Best Practices</a></li>
                    <li>• <a href="#" className="underline hover:no-underline">International Consumer Protection Guide</a></li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Training and Webinars</h3>
                  <p className="text-purple-700 text-sm mb-2">
                    Join our monthly security webinars and training sessions:
                  </p>
                  <ul className="text-purple-700 space-y-1 text-sm">
                    <li>• Monthly Security Best Practices Webinar</li>
                    <li>• Quarterly Fraud Prevention Workshop</li>
                    <li>• Annual Digital Safety Conference</li>
                    <li>• On-demand video training library</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">⚖️ Legal Disclaimers</h2>
              <div className="p-4 bg-gray-100 rounded-lg text-sm">
                <p className="mb-3">
                  <strong>Important:</strong> While Boinvit implements comprehensive security measures, users are responsible for:
                </p>
                <ul className="space-y-1 mb-3">
                  <li>• Maintaining the security of their own accounts and devices</li>
                  <li>• Following recommended safety practices</li>
                  <li>• Reporting suspicious activities promptly</li>
                  <li>• Complying with applicable laws and regulations</li>
                </ul>
                <p>
                  This safety guide is for informational purposes and does not constitute legal or financial advice. 
                  For specific concerns, consult with qualified professionals in your jurisdiction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">📞 Emergency Contacts</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">Global Emergency</h3>
                  <div className="text-red-700 text-sm space-y-1">
                    <p><strong>Security Incidents:</strong> security@boinvit.com</p>
                    <p><strong>Fraud Reports:</strong> fraud@boinvit.com</p>
                    <p><strong>24/7 Hotline:</strong> [To be updated]</p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Regional Support</h3>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p><strong>Americas:</strong> +1-XXX-XXX-XXXX</p>
                    <p><strong>Europe/Africa:</strong> +44-XXX-XXX-XXXX</p>
                    <p><strong>Asia/Pacific:</strong> +65-XXXX-XXXX</p>
                  </div>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SafetyTips;
