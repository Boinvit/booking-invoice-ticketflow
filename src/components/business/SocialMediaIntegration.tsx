
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, ExternalLink, Share2 } from 'lucide-react';

interface SocialMediaIntegrationProps {
  businessId?: string;
  onSave?: (socialLinks: any) => void;
}

export const SocialMediaIntegration = ({ businessId, onSave }: SocialMediaIntegrationProps) => {
  const [socialLinks, setSocialLinks] = React.useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    website: ''
  });

  const socialPlatforms = [
    {
      name: 'facebook',
      label: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      placeholder: 'https://facebook.com/yourbusiness',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'instagram',
      label: 'Instagram',
      icon: <Instagram className="h-4 w-4" />,
      placeholder: 'https://instagram.com/yourbusiness',
      color: 'bg-pink-100 text-pink-800'
    },
    {
      name: 'twitter',
      label: 'X (Twitter)',
      icon: <Twitter className="h-4 w-4" />,
      placeholder: 'https://twitter.com/yourbusiness',
      color: 'bg-gray-100 text-gray-800'
    },
    {
      name: 'youtube',
      label: 'YouTube',
      icon: <Youtube className="h-4 w-4" />,
      placeholder: 'https://youtube.com/@yourbusiness',
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      placeholder: 'https://linkedin.com/company/yourbusiness',
      color: 'bg-blue-100 text-blue-900'
    }
  ];

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(socialLinks);
    }
  };

  const generateShareableContent = () => {
    return {
      text: "Book amazing transport services with us! 🚌✈️🚆",
      url: `${window.location.origin}/booking/${businessId}`,
      hashtags: ["Transport", "Booking", "Travel2025"]
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Social Media & Marketing (2025)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Connect your social media accounts to promote your transport services and engage with customers
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="space-y-2">
              <Label className="flex items-center gap-2">
                {platform.icon}
                {platform.label}
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder={platform.placeholder}
                  value={socialLinks[platform.name as keyof typeof socialLinks]}
                  onChange={(e) => handleSocialLinkChange(platform.name, e.target.value)}
                />
                {socialLinks[platform.name as keyof typeof socialLinks] && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(socialLinks[platform.name as keyof typeof socialLinks], '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium mb-3">Quick Share Options</h4>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => (
              <Button
                key={`share-${platform.name}`}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const content = generateShareableContent();
                  let shareUrl = '';
                  
                  switch (platform.name) {
                    case 'facebook':
                      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(content.url)}`;
                      break;
                    case 'twitter':
                      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}&url=${encodeURIComponent(content.url)}`;
                      break;
                    case 'linkedin':
                      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content.url)}`;
                      break;
                  }
                  
                  if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                  }
                }}
              >
                {platform.icon}
                Share on {platform.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Marketing Benefits</h4>
          <div className="space-y-1 text-sm text-green-800">
            <div>• Increase bookings by up to 40% with social media presence</div>
            <div>• Build customer trust through reviews and testimonials</div>
            <div>• Showcase your transport fleet and services</div>
            <div>• Engage with customers for repeat business</div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Social Media Settings
        </Button>
      </CardContent>
    </Card>
  );
};
