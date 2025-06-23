
import React from 'react';

interface QRBusinessInfoProps {
  businessAddress?: string;
  businessPhone?: string;
}

export const QRBusinessInfo: React.FC<QRBusinessInfoProps> = ({
  businessAddress,
  businessPhone
}) => {
  if (!businessAddress && !businessPhone) {
    return null;
  }

  return (
    <div className="text-center mb-8">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
        {businessAddress && (
          <p className="text-gray-700 mb-1">📍 {businessAddress}</p>
        )}
        {businessPhone && (
          <p className="text-gray-700">📞 {businessPhone}</p>
        )}
      </div>
    </div>
  );
};
