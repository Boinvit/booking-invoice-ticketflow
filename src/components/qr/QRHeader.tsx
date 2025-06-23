
import React from 'react';

interface QRHeaderProps {
  businessName: string;
}

export const QRHeader: React.FC<QRHeaderProps> = ({ businessName }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        {businessName}
      </h1>
      <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-2">
        📱 BOOK HERE
      </h2>
      <p className="text-lg md:text-xl text-gray-700">
        Scan QR Code to Book Your Service
      </p>
    </div>
  );
};
