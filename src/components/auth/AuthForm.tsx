
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LogIn, UserPlus } from 'lucide-react';
import { AuthAlerts } from './AuthAlerts';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { PasswordResetForm } from './PasswordResetForm';

export const AuthForm = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('signin');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      console.log('User authenticated, redirecting to dashboard:', user.email);
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const clearError = () => {
    setAuthError(null);
    setResetEmailSent(false);
    setSignUpSuccess(false);
  };

  const handleSignUpSuccess = (email: string) => {
    setSignUpSuccess(true);
    setPendingEmail(email);
    toast.success('Account created! Please check your email for the confirmation link.');
    setAuthError(null);
  };

  const handleResetSuccess = () => {
    setResetEmailSent(true);
    toast.success('Password reset email sent! Check your inbox.');
    setAuthError(null);
  };

  const handleError = (error: string | null) => {
    console.log('Auth form error:', error);
    setAuthError(error);
    setLoading(false);
    if (error) {
      toast.error(error);
    }
  };

  const isFormDisabled = loading || authLoading;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/307c9897-7d4d-4c72-9525-71af1ea5c02f.png" 
              alt="Boinvit Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome to Boinvit</CardTitle>
          <CardDescription>Your complete booking management solution</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthAlerts 
            authError={authError}
            signUpSuccess={signUpSuccess}
            resetEmailSent={resetEmailSent}
            pendingEmail={pendingEmail}
          />
          
          <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); clearError(); }} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="reset">Reset</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <SignInForm 
                loading={isFormDisabled}
                authError={authError}
                pendingEmail={pendingEmail}
                onError={handleError}
              />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignUpForm 
                loading={isFormDisabled}
                authError={authError}
                onError={handleError}
                onSignUpSuccess={handleSignUpSuccess}
                onTabChange={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="reset">
              <PasswordResetForm 
                loading={isFormDisabled}
                authError={authError}
                onError={handleError}
                onResetSuccess={handleResetSuccess}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
