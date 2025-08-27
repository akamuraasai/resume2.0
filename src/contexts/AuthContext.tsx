'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Only redirect on explicit auth events, not on session refreshes
        if (event === 'SIGNED_IN' && pathname === '/login') {
          router.push('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
        // Don't redirect on TOKEN_REFRESHED or other session management events
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}