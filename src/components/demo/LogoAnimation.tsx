
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LogoAnimationProps {
  onComplete?: () => void;
  className?: string;
}

export const LogoAnimation = ({ onComplete, className }: LogoAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWords, setShowWords] = useState(false);

  const words = [
    { text: 'Booking', color: 'text-red-600', delay: 0 },
    { text: 'Invoicing', color: 'text-blue-600', delay: 500 },
    { text: 'Ticketing', color: 'text-blue-700', delay: 1000 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWords(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", className)}>
      {/* Logo */}
      <div className="mb-8 animate-fade-in">
        <img 
          src="/lovable-uploads/307c9897-7d4d-4c72-9525-71af1ea5c02f.png" 
          alt="Boinvit Logo" 
          className="h-24 w-auto animate-scale-in"
        />
      </div>

      {/* Breaking down animation */}
      {showWords && (
        <div className="space-y-4 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in">
            Breaking down Boinvit:
          </div>
          <div className="space-y-3">
            {words.map((word, index) => (
              <div
                key={word.text}
                className={cn(
                  "text-xl font-semibold opacity-0 animate-fade-in",
                  word.color
                )}
                style={{
                  animationDelay: `${word.delay}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {word.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
