
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import { AuthProvider } from "@/hooks/useAuth";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import AuthenticatedApp from "@/pages/AuthenticatedApp";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import DemoPage from "@/pages/DemoPage";
import PublicBookingPage from "@/pages/PublicBookingPage";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import SafetyTips from "@/pages/SafetyTips";
import NotFound from "@/pages/NotFound";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import PWAStatus from "@/components/pwa/PWAStatus";
import BusinessDiscoveryPage from "@/pages/BusinessDiscoveryPage";
import { useSystemDarkMode } from "@/lib/useSystemDarkMode";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors or client errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  useSystemDarkMode();
  
  return (
    <>
      <SecurityHeaders />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: '14px',
              },
              className: 'text-sm',
            }}
          />
          <BrowserRouter>
            <AuthProvider>
              <div className="relative min-h-screen">
                <Routes>
                  {/* Landing page as default */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/demo" element={<DemoPage />} />
                  
                  {/* Business Discovery Map */}
                  <Route path="/discover" element={<BusinessDiscoveryPage />} />
                  
                  {/* QR Code booking routes - Multiple variations for reliability */}
                  <Route path="/book/:businessId" element={<PublicBookingPage />} />
                  <Route path="/booking/:businessId" element={<PublicBookingPage />} />
                  <Route path="/public-booking/:businessId" element={<PublicBookingPage />} />
                  
                  {/* Authenticated app routes */}
                  <Route path="/app/*" element={<AuthenticatedApp />} />
                  
                  {/* Legal pages */}
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="/safety" element={<SafetyTips />} />
                  
                  {/* Legacy route redirects */}
                  <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
                  <Route path="/services" element={<Navigate to="/app/services" replace />} />
                  <Route path="/booking-management" element={<Navigate to="/app/bookings" replace />} />
                  <Route path="/clients" element={<Navigate to="/app/clients" replace />} />
                  <Route path="/staff" element={<Navigate to="/app/staff" replace />} />
                  <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
                  <Route path="/invoices" element={<Navigate to="/app/invoices" replace />} />
                  <Route path="/subscription" element={<Navigate to="/app/subscription" replace />} />
                  
                  {/* Catch all - 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* PWA Components - Mobile Optimized */}
                <InstallPrompt />
                <div className="fixed top-4 right-4 z-40">
                  <PWAStatus />
                </div>
              </div>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
=======
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthenticatedApp } from "@/pages/AuthenticatedApp";
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import BookingManagementPage from "./pages/BookingManagementPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SettingsPage from "./pages/SettingsPage";
import ServicesPage from "./pages/ServicesPage";
import ClientsPage from "./pages/ClientsPage";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceGenerator from "./components/InvoiceGenerator";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import SafetyTips from "./pages/SafetyTips";
import PublicBookingPage from "./pages/PublicBookingPage";

const queryClient = new QueryClient();

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600 text-lg">Loading...</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Public Route Component (redirects authenticated users)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path="/" element={<Index />} />
        <Route path="/book/:subdomain" element={<PublicBookingPage />} />
        <Route path="/public/:subdomain" element={<Index />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/safety" element={<SafetyTips />} />
        
        {/* Auth routes - redirect if already authenticated */}
        <Route path="/auth" element={<PublicRoute><AuthForm /></PublicRoute>} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/dashboard" element={<ProtectedRoute><AuthenticatedApp /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/booking-management" element={<ProtectedRoute><BookingManagementPage /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><ClientsPage /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/invoice" element={<ProtectedRoute><InvoiceGenerator /></ProtectedRoute>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
  );
};

export default App;
