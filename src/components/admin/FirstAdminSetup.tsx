
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const FirstAdminSetup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateFirstAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase.rpc('assign_admin_role', {
        _user_email: email.trim()
      });
      
      if (error) {
        if (error.message.includes('not found')) {
          toast.error('User not found. Please make sure the user has signed up first.');
        } else {
          toast.error(error.message);
        }
      } else {
        setSuccess(true);
        toast.success('First admin user created successfully!');
        setEmail('');
      }
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast.error('Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-green-700">Admin Created Successfully!</CardTitle>
          <CardDescription>
            The first admin user has been created. You can now sign in with admin privileges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="w-full bg-royal-red hover:bg-royal-red/90"
          >
            Go to Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Shield className="h-12 w-12 text-royal-red mx-auto mb-4" />
        <CardTitle>Create First Admin</CardTitle>
        <CardDescription>
          Set up the first administrator account for your Boinvit system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> The user must already have a registered account. 
            This tool assigns admin privileges to an existing user account.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleCreateFirstAdmin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">User Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="Enter the email of the user to make admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-royal-red hover:bg-royal-red/90"
            disabled={loading || !email.trim()}
          >
            {loading ? 'Creating Admin...' : 'Create First Admin'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account yet?{' '}
            <a href="/auth" className="text-royal-red hover:underline">
              Sign up first
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
