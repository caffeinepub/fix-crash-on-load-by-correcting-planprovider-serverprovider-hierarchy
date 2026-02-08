import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signup as authSignup, login as authLogin, logout as authLogout, getCurrentSession } from './authStorage';
import { AuthSession } from './authTypes';

interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const currentSession = getCurrentSession();
    setSession(currentSession);
    setIsLoading(false);
  }, []);
  
  const signup = async (email: string, password: string, confirmPassword: string) => {
    const result = authSignup(email, password, confirmPassword);
    if (result.success) {
      const loginResult = authLogin(email, password);
      if (loginResult.success) {
        setSession(getCurrentSession());
      }
    }
    return result;
  };
  
  const login = async (email: string, password: string) => {
    const result = authLogin(email, password);
    if (result.success) {
      setSession(getCurrentSession());
    }
    return result;
  };
  
  const logout = () => {
    authLogout();
    setSession(null);
  };
  
  return (
    <AuthContext.Provider value={{
      session,
      isAuthenticated: !!session,
      isLoading,
      signup,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
