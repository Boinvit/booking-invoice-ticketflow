
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordResetFormProps {
  loading: boolean;
  authError: string | null;
  onError: (error: string | null) => void;
  onResetSuccess: () => void;
}

export const PasswordResetForm = ({ loading, authError, onError, onResetSuccess }: PasswordResetFormProps) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    onError(null);

    if (!validateEmail(email)) {
      onError('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await resetPassword(email);
      if (error) {
        onError(error.message);
      } else {
        onResetSuccess();
      }
    } catch (error) {
      onError('An unexpected error occurred. Please try again.');
    }
  };

  const isFormDisabled = loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
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
      <Button type="submit" className="w-full bg-royal-red hover:bg-royal-red/90" disabled={isFormDisabled}>
        {isFormDisabled ? 'Sending reset email...' : 'Send Reset Email'}
      </Button>
      <p className="text-sm text-gray-600 text-center">
        Remember your password? Switch to the Sign In tab above.
      </p>
    </form>
  );
};
