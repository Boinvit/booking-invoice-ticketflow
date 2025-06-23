
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Printer, Share2 } from 'lucide-react';

interface QRControlPanelProps {
  qrGenerated: boolean;
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export const QRControlPanel: React.FC<QRControlPanelProps> = ({
  qrGenerated,
  onPrint,
  onDownload,
  onShare
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={onPrint} disabled={!qrGenerated}>
            <Printer className="w-4 h-4 mr-2" />
            Print QR Code
          </Button>
          <Button onClick={onDownload} variant="outline" disabled={!qrGenerated}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={onShare} variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
