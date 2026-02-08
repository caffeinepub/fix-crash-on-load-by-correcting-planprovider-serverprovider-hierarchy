const PLAN_STORAGE_KEY = 'auracloud_user_plans';

export function getUserPlan(email: string): string {
  try {
    const data = localStorage.getItem(PLAN_STORAGE_KEY);
    const plans: Record<string, string> = data ? JSON.parse(data) : {};
    return plans[email] || 'free';
  } catch {
    return 'free';
  }
}

export function setUserPlan(email: string, planId: string): void {
  try {
    const data = localStorage.getItem(PLAN_STORAGE_KEY);
    const plans: Record<string, string> = data ? JSON.parse(data) : {};
    plans[email] = planId;
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save plan:', error);
  }
}
