
import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, profile?: UserProfile) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    console.log('Setting up auth state listener...');
    
=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
<<<<<<< HEAD

        // Handle email confirmation
        if (event === 'SIGNED_IN' && session?.user && !session.user.email_confirmed_at) {
          console.log('User signed in but email not confirmed yet');
        }
        
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          console.log('User signed in with confirmed email:', session.user.email);
        }
=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

<<<<<<< HEAD
    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
=======
    return () => subscription.unsubscribe();
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
  }, []);

  const signUp = async (email: string, password: string, profile?: UserProfile) => {
    setLoading(true);
    try {
<<<<<<< HEAD
      console.log('Attempting sign up for:', email, 'with profile:', profile);
      
      const redirectUrl = `${window.location.origin}/`;
      
      // Use Supabase's default email confirmation flow
=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
<<<<<<< HEAD
          emailRedirectTo: redirectUrl,
=======
          emailRedirectTo: `${window.location.origin}/auth/callback`,
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
          data: profile ? {
            first_name: profile.firstName,
            last_name: profile.lastName,
          } : undefined,
        },
      });
<<<<<<< HEAD
      
      console.log('Sign up result:', { data, error });
      
      if (error) {
        console.error('Sign up error:', error);
        return { data, error };
      }

      if (data.user && !data.session) {
        console.log('User created successfully, confirmation email sent to:', email);
      }

      return { data, error };
    } catch (error) {
      console.error('Unexpected error in signUp:', error);
=======
      return { data, error };
    } catch (error) {
      console.error('Error in signUp:', error);
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
<<<<<<< HEAD
      console.log('Attempting sign in for:', email);
=======
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
<<<<<<< HEAD
      
      console.log('Sign in result:', { data, error });
      
      if (error) {
        console.error('Sign in error:', error);
        // Enhanced error handling
        if (error.message.includes('Invalid login credentials')) {
          return { data, error: { ...error, message: 'Invalid email or password. Please check your credentials and try again.' } };
        } else if (error.message.includes('Email not confirmed')) {
          return { data, error: { ...error, message: 'Please check your email and click the confirmation link before signing in.' } };
        } else if (error.message.includes('Too many requests')) {
          return { data, error: { ...error, message: 'Too many sign-in attempts. Please wait a moment and try again.' } };
        } else if (error.message.includes('User not found')) {
          return { data, error: { ...error, message: 'No account found with this email address. Please sign up first.' } };
        }
        return { data, error };
      }

      if (data.user && data.session) {
        console.log('Sign in successful for:', data.user.email);
      }

      return { data, error };
    } catch (error) {
      console.error('Unexpected error in signIn:', error);
=======
      return { data, error };
    } catch (error) {
      console.error('Error in signIn:', error);
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
      console.log('Attempting sign out');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sign out successful');
=======
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
<<<<<<< HEAD
      console.log('Attempting password reset for:', email);
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });
      console.log('Password reset result:', { data, error });
=======
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
>>>>>>> da6cc44b25145eca0863c1da635025fac07357ca
      return { data, error };
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
