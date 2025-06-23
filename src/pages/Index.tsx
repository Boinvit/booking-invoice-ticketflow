
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, 
  ArrowUp, 
  Ticket, 
  Youtube, 
  Plane, 
  Car, 
  Scissors, 
  Stethoscope, 
  Package, 
  Sparkles,
  QrCode,
  Star,
  Check,
  Zap,
  Shield,
<<<<<<< HEAD
  Globe,
  Download,
  Smartphone
=======
  Globe
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
} from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const businessTypes = [
  { icon: Car, name: "Transport Services", desc: "Taxi, Bus & Ride Booking" },
  { icon: Package, name: "Courier & Logistics", desc: "Parcel & Delivery Services" },
  { icon: Scissors, name: "Beauty & Wellness", desc: "Salons, Spas & Barbershops" },
  { icon: Sparkles, name: "Massage Therapy", desc: "Wellness & Therapeutic Services" },
  { icon: Stethoscope, name: "Healthcare", desc: "Clinics & Medical Appointments" },
  { icon: Plane, name: "Travel & Tourism", desc: "Air Tickets & Travel Booking" },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % businessTypes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
<<<<<<< HEAD
            <Ticket className="h-8 w-8 text-royal-red" />
=======
            <Ticket className="h-8 w-8 text-blue-600" />
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
            <span className="text-2xl font-bold text-gray-900">Boinvit</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
<<<<<<< HEAD
              <Button className="bg-royal-red hover:bg-royal-red-accent text-royal-red-foreground">Get Started Free</Button>
=======
              <Button>Get Started Free</Button>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-5xl mx-auto">
<<<<<<< HEAD
          <Badge className="mb-6 bg-gradient-to-r from-royal-red-muted to-purple-100 text-royal-red border-royal-red hover:bg-royal-red-muted">
=======
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:bg-blue-100">
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
            <Star className="w-4 h-4 mr-1" />
            Trusted by 10,000+ Service Businesses Globally
          </Badge>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Complete Business Solution for
<<<<<<< HEAD
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-red to-purple-600"> Service Industries</span>
=======
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Service Industries</span>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            From transport and logistics to beauty and healthcare - Boinvit powers booking, invoicing, and ticketing for diverse service businesses worldwide. Generate QR codes, accept payments, and delight customers with our all-in-one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
<<<<<<< HEAD
              <Button size="lg" className="bg-gradient-to-r from-royal-red to-purple-600 hover:from-royal-red-accent hover:to-purple-700 text-white px-8 py-4">
=======
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4">
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial - No Credit Card
              </Button>
            </Link>
<<<<<<< HEAD
            <Button size="lg" variant="outline" className="px-8 py-4 border-royal-red text-royal-red hover:bg-royal-red-muted">
=======
            <Button size="lg" variant="outline" className="px-8 py-4">
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
              <Youtube className="mr-2 h-4 w-4" />
              Watch 2-Min Demo
            </Button>
          </div>
        </div>
      </header>

<<<<<<< HEAD
      {/* Mobile App Download Section */}
      <section className="py-16 bg-gradient-to-r from-royal-red-muted to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-royal-red text-royal-red-foreground">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile Apps Available
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Download Our Mobile App
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take your business on the go with our native mobile apps for Android and iOS. Manage bookings, send invoices, and track your business from anywhere.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
            <Button size="lg" className="w-full sm:w-auto bg-royal-red hover:bg-royal-red-accent text-royal-red-foreground px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download for Android
            </Button>
            <Button size="lg" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download for iOS
            </Button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Coming to app stores soon! Get notified when available.
            </p>
          </div>
        </div>
      </section>

=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      {/* Sliding Business Types Showcase */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted Across All Service Industries Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From small local businesses to enterprise operations across 50+ countries, Boinvit adapts to your industry needs
            </p>
          </div>
          
          <div className="relative">
            <div className="flex animate-[slide-in-right_20s_linear_infinite] space-x-8">
              {[...businessTypes, ...businessTypes].map((business, index) => (
<<<<<<< HEAD
                <Card key={index} className="min-w-[300px] border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 hover:border-royal-red">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-royal-red-muted to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <business.icon className="h-8 w-8 text-royal-red" />
=======
                <Card key={index} className="min-w-[300px] border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <business.icon className="h-8 w-8 text-blue-600" />
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                    </div>
                    <CardTitle className="text-xl text-gray-900">{business.name}</CardTitle>
                    <CardDescription className="text-gray-600">{business.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
<<<<<<< HEAD
                    <Badge variant="outline" className="text-royal-red border-royal-red">
=======
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                      <Check className="w-3 h-3 mr-1" />
                      Active Businesses: 500+
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unique QR Code Feature Highlight */}
<<<<<<< HEAD
      <section className="py-16 bg-gradient-to-r from-purple-50 to-royal-red-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-royal-red text-royal-red-foreground">
=======
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
              <QrCode className="w-4 h-4 mr-2" />
              Exclusive Feature
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
<<<<<<< HEAD
              Revolutionary QR Code Booking System
=======
              Revolutionary QR Code Business Profiles
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The only platform that generates unique QR codes for your business. Customers simply scan to access your booking page, services, and make instant payments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
<<<<<<< HEAD
                  <div className="w-8 h-8 bg-royal-red-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-4 h-4 text-royal-red" />
=======
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-4 h-4 text-purple-600" />
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Access</h3>
                    <p className="text-gray-600">Customers scan your QR code and immediately access your full business profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">No App Downloads</h3>
                    <p className="text-gray-600">Works with any smartphone camera - no additional apps required</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Secure & Fast</h3>
                    <p className="text-gray-600">Encrypted QR codes with instant booking and payment processing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
<<<<<<< HEAD
              <div className="bg-white p-8 rounded-xl shadow-2xl inline-block border-2 border-royal-red-muted">
                <QrCode className="w-32 h-32 text-gray-800 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Sample QR Code</p>
                <Badge className="bg-royal-red text-royal-red-foreground">
=======
              <div className="bg-white p-8 rounded-xl shadow-2xl inline-block">
                <QrCode className="w-32 h-32 text-gray-800 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Sample QR Code</p>
                <Badge className="bg-green-100 text-green-800">
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                  Scan with your phone camera
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Scale Your Business Globally
          </h2>
          <p className="text-lg text-gray-600">
            Professional tools that work seamlessly across all service industries and countries
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Smart Booking System */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowDown className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Smart Booking System</CardTitle>
              <CardDescription>
                Industry-specific booking pages with your business branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
<<<<<<< HEAD
                <li>• Service selection & staff assignment</li>
                <li>• Real-time availability tracking</li>
                <li>• WhatsApp/Email confirmations</li>
                <li>• Calendar integration & sync</li>
                <li>• Location services using Google Maps</li>
=======
                <li>• Custom subdomain: yourname.boinvit.com</li>
                <li>• Service selection & staff assignment</li>
                <li>• Real-time availability tracking</li>
                <li>• WhatsApp/SMS confirmations</li>
                <li>• Calendar integration & sync</li>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
                <li>• QR code instant booking</li>
              </ul>
            </CardContent>
          </Card>

          {/* Professional Invoicing */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowUp className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Professional Invoicing</CardTitle>
              <CardDescription>
                Automated invoices with payment tracking and reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Auto-generate after bookings</li>
                <li>• Custom business branding</li>
                <li>• Multiple payment methods</li>
                <li>• Automated follow-ups</li>
                <li>• Tax calculation & reports</li>
                <li>• Digital receipt delivery</li>
              </ul>
            </CardContent>
          </Card>

          {/* Digital Ticketing */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Ticket className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Digital Ticketing</CardTitle>
              <CardDescription>
                QR code tickets with real-time validation and tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Digital check-in system</li>
                <li>• Anti-fraud validation</li>
                <li>• Customer service history</li>
                <li>• Automated reminders</li>
                <li>• Analytics & reporting</li>
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
              How Boinvit Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple setup, powerful results for your business
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-royal-red text-royal-red-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Create Business Profile</h3>
              <p className="text-sm text-gray-600">Set up your business details, services, and branding</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-royal-red text-royal-red-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Share Booking Link</h3>
              <p className="text-sm text-gray-600">Clients book services through your booking URL</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-royal-red text-royal-red-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Generate Tickets</h3>
              <p className="text-sm text-gray-600">Automatic service tickets sent to clients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-royal-red text-royal-red-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
            Only pay for your most suited plans. Your clients book for free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Tier</CardTitle>
              <CardDescription className="text-lg">Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold text-gray-900 mt-4">KES 0/month</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>• Up to 1000 bookings/month</li>
                <li>• Basic booking page</li>
                <li>• Watermarked invoices</li>
                <li>• Email notifications</li>
                <li>• Basic support</li>
              </ul>
              <Button className="w-full mt-6" variant="outline">Get Started Free</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-royal-red relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-royal-red text-royal-red-foreground">
              Most Popular
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Business Plan</CardTitle>
              <CardDescription className="text-lg">For growing businesses</CardDescription>
              <div className="text-3xl font-bold text-gray-900 mt-4">KES 2900/month</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>• Up to 15 staff members</li>
                <li>• 3,000 bookings/month</li>
                <li>• Branded invoices</li>
                <li>• WhatsApp + Email notifications</li>
                <li>• Analytics dashboard</li>
                <li>• Priority support</li>
              </ul>
              <Button className="w-full mt-6 bg-royal-red hover:bg-royal-red-accent text-royal-red-foreground">Start Pro Trial</Button>
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
                <span className="text-xl font-bold">Boinvit</span>
              </div>
              <p className="text-gray-400">
                Streamlining service businesses worldwide with smart booking and invoicing solutions.
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
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
                <li><Link to="/safety">Safety Tips</Link></li>
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
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Boinvit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
