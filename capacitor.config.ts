
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4634e4fd7a844269a977830c05f6ad20',
  appName: 'booking-invoice-ticketflow',
  webDir: 'dist',
  server: {
    url: 'https://4634e4fd-7a84-4269-a977-830c05f6ad20.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
