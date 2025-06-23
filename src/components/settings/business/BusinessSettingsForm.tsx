
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { BusinessLogoUpload } from '@/components/business/BusinessLogoUpload';

interface BusinessSettingsFormProps {
  business: any;
  errors: any;
  isLoading: boolean;
  onSubmit: (formData: FormData) => void;
}

export const BusinessSettingsForm: React.FC<BusinessSettingsFormProps> = ({
  business,
  errors,
  isLoading,
  onSubmit
}) => {
  const [logoUrl, setLogoUrl] = React.useState(business?.logo_url || null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Include logo URL in form data
    if (logoUrl) {
      formData.append('logo_url', logoUrl);
    }
    
    onSubmit(formData);
  };

  const handleLogoUpdate = (newLogoUrl: string | null) => {
    setLogoUrl(newLogoUrl);
  };

  if (!business) {
    return <LoadingSkeleton lines={6} />;
  }

  return (
    <div className="space-y-8">
      {/* Business Logo Section */}
      <BusinessLogoUpload 
        business={business} 
        onLogoUpdate={handleLogoUpdate}
      />

      {/* Business Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Business Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={business.name || ''}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={business.email || ''}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Business Phone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={business.phone || ''}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              defaultValue={business.website || ''}
              placeholder="https://example.com"
              className={errors.website ? 'border-red-500' : ''}
            />
            {errors.website && (
              <p className="text-sm text-red-600 mt-1">{errors.website}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={business.description || ''}
              placeholder="Describe your business and services..."
              className={errors.description ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              name="address"
              defaultValue={business.address || ''}
              placeholder="Enter your full business address..."
              className={errors.address ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              defaultValue={business.city || ''}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              defaultValue={business.country || ''}
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && (
              <p className="text-sm text-red-600 mt-1">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};
