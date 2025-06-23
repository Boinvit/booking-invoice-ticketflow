
import { useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  customMessage?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback((
    error: Error | string | unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      customMessage
    } = options;

    let errorMessage = customMessage || 'An unexpected error occurred';
    
    if (typeof error === 'string') {
      errorMessage = customMessage || error;
    } else if (error instanceof Error) {
      errorMessage = customMessage || error.message;
    }

    if (logError) {
      console.error('Error handled:', error);
    }

    if (showToast) {
      toast.error(errorMessage);
    }

    return errorMessage;
  }, []);

  const handleAsyncError = useCallback(async (
    asyncFn: () => Promise<any>,
    options: ErrorHandlerOptions = {}
  ) => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, options);
      throw error;
    }
  }, [handleError]);

  return { handleError, handleAsyncError };
};
