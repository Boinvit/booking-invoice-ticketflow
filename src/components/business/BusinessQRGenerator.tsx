
import React, { useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, QrCode, Copy, ExternalLink, Share2, Link } from 'lucide-react';
import { toast } from 'sonner';

interface BusinessQRGeneratorProps {
  businessId: string;
  businessName: string;
}

export const BusinessQRGenerator: React.FC<BusinessQRGeneratorProps> = ({
  businessId,
  businessName
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use the correct booking URL format
  const bookingUrl = `${window.location.origin}/book/${businessId}`;
  
  React.useEffect(() => {
    if (canvasRef.current && businessId) {
      QRCode.toCanvas(canvasRef.current, bookingUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
          toast.error('Failed to generate QR code');
        }
      });
    }
  }, [bookingUrl, businessId]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${businessName}-booking-qr.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      toast.success('QR code downloaded successfully');
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      toast.success('Booking URL copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const shareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Book ${businessName}`,
          text: `Book services with ${businessName}`,
          url: bookingUrl,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      copyUrl();
    }
  };

  const testBooking = () => {
    window.open(bookingUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="w-5 h-5" />
          Client Booking Access
        </CardTitle>
        <p className="text-sm text-gray-600">
          Multiple ways for clients to book your services
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <canvas 
            ref={canvasRef} 
            className="border rounded-lg shadow-sm"
          />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Booking URL:</p>
          <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
            {bookingUrl}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Button onClick={shareUrl} variant="default" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Booking Link
          </Button>
          
          <Button onClick={copyUrl} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
          
          <Button onClick={downloadQR} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
          
          <Button onClick={testBooking} variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Test Booking
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h5 className="font-medium text-blue-900 mb-2 text-sm">Sharing Options</h5>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Share the link via WhatsApp, SMS, or email</li>
            <li>• Post on social media platforms</li>
            <li>• Print the QR code on business cards</li>
            <li>• Add to your website or email signature</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
