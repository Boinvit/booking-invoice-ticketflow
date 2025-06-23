import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface BusinessLogoUploadProps {
  business: any;
  onLogoUpdate: (logoUrl: string | null) => void;
}

export const BusinessLogoUpload: React.FC<BusinessLogoUploadProps> = ({
  business,
  onLogoUpdate
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(business?.logo_url || null);
  const { user } = useAuth();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user || !business) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${business.id}-logo-${Date.now()}.${fileExt}`;
      const filePath = `business-logos/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('business-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Failed to upload logo: ' + uploadError.message);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('business-assets')
        .getPublicUrl(filePath);

      // Update business record
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ logo_url: publicUrl })
        .eq('id', business.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        toast.error('Failed to save logo URL');
        return;
      }

      setPreviewUrl(publicUrl);
      onLogoUpdate(publicUrl);
      toast.success('Business logo uploaded successfully!');

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = async () => {
    if (!business || !user) return;

    try {
      // Remove from database
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ logo_url: null })
        .eq('id', business.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        toast.error('Failed to remove logo');
        return;
      }

      // Optionally, delete from storage (commented out to keep file for potential recovery)
      // if (business.logo_url) {
      //   const filePath = business.logo_url.split('/').pop();
      //   await supabase.storage.from('business-assets').remove([`business-logos/${filePath}`]);
      // }

      setPreviewUrl(null);
      onLogoUpdate(null);
      toast.success('Business logo removed successfully!');

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handlePreviewLogo = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          Business Logo
        </CardTitle>
        <p className="text-sm text-gray-600">
          Upload your business logo to display on booking pages and QR codes
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Logo Display */}
        {previewUrl && (
          <div className="text-center">
            <div className="inline-block relative">
              <img 
                src={previewUrl} 
                alt="Business Logo" 
                className="max-w-32 max-h-32 object-contain border-2 border-gray-200 rounded-lg shadow-sm"
              />
              <div className="absolute -top-2 -right-2 space-x-1">
                <Button
                  onClick={handlePreviewLogo}
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0 rounded-full"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  onClick={handleRemoveLogo}
                  size="sm"
                  variant="destructive"
                  className="h-6 w-6 p-0 rounded-full"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Current business logo</p>
          </div>
        )}

        {/* Upload Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="logo-upload">Upload New Logo</Label>
            <div className="mt-2">
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex gap-2">
            <Button
              onClick={() => document.getElementById('logo-upload')?.click()}
              disabled={isUploading}
              variant="outline"
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Choose Logo File'}
            </Button>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">📸 Logo Guidelines:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Format:</strong> PNG, JPG, JPEG, or WebP</li>
            <li>• <strong>Size:</strong> Maximum 5MB file size</li>
            <li>• <strong>Dimensions:</strong> Square format (1:1 ratio) works best</li>
            <li>• <strong>Resolution:</strong> Minimum 200x200px, recommended 500x500px</li>
            <li>• <strong>Background:</strong> Transparent PNG for best results</li>
            <li>• <strong>Usage:</strong> Will appear on booking pages and can be included in QR codes</li>
          </ul>
        </div>

        {/* Logo Usage Info */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✨ Where Your Logo Appears:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Business header on public booking pages</li>
            <li>• Business discovery map listings</li>
            <li>• Email notifications to clients</li>
            <li>• Invoice headers and receipts</li>
            <li>• Future: QR code overlay options</li>
          </ul>
        </div>

        {business?.logo_url && (
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Logo URL: <span className="font-mono break-all">{business.logo_url}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
