
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Eye, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState<'users' | 'businesses' | 'clients'>('users');

  // Fetch all businesses for admin view
  const { data: businesses, isLoading: businessesLoading } = useQuery({
    queryKey: ['admin-businesses', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Fetch business owners separately
  const { data: businessOwners } = useQuery({
    queryKey: ['business-owners'],
    queryFn: async () => {
      if (!businesses) return {};
      
      const userIds = businesses.map(b => b.user_id).filter(Boolean);
      if (userIds.length === 0) return {};

      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email')
        .in('id', userIds);
      
      if (error) throw error;
      
      return data.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, any>);
    },
    enabled: !!businesses
  });

  // Fetch all clients across businesses
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['admin-clients', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('clients')
        .select(`
          *,
          businesses(name, user_id)
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleViewBusiness = (businessId: string) => {
    window.open(`/public-booking/${businessId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Management
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users, businesses, or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">All Users</TabsTrigger>
              <TabsTrigger value="businesses">Businesses</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>

            <TabsContent value="businesses" className="mt-6">
              <div className="space-y-4">
                {businessesLoading ? (
                  <div className="text-center py-8">Loading businesses...</div>
                ) : (
                  <div className="grid gap-4">
                    {businesses?.map((business) => {
                      const owner = businessOwners?.[business.user_id];
                      return (
                        <div key={business.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{business.name}</h3>
                                <Badge variant={business.is_active ? 'default' : 'secondary'}>
                                  {business.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                                {business.is_verified && (
                                  <Badge variant="outline">Verified</Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Owner: {owner?.first_name} {owner?.last_name}</p>
                                <p>Email: {owner?.email || business.email}</p>
                                <p>Location: {business.city}, {business.country}</p>
                                {business.phone && <p>Phone: {business.phone}</p>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewBusiness(business.id)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-1" />
                                Manage
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="clients" className="mt-6">
              <div className="space-y-4">
                {clientsLoading ? (
                  <div className="text-center py-8">Loading clients...</div>
                ) : (
                  <div className="grid gap-4">
                    {clients?.map((client) => (
                      <div key={client.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{client.name}</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Email: {client.email}</p>
                              {client.phone && <p>Phone: {client.phone}</p>}
                              <p>Business: {client.businesses?.name}</p>
                              <p>Created: {new Date(client.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <div className="text-center py-8 text-gray-500">
                User management features coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
