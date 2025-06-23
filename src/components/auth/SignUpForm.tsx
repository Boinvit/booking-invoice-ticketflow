
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { PasswordStrength } from './PasswordStrength';

interface SignUpFormProps {
  loading: boolean;
  authError: string | null;
  onError: (error: string | null) => void;
  onSignUpSuccess: (email: string) => void;
  onTabChange: (tab: string) => void;
}

export const SignUpForm = ({ loading, authError, onError, onSignUpSuccess, onTabChange }: SignUpFormProps) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    return score;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    onError(null);

    if (!validateEmail(email)) {
      onError('Please enter a valid email address.');
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      onError('Please enter your first and last name.');
      return;
    }

    if (password !== confirmPassword) {
      onError('Passwords do not match.');
      return;
    }

    if (checkPasswordStrength(password) < 3) {
      onError('Please choose a stronger password.');
      return;
    }
    
    try {
      const { error } = await signUp(email, password, {
        firstName: firstName.trim(),
        lastName: lastName.trim()
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          onError('An account with this email already exists. Please sign in instead.');
          onTabChange('signin');
        } else if (error.message.includes('Password should be at least')) {
          onError('Password must be at least 6 characters long.');
        } else {
          onError(error.message);
        }
      } else {
        onSignUpSuccess(email);
        // Clear form
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
      }
    } catch (error) {
      onError('An unexpected error occurred. Please try again.');
    }
  };

  const passwordStrength = checkPasswordStrength(password);
  const isFormDisabled = loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-firstname">First Name</Label>
          <Input
            id="signup-firstname"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (authError) onError(null);
            }}
            disabled={isFormDisabled}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-lastname">Last Name</Label>
          <Input
            id="signup-lastname"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (authError) onError(null);
            }}
            disabled={isFormDisabled}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
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
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (authError) onError(null);
            }}
            disabled={isFormDisabled}
            required
            minLength={6}
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
        <PasswordStrength password={password} confirmPassword={confirmPassword} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="signup-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (authError) onError(null);
            }}
            disabled={isFormDisabled}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isFormDisabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-start gap-2 text-blue-800 text-sm">
          <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium mb-1">Email confirmation required</div>
            <div>
              After creating your account, you'll receive a confirmation email. 
              Click the link in the email to activate your account and sign in.
            </div>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-royal-red hover:bg-royal-red/90" 
        disabled={isFormDisabled || password !== confirmPassword || passwordStrength < 3}
      >
        {isFormDisabled ? 'Creating account...' : 'Create Account'}
      </Button>
      <p className="text-sm text-gray-600 text-center">
        Already have an account? Switch to the Sign In tab above.
      </p>
    </form>
  );
};
