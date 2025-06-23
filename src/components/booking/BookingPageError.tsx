
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingPageErrorProps {
  type: 'invalid-format' | 'not-found' | 'no-business-id';
  businessId?: string;
  errorMessage?: string;
}

export const BookingPageError: React.FC<BookingPageErrorProps> = ({
  type,
  businessId,
  errorMessage
}) => {
  const navigate = useNavigate();

  const getErrorContent = () => {
    switch (type) {
      case 'invalid-format':
        return {
          title: 'Invalid Booking Link',
          description: 'The booking link format is incorrect.',
          details: (
            <div className="bg-red-50 p-4 rounded-lg text-sm mb-4">
              <p><strong>Error Details:</strong></p>
              <p>Invalid business ID format: {businessId}</p>
              <p>Expected: Valid UUID format</p>
            </div>
          )
        };
      case 'not-found':
        return {
          title: 'Business Not Available',
          description: errorMessage || 'The business you are looking for is not available.',
          details: (
            <div className="bg-yellow-50 p-4 rounded-lg text-sm mb-4">
              <p><strong>Troubleshooting Info:</strong></p>
              <p>Business ID: {businessId}</p>
              <p>Error: {errorMessage}</p>
              <p>Time: {new Date().toISOString()}</p>
            </div>
          )
        };
      case 'no-business-id':
        return {
          title: 'Invalid Booking Link',
          description: 'No business ID provided in the URL.',
          details: null
        };
    }
  };

  const { title, description, details } = getErrorContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
        {details}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/discover')}
            className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse All Businesses
          </button>
          <button
            onClick={() => navigate('/')}
            className="block w-full text-gray-600 hover:text-gray-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};
