'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

interface User { id: string; name: string; email: string; }
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        const current = data.session?.user;
        setUser(current ? { id: current.id, email: current.email || '', name: String(current.user_metadata?.full_name || current.email?.split('@')[0] || 'Shopper') } : null);
        setReady(true);
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        const current = session?.user;
        setUser(current ? { id: current.id, email: current.email || '', name: String(current.user_metadata?.full_name || current.email?.split('@')[0] || 'Shopper') } : null);
      });
      return () => listener.subscription.unsubscribe();
    }
    try {
      const saved = sessionStorage.getItem('shopnest-user');
      if (saved) setUser(JSON.parse(saved));
    } catch { sessionStorage.removeItem('shopnest-user'); }
    setReady(true);
  }, []);

  const login = async (email: string, password: string) => {
    if (!email.trim() || !password) return { success: false, error: 'Enter your email and password.' };
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      return error ? { success: false, error: error.message } : { success: true };
    }
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const demoUser = { id: 'demo-' + Date.now(), name: email.split('@')[0], email };
    setUser(demoUser);
    sessionStorage.setItem('shopnest-user', JSON.stringify(demoUser));
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password) return { success: false, error: 'Fill in all required fields.' };
    if (password.length < 8) return { success: false, error: 'Use at least 8 characters for your password.' };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() } } });
      if (error) return { success: false, error: error.message };
      if (data.user && !data.session) return { success: false, error: 'Check your email to confirm your account, then sign in.' };
      return { success: true };
    }
    const demoUser = { id: 'demo-' + Date.now(), name: name.trim(), email: email.trim() };
    setUser(demoUser);
    sessionStorage.setItem('shopnest-user', JSON.stringify(demoUser));
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    setUser(null);
    sessionStorage.removeItem('shopnest-user');
  };

  return <AuthContext.Provider value={{ user: ready ? user : null, isAuthenticated: ready && !!user, login, register, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
