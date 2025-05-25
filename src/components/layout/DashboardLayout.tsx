
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, Users, Calendar, FileText, DollarSign, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Boinvit</h1>
            <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex space-x-6">
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/')}>
            <Calendar className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/booking')}>
            <Calendar className="h-4 w-4" />
            Bookings
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clients
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/invoice')}>
            <FileText className="h-4 w-4" />
            Invoices
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Services
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/subscription')}>
            <CreditCard className="h-4 w-4" />
            Subscription
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/settings')}>
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};
