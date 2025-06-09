
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthenticatedApp } from "@/pages/AuthenticatedApp";
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SettingsPage from "./pages/SettingsPage";
import ServicesPage from "./pages/ServicesPage";
import InvoiceGenerator from "./components/InvoiceGenerator";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import SafetyTips from "./pages/SafetyTips";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/public/:subdomain" element={<Index />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/safety" element={<SafetyTips />} />
        
        {/* Protected routes - require authentication */}
        {user ? (
          <>
            <Route path="/dashboard" element={<AuthenticatedApp />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/invoice" element={<InvoiceGenerator />} />
          </>
        ) : (
          <>
            {/* Redirect authenticated routes to login */}
            <Route path="/dashboard" element={<AuthForm />} />
            <Route path="/booking" element={<AuthForm />} />
            <Route path="/services" element={<AuthForm />} />
            <Route path="/subscription" element={<AuthForm />} />
            <Route path="/settings" element={<AuthForm />} />
            <Route path="/invoice" element={<AuthForm />} />
          </>
        )}
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
