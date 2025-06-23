
import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { toast } from 'sonner';

export const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored');
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Connection lost. Some features may not work.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <WifiOff className="h-4 w-4" />
      <span className="text-sm">No internet connection</span>
    </div>
  );
};
