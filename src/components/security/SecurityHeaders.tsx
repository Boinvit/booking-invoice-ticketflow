
import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Set security headers via meta tags where possible
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Content Security Policy
    setMetaTag('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://api.paystack.co https://*.supabase.co wss://*.supabase.co; " +
      "font-src 'self' data:; " +
      "frame-src https://js.paystack.co;"
    );

    // Prevent clickjacking
    setMetaTag('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    setMetaTag('X-Content-Type-Options', 'nosniff');

    // XSS Protection
    setMetaTag('X-XSS-Protection', '1; mode=block');

    // Referrer Policy
    setMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy
    setMetaTag('Permissions-Policy', 
      'camera=(), microphone=(), geolocation=(self), payment=(self)'
    );

    return () => {
      // Cleanup is not necessary for meta tags as they should persist
    };
  }, []);

  return null; // This component doesn't render anything
};
