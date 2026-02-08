import { ReactNode } from 'react';
import { AuthProvider } from './auth/AuthContext';
import { PlanProvider } from './plans/PlanContext';
import { ServerProvider } from './servers/ServerContext';

/**
 * Centralized provider composition with documented dependency chain.
 * 
 * REQUIRED NESTING ORDER (do not reorder):
 * 1. AuthProvider - provides session/auth state
 * 2. PlanProvider - depends on useAuth() from AuthProvider
 * 3. ServerProvider - depends on usePlan() from PlanProvider
 * 
 * Any component using usePlan() must be rendered inside PlanProvider.
 * Any component using useAuth() must be rendered inside AuthProvider.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PlanProvider>
        <ServerProvider>
          {children}
        </ServerProvider>
      </PlanProvider>
    </AuthProvider>
  );
}
