
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface SignInFormProps {
  loading: boolean;
  authError: string | null;
  pendingEmail: string;
  onError: (error: string | null) => void;
}

export const SignInForm = ({ loading, authError, pendingEmail, onError }: SignInFormProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    onError(null);
    
    // Client-side validation
    if (!email.trim()) {
      onError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      onError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      onError('Please enter your password.');
      return;
    }
    
    try {
      console.log('Submitting sign in form for email:', email);
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in form error:', error);
        onError(error.message);
      } else {
        console.log('Sign in form successful');
      }
    } catch (error) {
      console.error('Unexpected error in sign in form:', error);
      onError('An unexpected error occurred. Please try again.');
    }
  };

  const isFormDisabled = loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (authError) onError(null);
          }}
          disabled={isFormDisabled}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (authError) onError(null);
            }}
            disabled={isFormDisabled}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isFormDisabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {pendingEmail && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center gap-2 text-yellow-800 text-sm">
            <Mail className="h-4 w-4" />
            <span>
              Account requires email confirmation. Please check your email for the confirmation link.
            </span>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full bg-royal-red hover:bg-royal-red/90" disabled={isFormDisabled}>
        {isFormDisabled ? 'Signing in...' : 'Sign In'}
      </Button>
      <p className="text-sm text-gray-600 text-center">
        Don't have an account? Switch to the Sign Up tab above.
      </p>
    </form>
  );
};
