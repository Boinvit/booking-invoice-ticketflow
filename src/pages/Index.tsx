
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Ticket, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BookFlow</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            SaaS for Service Businesses
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Business with
            <span className="text-blue-600"> Smart Booking & Invoicing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Complete solution for barbershops, salons, taxi services, massage parlours and more. 
            Get custom booking pages, automated invoicing, and seamless client communication.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Youtube className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Core Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Three Core Solutions for Your Business
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage bookings, generate invoices, and delight customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking System */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <ArrowDown className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Smart Booking System</CardTitle>
              <CardDescription>
                Custom booking pages for your clients with your business branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Custom subdomain: yourname.bookflow.com</li>
                <li>• Mobile-first booking interface</li>
                <li>• Service selection & staff assignment</li>
                <li>• WhatsApp/SMS confirmations</li>
                <li>• Calendar integration</li>
              </ul>
            </CardContent>
          </Card>

          {/* Invoice Generator */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ArrowUp className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Invoice Generator</CardTitle>
              <CardDescription>
                Professional invoices and receipts with your business branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Auto-generate after bookings</li>
                <li>• Custom business logo & details</li>
                <li>• Send via WhatsApp/Email</li>
                <li>• Downloadable PDF format</li>
                <li>• Payment tracking</li>
              </ul>
            </CardContent>
          </Card>

          {/* Ticketing System */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Ticket className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Digital Ticketing</CardTitle>
              <CardDescription>
                QR code tickets and service confirmations for your clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• QR code service tickets</li>
                <li>• Digital check-in system</li>
                <li>• Service confirmation</li>
                <li>• Client service history</li>
                <li>• Appointment reminders</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How BookFlow Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple setup, powerful results for your business
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Create Business Profile</h3>
              <p className="text-sm text-gray-600">Set up your business details, services, and branding</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Share Booking Link</h3>
              <p className="text-sm text-gray-600">Clients book services through your custom subdomain</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Generate Tickets</h3>
              <p className="text-sm text-gray-600">Automatic service tickets sent to clients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Send Invoices</h3>
              <p className="text-sm text-gray-600">Professional invoices via WhatsApp/Email</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Only pay for what you need. Your clients book for free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Tier</CardTitle>
              <CardDescription className="text-lg">Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold text-gray-900 mt-4">$0/month</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>• Up to 50 bookings/month</li>
                <li>• Basic booking page</li>
                <li>• Watermarked invoices</li>
                <li>• Email notifications</li>
                <li>• Basic support</li>
              </ul>
              <Button className="w-full mt-6" variant="outline">Get Started Free</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
              Most Popular
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pro Tier</CardTitle>
              <CardDescription className="text-lg">For growing businesses</CardDescription>
              <div className="text-3xl font-bold text-gray-900 mt-4">$29/month</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>• Unlimited bookings</li>
                <li>• Custom subdomain</li>
                <li>• Branded invoices</li>
                <li>• WhatsApp + Email notifications</li>
                <li>• Analytics dashboard</li>
                <li>• Priority support</li>
              </ul>
              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Start Pro Trial</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Ticket className="h-6 w-6" />
                <span className="text-xl font-bold">BookFlow</span>
              </div>
              <p className="text-gray-400">
                Streamlining service businesses with smart booking and invoicing solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/demo">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/api">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BookFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
