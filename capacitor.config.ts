
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
    }
  }
};

export default config;
