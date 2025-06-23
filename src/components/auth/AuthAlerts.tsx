
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';

interface AuthAlertsProps {
  authError: string | null;
  signUpSuccess: boolean;
  resetEmailSent: boolean;
  pendingEmail: string;
}

export const AuthAlerts = ({ authError, signUpSuccess, resetEmailSent, pendingEmail }: AuthAlertsProps) => {
  return (
    <>
      {authError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      {signUpSuccess && (
        <Alert className="mb-4 border-blue-200 bg-blue-50">
          <Mail className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="space-y-2">
              <div className="font-medium">Please confirm your email address</div>
              <div className="text-sm">
                We've sent a confirmation link to <strong>{pendingEmail}</strong>.
                Click the link in the email to activate your account and sign in.
              </div>
              <div className="text-sm text-blue-600">
                Don't see the email? Check your spam folder or wait a few minutes.
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {resetEmailSent && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <Mail className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Password reset email sent! Check your inbox and follow the instructions.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
