
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, ExternalLink } from 'lucide-react';

export const QRTroubleshootingGuide: React.FC = () => {
  const troubleshootingSteps = [
    {
      category: 'URL Verification',
      level: 'critical',
      steps: [
        'Verify QR contains exact URL: https://boinvit.com/book/[businessId]',
        'Test URL manually on mobile device before printing QR',
        'Check for typos, case sensitivity, and special characters',
        'Ensure businessId parameter is correctly formatted'
      ]
    },
    {
      category: 'QR Code Quality',
      level: 'high',
      steps: [
        'Use high error correction level (H = 30% recovery)',
        'Generate at minimum 500x500px resolution',
        'Print at least 2x2 inches for reliable scanning',
        'Ensure high contrast (black on white background)'
      ]
    },
    {
      category: 'Mobile Compatibility',
      level: 'high',
      steps: [
        'Test on both iOS and Android devices',
        'Verify page is mobile-responsive',
        'Check for console errors in mobile browsers',
        'Test with different QR scanner apps'
      ]
    },
    {
      category: 'Network & Performance',
      level: 'medium',
      steps: [
        'Verify SSL certificate is valid and current',
        'Test page load speed (should be under 3 seconds)',
        'Check for redirect loops or 404 errors',
        'Ensure CDN and caching are properly configured'
      ]
    },
    {
      category: 'Service Worker Issues',
      level: 'medium',
      steps: [
        'Clear browser cache and service worker data',
        'Test in incognito/private browsing mode',
        'Check for cached old versions of the page',
        'Verify service worker is not blocking requests'
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Info className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          QR Code Troubleshooting Guide
        </CardTitle>
        <p className="text-sm text-gray-600">
          Step-by-step guide to diagnose and resolve QR code scanning issues
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {troubleshootingSteps.map((section, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-2">
              {getLevelIcon(section.level)}
              <h4 className="font-medium">{section.category}</h4>
              <Badge variant={getLevelColor(section.level) as any}>
                {section.level}
              </Badge>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-6">
              {section.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">🔧 Quick Testing Tools:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <a 
                href="https://zxing.org/w/decode.jsp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ZXing QR Code Decoder - Test what your QR actually contains
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <a 
                href="https://www.qr-code-generator.com/qr-code-test/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                QR Code Tester - Verify your QR code quality
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <a 
                href="https://search.google.com/test/mobile-friendly" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Mobile-Friendly Test - Check page compatibility
              </a>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">⚠️ Most Common Issues:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-amber-800">
            <li><strong>Wrong URL in QR:</strong> Double-check the generated QR contains the correct booking URL</li>
            <li><strong>Mobile page not loading:</strong> Test your booking page directly on mobile browsers</li>
            <li><strong>Low-quality QR print:</strong> Use high-resolution downloads and print at adequate size</li>
            <li><strong>Service worker cache:</strong> Old cached versions preventing new content from loading</li>
            <li><strong>SSL certificate issues:</strong> Expired or misconfigured HTTPS certificates</li>
          </ol>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">✅ Success Checklist:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
            <li>QR code scans to correct URL on 3+ different devices</li>
            <li>Booking page loads within 3 seconds on mobile</li>
            <li>Page is fully responsive and functional on small screens</li>
            <li>SSL certificate shows as secure (green lock icon)</li>
            <li>No console errors in browser developer tools</li>
            <li>QR code is printed at minimum 2x2 inches with clear contrast</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
