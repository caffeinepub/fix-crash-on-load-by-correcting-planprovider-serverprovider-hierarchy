import { AuthUser, AuthSession, AUTH_STORAGE_KEY, SESSION_STORAGE_KEY } from './authTypes';

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function isValidEmail(email: string): boolean {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
  return gmailRegex.test(email);
}

function getUsers(): Record<string, AuthUser> {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, AuthUser>): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
}

export function signup(email: string, password: string, confirmPassword: string): { success: boolean; error?: string } {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid Gmail address' };
  }
  
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }
  
  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match' };
  }
  
  const users = getUsers();
  
  if (users[email.toLowerCase()]) {
    return { success: false, error: 'An account with this email already exists' };
  }
  
  users[email.toLowerCase()] = {
    email: email.toLowerCase(),
    passwordHash: hashPassword(password),
    createdAt: Date.now()
  };
  
  saveUsers(users);
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid Gmail address' };
  }
  
  const users = getUsers();
  const user = users[email.toLowerCase()];
  
  if (!user || user.passwordHash !== hashPassword(password)) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  const session: AuthSession = {
    email: email.toLowerCase(),
    loginTime: Date.now()
  };
  
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return { success: true };
}

export function logout(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function getCurrentSession(): AuthSession | null {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
