
import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { toast } from 'sonner';
import { QRControlPanel } from './QRControlPanel';
import { QRCodeDisplay } from './QRCodeDisplay';
import { QRInstructions } from './QRInstructions';
import { QRBusinessInfo } from './QRBusinessInfo';
import { QRFooterMessages } from './QRFooterMessages';
import { QRHeader } from './QRHeader';

interface PrintableQRCodeProps {
  businessId: string;
  businessName: string;
  businessAddress?: string;
  businessPhone?: string;
}

export const PrintableQRCode: React.FC<PrintableQRCodeProps> = ({
  businessId,
  businessName,
  businessAddress,
  businessPhone
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  
  const bookingUrl = `${window.location.origin}/book/${businessId}`;
  
  useEffect(() => {
    if (canvasRef.current && businessId) {
      QRCode.toCanvas(canvasRef.current, bookingUrl, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
          toast.error('Failed to generate QR code');
        } else {
          setQrGenerated(true);
        }
      });
    }
  }, [bookingUrl, businessId]);

  const handlePrint = () => {
    if (!qrGenerated) {
      toast.error('QR code is still loading');
      return;
    }
    window.print();
  };

  const handleDownload = () => {
    if (canvasRef.current && qrGenerated) {
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().split('T')[0];
      link.download = `${businessName}-booking-qr-${timestamp}.png`;
      link.href = canvasRef.current.toDataURL('image/png', 1.0);
      link.click();
      toast.success('QR code downloaded successfully');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Book ${businessName}`,
          text: `Scan to book services with ${businessName}`,
          url: bookingUrl,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(bookingUrl);
        toast.success('Booking URL copied to clipboard');
      } catch (error) {
        toast.error('Failed to copy URL');
      }
    }
  };

  return (
    <div className="space-y-6">
      <QRControlPanel
        qrGenerated={qrGenerated}
        onPrint={handlePrint}
        onDownload={handleDownload}
        onShare={handleShare}
      />

      <div 
        ref={printRef}
        className="print-container bg-white border-2 border-gray-200 rounded-lg p-8 max-w-4xl mx-auto"
        style={{
          pageBreakInside: 'avoid',
          minHeight: '297mm',
          maxWidth: '210mm'
        }}
      >
        <QRHeader businessName={businessName} />
        
        <QRCodeDisplay canvasRef={canvasRef} qrGenerated={qrGenerated} />
        
        <QRInstructions />
        
        <QRBusinessInfo 
          businessAddress={businessAddress}
          businessPhone={businessPhone}
        />
        
        <QRFooterMessages businessName={businessName} />

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            Can't scan? Visit this link:
          </p>
          <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
            {bookingUrl}
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .print-container, .print-container * {
              visibility: visible;
            }
            .print-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 20px !important;
              border: none !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              page-break-inside: avoid;
            }
            @page {
              margin: 0.5in;
              size: auto;
            }
          }
        `
      }} />
    </div>
  );
};
