
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, Building2, Globe, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface BusinessFormData {
  name: string;
  subdomain: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  website: string;
}

export const BusinessSetupWizard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessFormData>({
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

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const createBusinessMutation = useMutation({
    mutationFn: async (businessData: BusinessFormData) => {
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
      toast.success('Business created successfully! Welcome to Boinvit!');
      queryClient.invalidateQueries({ queryKey: ['business'] });
    },
    onError: (error) => {
      toast.error('Failed to create business: ' + error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate subdomain from business name
    if (name === 'name') {
      const subdomain = value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 30);
      setFormData(prev => ({ ...prev, [name]: value, subdomain }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    createBusinessMutation.mutate(formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.subdomain;
      case 2:
        return formData.email || formData.phone;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Building2 className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold">Business Basics</h2>
              <p className="text-gray-600">Let's start with the essentials</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Business Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Amazing Business"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="subdomain">Booking URL *</Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="subdomain"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleInputChange}
                    placeholder="your-business"
                    className="rounded-r-none"
                  />
                  <div className="bg-gray-100 px-3 py-2 border border-l-0 rounded-r-md text-sm text-gray-600">
                    .boinvit.com
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Customers will book at: {formData.subdomain || 'your-business'}.boinvit.com
                </p>
              </div>
              
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell customers what makes your business special..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-gray-600">How can customers reach you?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@yourbusiness.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourbusiness.com"
                className="mt-1"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold">Location Details</h2>
              <p className="text-gray-600">Help customers find you (optional)</p>
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
                  className="mt-1"
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
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Business Street"
                className="mt-1"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Welcome to Boinvit!</h1>
          <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Set Up Your Business</CardTitle>
          <CardDescription>
            Get your business ready to accept bookings in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || createBusinessMutation.isPending}
                className="flex items-center gap-2"
              >
                {createBusinessMutation.isPending ? (
                  'Creating Business...'
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Complete Setup
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
