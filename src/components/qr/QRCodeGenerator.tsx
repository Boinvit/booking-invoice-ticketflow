
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Copy, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export const QRCodeGenerator = () => {
  const { user } = useAuth();
  const [qrSize, setQrSize] = useState(200);

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!business) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Business Found</h3>
          <p className="text-gray-600">Set up your business first to generate QR codes.</p>
        </CardContent>
      </Card>
    );
  }

  const bookingUrl = `${window.location.origin}/book/${business.subdomain}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(bookingUrl)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrApiUrl;
    link.download = `${business.name}-booking-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR code downloaded!');
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Book with ${business.name}`,
          text: `Scan this QR code to book an appointment with ${business.name}`,
          url: bookingUrl,
        });
      } catch (error) {
        copyToClipboard(bookingUrl);
      }
    } else {
      copyToClipboard(bookingUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="qr-size">QR Code Size</Label>
            <Input
              id="qr-size"
              type="number"
              min="100"
              max="500"
              step="50"
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Booking URL</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={bookingUrl}
                readOnly
                className="bg-gray-50"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(bookingUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={downloadQR} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
            <Button variant="outline" onClick={shareQR} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QR Code Preview</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="inline-block p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
            <img
              src={qrApiUrl}
              alt="QR Code for booking"
              className="mx-auto"
              width={qrSize}
              height={qrSize}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Customers can scan this QR code to book appointments directly
          </p>
          <div className="text-xs text-gray-500 mt-2">
            {business.name} • {bookingUrl}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
