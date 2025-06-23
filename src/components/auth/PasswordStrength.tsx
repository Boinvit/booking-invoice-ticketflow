
import { CheckCircle } from 'lucide-react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
}

interface PasswordStrengthProps {
  password: string;
  confirmPassword: string;
}

export const PasswordStrength = ({ password, confirmPassword }: PasswordStrengthProps) => {
  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Mix of uppercase and lowercase');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('At least one number');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('At least one special character');
    }

    let color = 'text-red-500';
    if (score >= 3) color = 'text-yellow-500';
    if (score === 4) color = 'text-green-500';

    return { score, feedback, color };
  };

  const passwordStrength = checkPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              passwordStrength.score === 1 ? 'bg-red-500 w-1/4' :
              passwordStrength.score === 2 ? 'bg-yellow-500 w-2/4' :
              passwordStrength.score === 3 ? 'bg-yellow-500 w-3/4' :
              passwordStrength.score === 4 ? 'bg-green-500 w-full' : 'w-0'
            }`}
          />
        </div>
        <span className={`text-xs font-medium ${passwordStrength.color}`}>
          {passwordStrength.score === 1 ? 'Weak' :
           passwordStrength.score === 2 ? 'Fair' :
           passwordStrength.score === 3 ? 'Good' :
           passwordStrength.score === 4 ? 'Strong' : ''}
        </span>
      </div>
      {passwordStrength.feedback.length > 0 && (
        <div className="text-xs text-gray-600">
          <p>Password should include:</p>
          <ul className="list-disc list-inside">
            {passwordStrength.feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {confirmPassword && password !== confirmPassword && (
        <p className="text-xs text-red-500">Passwords do not match</p>
      )}
      {confirmPassword && password === confirmPassword && confirmPassword.length > 0 && (
        <div className="flex items-center text-xs text-green-600">
          <CheckCircle size={14} className="mr-1" />
          Passwords match
        </div>
      )}
    </div>
  );
};
