
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  FileText, 
  CreditCard,
  UserPlus,
  Building,
  LogOut,
  Bell
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BusinessSetupWizard } from '@/components/onboarding/BusinessSetupWizard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: business, isLoading } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No business found
        }
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });

  // Show business setup wizard if no business exists
  if (!isLoading && !business) {
    return <BusinessSetupWizard />;
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Services', href: '/app/services', icon: Building },
    { name: 'Bookings', href: '/app/bookings', icon: Calendar },
    { name: 'Clients', href: '/app/clients', icon: Users },
    { name: 'Staff', href: '/app/staff', icon: UserPlus },
    { name: 'Invoices', href: '/app/invoices', icon: FileText },
    { name: 'Subscription', href: '/app/subscription', icon: CreditCard },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">B</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 truncate text-sm">
            {business?.name || 'Boinvit'}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4">
        <Button
          variant="ghost"
          onClick={signOut}
          className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <NavigationContent />
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="fixed top-4 left-4 z-50 p-2 bg-white shadow-md border"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Header - Mobile */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between ml-12">
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {business?.name || 'Dashboard'}
            </h1>
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
