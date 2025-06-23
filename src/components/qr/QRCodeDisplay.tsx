
import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeDisplayProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  qrGenerated: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  canvasRef,
  qrGenerated
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-blue-600">
        {qrGenerated ? (
          <canvas 
            ref={canvasRef} 
            className="block mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : (
          <div className="w-[400px] h-[400px] flex items-center justify-center bg-gray-100 rounded">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Generating QR Code...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
