
import { useCallback } from 'react';

interface SanitizationOptions {
  allowHtml?: boolean;
  maxLength?: number;
  pattern?: RegExp;
}

export const useInputSanitizer = () => {
  const sanitizeText = useCallback((
    input: string, 
    options: SanitizationOptions = {}
  ): string => {
    if (typeof input !== 'string') return '';
    
    let sanitized = input;
    
    // Basic XSS prevention - remove potentially dangerous characters
    if (!options.allowHtml) {
      sanitized = sanitized
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
        .replace(/script/gi, ''); // Remove script tags
    }
    
    // Length validation
    if (options.maxLength && sanitized.length > options.maxLength) {
      sanitized = sanitized.substring(0, options.maxLength);
    }
    
    // Pattern validation
    if (options.pattern && !options.pattern.test(sanitized)) {
      return ''; // Return empty string if pattern doesn't match
    }
    
    // Trim whitespace
    return sanitized.trim();
  }, []);

  const sanitizeEmail = useCallback((email: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = sanitizeText(email, { 
      maxLength: 254,
      pattern: emailPattern 
    });
    return sanitized.toLowerCase();
  }, [sanitizeText]);

  const sanitizePhone = useCallback((phone: string): string => {
    // Remove all non-digit characters except + for international numbers
    const cleaned = phone.replace(/[^\d+]/g, '');
    return sanitizeText(cleaned, { maxLength: 20 });
  }, [sanitizeText]);

  const sanitizeBusinessId = useCallback((businessId: string): string => {
    // UUID pattern validation
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return sanitizeText(businessId, { pattern: uuidPattern });
  }, [sanitizeText]);

  const sanitizeCurrency = useCallback((amount: string): string => {
    // Only allow numbers and decimal point
    const cleaned = amount.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  }, []);

  const validateRequired = useCallback((value: string, fieldName: string): string | null => {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    }
    return null;
  }, []);

  return {
    sanitizeText,
    sanitizeEmail,
    sanitizePhone,
    sanitizeBusinessId,
    sanitizeCurrency,
    validateRequired
  };
};
