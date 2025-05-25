
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useState } from 'react';

export default function SettingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: business } = useQuery({
    queryKey: ['business', user?.id],
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

  const { data: currencies } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: paymentGateways } = useQuery({
    queryKey: ['payment-gateways'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_gateways')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: paymentSettings } = useQuery({
    queryKey: ['payment-settings', business?.id],
    queryFn: async () => {
      if (!business?.id) return null;
      const { data, error } = await supabase
        .from('business_payment_settings')
        .select('*')
        .eq('business_id', business.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!business?.id,
  });

  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [enabledGateways, setEnabledGateways] = useState<string[]>([]);

  const updatePaymentSettings = useMutation({
    mutationFn: async (settings: any) => {
      if (!business?.id) throw new Error('No business found');
      
      const { data, error } = await supabase
        .from('business_payment_settings')
        .upsert({
          business_id: business.id,
          default_currency: settings.currency,
          enabled_payment_gateways: settings.gateways,
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Payment settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['payment-settings'] });
    },
    onError: () => {
      toast.error('Failed to update payment settings');
    },
  });

  const handleSavePaymentSettings = () => {
    updatePaymentSettings.mutate({
      currency: selectedCurrency || paymentSettings?.default_currency || 'USD',
      gateways: enabledGateways.length > 0 ? enabledGateways : (paymentSettings?.enabled_payment_gateways || ['stripe']),
    });
  };

  const toggleGateway = (gatewaySlug: string) => {
    const current = enabledGateways.length > 0 ? enabledGateways : (paymentSettings?.enabled_payment_gateways || []);
    if (current.includes(gatewaySlug)) {
      setEnabledGateways(current.filter(g => g !== gatewaySlug));
    } else {
      setEnabledGateways([...current, gatewaySlug]);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Settings</h1>
          <p className="text-gray-600">Manage your business profile and payment settings</p>
        </div>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  defaultValue={business?.name || ''}
                  placeholder="Your business name"
                />
              </div>
              <div>
                <Label htmlFor="subdomain">Subdomain</Label>
                <Input
                  id="subdomain"
                  defaultValue={business?.subdomain || ''}
                  placeholder="your-business"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={business?.email || ''}
                  placeholder="contact@yourbusiness.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  defaultValue={business?.phone || ''}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                defaultValue={business?.address || ''}
                placeholder="123 Business St, City, Country"
              />
            </div>

            <Button>Save Business Information</Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <Select 
                value={selectedCurrency || paymentSettings?.default_currency || 'USD'}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies?.map((currency) => (
                    <SelectItem key={currency.id} value={currency.code}>
                      {currency.name} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Payment Gateways</Label>
              <p className="text-sm text-gray-600 mb-4">Select which payment methods to enable for your customers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentGateways?.map((gateway) => {
                  const isEnabled = enabledGateways.length > 0 
                    ? enabledGateways.includes(gateway.slug)
                    : (paymentSettings?.enabled_payment_gateways || []).includes(gateway.slug);
                  
                  return (
                    <div key={gateway.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={gateway.slug}
                        checked={isEnabled}
                        onCheckedChange={() => toggleGateway(gateway.slug)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={gateway.slug} className="font-medium">
                          {gateway.name}
                        </Label>
                        <p className="text-sm text-gray-600">{gateway.description}</p>
                        <p className="text-xs text-gray-500">
                          Supports: {gateway.supported_currencies?.join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button onClick={handleSavePaymentSettings} disabled={updatePaymentSettings.isPending}>
              {updatePaymentSettings.isPending ? 'Saving...' : 'Save Payment Settings'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
