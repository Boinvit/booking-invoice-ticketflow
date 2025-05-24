
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const BusinessSetup = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
    website: '',
  });

  // Check if user has a business
  const { data: business, isLoading } = useQuery({
    queryKey: ['business', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Create business mutation
  const createBusinessMutation = useMutation({
    mutationFn: async (businessData: typeof formData) => {
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('businesses')
        .insert({
          ...businessData,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Business created successfully!');
      queryClient.invalidateQueries({ queryKey: ['business'] });
    },
    onError: (error) => {
      toast.error('Failed to create business: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBusinessMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (business) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to {business.name}!</CardTitle>
          <CardDescription>Your business is all set up and ready to go.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Business Name</Label>
              <p className="text-lg">{business.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Subdomain</Label>
              <p className="text-lg">{business.subdomain}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Email</Label>
              <p className="text-lg">{business.email || 'Not set'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Phone</Label>
              <p className="text-lg">{business.phone || 'Not set'}</p>
            </div>
          </div>
          {business.description && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Description</Label>
              <p className="text-gray-800">{business.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Set Up Your Business</CardTitle>
        <CardDescription>
          Let's get your business profile set up so you can start accepting bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Business Name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain *</Label>
              <Input
                id="subdomain"
                name="subdomain"
                value={formData.subdomain}
                onChange={handleInputChange}
                placeholder="your-business"
                required
              />
              <p className="text-xs text-gray-500">
                This will be your booking URL: {formData.subdomain}.bookflow.com
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
              />
            </div>
            <div className="space-y-2">
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

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Business St"
            />
          </div>

          <div className="space-y-2">
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={createBusinessMutation.isPending}
          >
            {createBusinessMutation.isPending ? 'Creating Business...' : 'Create Business'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
