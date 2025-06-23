
<<<<<<< HEAD
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.boinvit.booking',
  appName: 'Boinvit - Business Booking',
  webDir: 'dist',
  server: {
    url: 'https://02979c8d-0d51-4131-ae95-27a440da9a8d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff'
=======
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
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
    }
  }
};

export default config;
