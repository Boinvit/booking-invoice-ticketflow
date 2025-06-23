
import React from 'react';

interface QRFooterMessagesProps {
  businessName: string;
}

export const QRFooterMessages: React.FC<QRFooterMessagesProps> = ({
  businessName
}) => {
  return (
    <div className="text-center space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          🎉 WELCOME!
        </h3>
        <p className="text-green-700">
          We're excited to serve you with excellent service
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-2xl font-bold text-yellow-700 mb-2">
          🙏 THANK YOU
        </h3>
        <p className="text-yellow-700">
          For choosing {businessName} - Your satisfaction is our priority
        </p>
      </div>
    </div>
  );
};
