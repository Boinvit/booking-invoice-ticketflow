
import React, { useState } from 'react';
import { useUserRoles } from '@/hooks/useUserRoles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Users, UserPlus } from 'lucide-react';
import { UserManagement } from './UserManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AdminPanel = () => {
  const { isAdmin, assignAdmin, assigningAdmin } = useUserRoles();
  const [emailToPromote, setEmailToPromote] = useState('');

  const handleAssignAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailToPromote.trim()) return;
    
    assignAdmin(emailToPromote.trim());
    setEmailToPromote('');
  };

  if (!isAdmin) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You need admin privileges to access this panel.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="management" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="management">User Management</TabsTrigger>
          <TabsTrigger value="settings">Admin Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="management">
          <UserManagement />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-royal-red" />
                <CardTitle>Admin Settings</CardTitle>
              </div>
              <CardDescription>
                Manage administrative functions and user roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  You have admin privileges. Use these tools responsibly.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-royal-red" />
                  <h3 className="text-lg font-semibold">Assign Admin Role</h3>
                </div>
                
                <form onSubmit={handleAssignAdmin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">User Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="Enter user email to make admin"
                      value={emailToPromote}
                      onChange={(e) => setEmailToPromote(e.target.value)}
                      disabled={assigningAdmin}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-royal-red hover:bg-royal-red/90"
                    disabled={assigningAdmin || !emailToPromote.trim()}
                  >
                    {assigningAdmin ? 'Assigning...' : 'Assign Admin Role'}
                  </Button>
                </form>
                
                <Alert>
                  <AlertDescription className="text-sm">
                    <strong>Note:</strong> The user must have an existing account before you can assign them admin privileges.
                    They need to sign up first using the regular registration process.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
