<<<<<<< HEAD

import React from 'react';
import { useBusinessSettings } from '@/hooks/useBusinessSettings';
import { BusinessSettingsContainer } from '@/components/settings/business/BusinessSettingsContainer';
import { BusinessSettingsForm } from '@/components/settings/business/BusinessSettingsForm';

export const BusinessSettings = () => {
  const {
    business,
    isLoading,
    errors,
    isUpdating,
    handleSubmit
  } = useBusinessSettings();

  return (
    <BusinessSettingsContainer isLoading={isLoading} business={business}>
      <BusinessSettingsForm
        business={business}
        errors={errors}
        isLoading={isUpdating}
        onSubmit={handleSubmit}
      />
    </BusinessSettingsContainer>
=======
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const BusinessSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
    website: '',
  });

  const { data: business } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Use useEffect to handle data updates instead of onSuccess
  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || '',
        description: business.description || '',
        phone: business.phone || '',
        email: business.email || '',
        address: business.address || '',
        city: business.city || '',
        country: business.country || '',
        website: business.website || '',
      });
    }
  }, [business]);

  const updateBusinessMutation = useMutation({
    mutationFn: async (updatedData: typeof formData) => {
      if (!business) throw new Error('No business found');
      
      const { data, error } = await supabase
        .from('businesses')
        .update(updatedData)
        .eq('id', business.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Business settings updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['user-business'] });
    },
    onError: (error) => {
      toast.error('Failed to update business settings: ' + error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateBusinessMutation.mutateAsync(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!business) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No business found. Please set up your business first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Business Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell customers about your business..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contact@yourbusiness.com"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourbusiness.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Business St"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="United States"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading || updateBusinessMutation.isPending}>
            {isLoading ? 'Updating...' : 'Update Business Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
  );
};
