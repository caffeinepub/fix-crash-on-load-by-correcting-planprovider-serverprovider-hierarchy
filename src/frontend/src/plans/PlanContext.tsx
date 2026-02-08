import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VPSPlan, PLAN_CATALOG } from './planCatalog';
import { getUserPlan, setUserPlan } from './planStorage';
import { useAuth } from '../auth/AuthContext';

interface PlanContextValue {
  currentPlan: VPSPlan;
  purchasePlan: (planId: string) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<VPSPlan>(PLAN_CATALOG[0]);
  
  useEffect(() => {
    if (session) {
      const planId = getUserPlan(session.email);
      const plan = PLAN_CATALOG.find(p => p.id === planId) || PLAN_CATALOG[0];
      setCurrentPlan(plan);
    } else {
      setCurrentPlan(PLAN_CATALOG[0]);
    }
  }, [session]);
  
  const purchasePlan = (planId: string) => {
    if (!session) return;
    
    const plan = PLAN_CATALOG.find(p => p.id === planId);
    if (plan) {
      setUserPlan(session.email, planId);
      setCurrentPlan(plan);
    }
  };
  
  return (
    <PlanContext.Provider value={{ currentPlan, purchasePlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within PlanProvider');
  }
  return context;
}
