
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Globe, Smartphone, Wifi } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeTesterProps {
  businessId: string;
  businessName: string;
}

export const QRCodeTester: React.FC<QRCodeTesterProps> = ({
  businessId,
  businessName
}) => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const testUrls = [
    { name: 'Direct Booking', url: `https://boinvit.com/book/${businessId}`, type: 'primary' },
    { name: 'Services Page', url: 'https://boinvit.com/services', type: 'fallback' },
    { name: 'Landing Page', url: 'https://boinvit.com', type: 'base' },
    { name: 'Custom URL', url: customUrl, type: 'custom' }
  ];

  const runConnectivityTests = async () => {
    setIsRunning(true);
    const results = [];

    for (const testUrl of testUrls) {
      if (testUrl.type === 'custom' && !customUrl) continue;

      try {
        const startTime = Date.now();
        const response = await fetch(testUrl.url, {
          method: 'HEAD',
          mode: 'no-cors' // Avoid CORS issues for testing
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        results.push({
          name: testUrl.name,
          url: testUrl.url,
          status: 'success',
          responseTime,
          type: testUrl.type
        });
      } catch (error) {
        results.push({
          name: testUrl.name,
          url: testUrl.url,
          status: 'error',
          error: error.message,
          type: testUrl.type
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);
    toast.success('Connectivity tests completed');
  };

  const testMobileResponsiveness = (url: string) => {
    // Open URL with mobile user agent simulation
    const mobileTestUrl = `https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(url)}`;
    window.open(mobileTestUrl, '_blank');
    toast.info('Opening Google Mobile-Friendly Test');
  };

  const testSSL = (url: string) => {
    const sslTestUrl = `https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(url.replace('https://', ''))}`;
    window.open(sslTestUrl, '_blank');
    toast.info('Opening SSL Labs Test');
  };

  const generateDiagnosticReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      businessId,
      businessName,
      testResults,
      userAgent: navigator.userAgent,
      connectionType: (navigator as any).connection?.effectiveType || 'unknown'
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-diagnostic-${businessId}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Diagnostic report downloaded');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          QR Code Connectivity Tester
        </CardTitle>
        <p className="text-sm text-gray-600">
          Test your QR code URLs for accessibility and performance issues
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Test custom URL (optional)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={runConnectivityTests} 
            disabled={isRunning}
            variant="outline"
          >
            {isRunning ? 'Testing...' : 'Run Tests'}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Test Results:</h4>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  {result.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="font-medium">{result.name}</span>
                  <Badge variant={result.type === 'primary' ? 'default' : 'secondary'}>
                    {result.type}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {result.status === 'success' 
                    ? `${result.responseTime}ms` 
                    : result.error}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button 
            onClick={() => testMobileResponsiveness(`https://boinvit.com/book/${businessId}`)}
            variant="outline"
            size="sm"
          >
            <Smartphone className="w-4 h-4 mr-1" />
            Mobile Test
          </Button>
          
          <Button 
            onClick={() => testSSL('https://boinvit.com')}
            variant="outline"
            size="sm"
          >
            <Globe className="w-4 h-4 mr-1" />
            SSL Test
          </Button>
          
          <Button 
            onClick={generateDiagnosticReport}
            variant="outline"
            size="sm"
            disabled={testResults.length === 0}
          >
            Download Report
          </Button>
        </div>

        <div className="bg-amber-50 p-3 rounded text-sm">
          <p><strong>🔍 Common Issues & Solutions:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>404 Errors:</strong> Check if booking page route exists</li>
            <li><strong>Slow Loading:</strong> Optimize images and reduce bundle size</li>
            <li><strong>Mobile Issues:</strong> Test responsive design on actual devices</li>
            <li><strong>SSL Problems:</strong> Ensure certificate is valid and up-to-date</li>
            <li><strong>QR Not Scanning:</strong> Increase size and error correction level</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
