
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase.js';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!mounted) return;

        if (error) console.error('Session error:', error);

        setSession(data?.session ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Auth initialization error:', error);
        if (mounted) setLoading(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) setSession(session);
      }
    );

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    supabaseConfigured,

    signUp: (fullName, email, password) => {
      if (!supabase) return Promise.resolve({
        data: null,
        error: new Error('Supabase is not configured.')
      });

      return supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
    },

    signIn: (email, password) => {
      if (!supabase) return Promise.resolve({
        data: null,
        error: new Error('Supabase is not configured.')
      });

      return supabase.auth.signInWithPassword({ email, password });
    },

    signOut: () => {
      if (!supabase) return Promise.resolve({
        error: new Error('Supabase is not configured.')
      });

      return supabase.auth.signOut();
    },

    sendReset: (email) => {
      if (!supabase) return Promise.resolve({
        error: new Error('Supabase is not configured.')
      });

      return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
    },

    updatePassword: (password) => {
      if (!supabase) return Promise.resolve({
        error: new Error('Supabase is not configured.')
      });

      return supabase.auth.updateUser({ password });
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
