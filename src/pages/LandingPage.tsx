
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Receipt, 
  Star, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Shield,
  Globe,
  BarChart3,
  CreditCard,
  UserCheck,
  Building2
} from 'lucide-react';
import { GlobalPartnersSlider } from '@/components/landing/GlobalPartnersSlider';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Smart Booking System",
      description: "Advanced scheduling with automated reminders, capacity management, and real-time availability"
    },
    {
      icon: Users,
      title: "Client & Staff Management",
      description: "Comprehensive profiles, attendance tracking, performance analytics, and team coordination"
    },
    {
      icon: Receipt,
      title: "Invoice & Payment Processing",
      description: "Professional invoicing with integrated Paystack payments and multiple payment options"
    },
    {
      icon: BarChart3,
      title: "Business Analytics & Reporting",
      description: "Real-time insights, revenue tracking, performance metrics, and growth analytics"
    },
    {
      icon: CreditCard,
      title: "Payment Gateway Integration",
      description: "Secure payment processing with mobile money, bank transfers, and card payments"
    },
    {
      icon: UserCheck,
      title: "Staff Performance & Attendance",
      description: "Track staff productivity, manage schedules, and monitor business operations"
    },
    {
      icon: Building2,
      title: "Multi-Location Support",
      description: "Manage multiple business locations from a single dashboard with centralized control"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with 99.9% uptime guarantee and data protection"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Elegant Beauty Spa",
      location: "Nairobi, Kenya",
      text: "Boinvit transformed our entire business operations. Revenue increased by 60% with better management!",
      rating: 5
    },
    {
      name: "James Mwangi",
      business: "FitLife Gym",
      location: "Mombasa, Kenya",
      text: "Complete business solution! From bookings to payments, everything is streamlined and professional.",
      rating: 5
    },
    {
      name: "Maria Wanjiku",
      business: "HealthCare Plus Clinic",
      location: "Kisumu, Kenya",
      text: "The staff management and analytics features helped us optimize our operations significantly.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Free Trial",
      price: "KES 10 One-time fee",
      period: "/7 days",
      features: [
        "Full Medium Plan access",
        "All premium features",
        "No credit card required",
        "Email support",
        "Complete business management"
      ],
      popular: true
    },
    {
      name: "Starter Plan",
      price: "KES 1020",
      period: "/month",
      features: [
        "Up to 5 staff members",
        "1,000 bookings/month",
        "QR code booking system",
        "WhatApp notifications",
        "Basic analytics",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Business Plan",
      price: "KES 2900",
      period: "/month",
      features: [
        "Up to 15 staff members",
        "3,000 bookings/month",
        "QR code booking system",
        "WhatsApp notifications",
        "Advanced analytics",
        "Priority email support",
        "Custom branding"
      ],
      popular: false
    },
    {
      name: "Enterprise Plan",
      price: "KES 9900",
      period: "/month",
      features: [
        "Unlimited staff & bookings",
        "Multi-location support",
        "Advanced reporting",
        "API access",
        "Priority support",
        "Custom integrations",
        "White-label options"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags are in index.html */}
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/307c9897-7d4d-4c72-9525-71af1ea5c02f.png" 
                alt="Boinvit Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Boinvit</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/discover" className="text-gray-600 hover:text-royal-red transition-colors">
                Discover Businesses
              </Link>
              <Link to="/demo" className="text-gray-600 hover:text-royal-red transition-colors">
                Demo
              </Link>
              <Link to="/safety" className="text-gray-600 hover:text-royal-red transition-colors">
                Safety
              </Link>
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="border-royal-red text-royal-red hover:bg-royal-red hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-royal-red hover:bg-royal-red/90 text-white"
              >
                Get Started
              </Button>
            </div>

            <div className="md:hidden">
              <Button 
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-royal-red text-royal-red hover:bg-royal-red hover:text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-royal-red/5 to-royal-red/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-royal-red/10 text-royal-red">
              🚀 Complete Business Management Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Business Management with 
              <span className="text-royal-red"> Boinvit</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              All-in-one business management platform: bookings, invoicing, payments, staff management, 
              analytics, and client relationship management. Everything you need to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="bg-royal-red hover:bg-royal-red/90 text-white px-8 py-3 text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/demo')}
                className="border-royal-red text-royal-red hover:bg-royal-red hover:text-white px-8 py-3 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partners Slider */}
      <GlobalPartnersSlider />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Business Management Suite
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From appointment scheduling to financial management, staff coordination to customer insights - 
              we provide everything your business needs to thrive and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-royal-red mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Businesses Across Kenya & Beyond
            </h2>
            <p className="text-lg text-gray-600">
              See how Boinvit is transforming businesses and driving growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.business}, {testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your business needs - start with a free trial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow ${plan.popular ? 'border-royal-red' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-royal-red text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-royal-red">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-royal-red hover:bg-royal-red/90 text-white' : 'border-royal-red text-royal-red hover:bg-royal-red hover:text-white'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/auth')}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-royal-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business Operations?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Boinvit's complete management platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-white text-royal-red hover:bg-gray-50 px-8 py-3 text-lg"
            >
              Start Your Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/discover')}
              className="border-white text-white hover:bg-white hover:text-royal-red px-8 py-3 text-lg"
            >
              Discover Businesses
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/lovable-uploads/307c9897-7d4d-4c72-9525-71af1ea5c02f.png" 
                  alt="Boinvit Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">Boinvit</span>
              </div>
              <p className="text-gray-400">
                Complete business management platform for modern entrepreneurs worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/demo" className="hover:text-white">Demo</Link></li>
                <li><Link to="/discover" className="hover:text-white">Discover</Link></li>
                <li><Link to="/safety" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@boinvit.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +254 769 829 304
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Nairobi, Kenya
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Boinvit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
