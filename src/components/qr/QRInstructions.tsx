
import React from 'react';

export const QRInstructions: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">
          📋 How to Book:
        </h3>
        <div className="text-left space-y-2 text-blue-800 max-w-md mx-auto">
          <p>1. 📱 Open your camera app</p>
          <p>2. 🎯 Point at the QR code</p>
          <p>3. 👆 Tap the notification</p>
          <p>4. ✅ Select your service & book!</p>
        </div>
      </div>
    </div>
  );
};
