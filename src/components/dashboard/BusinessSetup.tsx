
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BusinessSetupWizard } from '@/components/onboarding/BusinessSetupWizard';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Phone, Mail, MapPin } from 'lucide-react';

export const BusinessSetup = () => {
  const { user } = useAuth();

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

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  // Show wizard for new users
  if (!business) {
    return <BusinessSetupWizard />;
  }

  // Show business summary for existing users
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome to {business.name}!</CardTitle>
              <CardDescription>Your business is all set up and ready to accept bookings.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Booking URL
              </Label>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-mono text-sm text-blue-800">
                  {business.subdomain}.boinvit.com
                </p>
              </div>
            </div>
            
            {business.email && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <p className="p-3 bg-gray-50 rounded-lg">{business.email}</p>
              </div>
            )}
            
            {business.phone && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                <p className="p-3 bg-gray-50 rounded-lg">{business.phone}</p>
              </div>
            )}
            
            {(business.city || business.country) && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <p className="p-3 bg-gray-50 rounded-lg">
                  {[business.city, business.country].filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </div>
          
          {business.description && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Description</Label>
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{business.description}</p>
            </div>
          )}
          
          <div className="flex items-center gap-2 pt-4 border-t">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Business Active
            </Badge>
            <Badge variant="outline">
              Ready for Bookings
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
