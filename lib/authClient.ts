'use client';

// Lightweight client-side auth using localStorage.
// Replace with NextAuth.js + Google OAuth later for real SSO.

export interface User {
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
  loggedInAt: number;
}

const KEY = 'pricehunt-user-v1';
const PENDING_URL_KEY = 'pricehunt-pending-url-v1';

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function login(user: Omit<User, 'loggedInAt'>): void {
  const full: User = { ...user, loggedInAt: Date.now() };
  window.localStorage.setItem(KEY, JSON.stringify(full));
  window.dispatchEvent(new Event('auth-changed'));
}

export function logout(): void {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('auth-changed'));
}

// Stash a URL the user wanted to visit before being asked to log in.
export function setPendingUrl(url: string): void {
  window.localStorage.setItem(PENDING_URL_KEY, url);
}

export function popPendingUrl(): string | null {
  const u = window.localStorage.getItem(PENDING_URL_KEY);
  if (u) window.localStorage.removeItem(PENDING_URL_KEY);
  return u;
}

// Custom event helpers — used to open the login modal from anywhere.
export function openLoginModal(pendingUrl?: string): void {
  if (pendingUrl) setPendingUrl(pendingUrl);
  window.dispatchEvent(new CustomEvent('open-login-modal'));
}
