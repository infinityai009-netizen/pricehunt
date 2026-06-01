'use client';

import { useEffect, useState } from 'react';
import { login, popPendingUrl } from '@/lib/authClient';

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'choose' | 'email'>('choose');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const onOpen = () => { setOpen(true); setMode('choose'); };
    window.addEventListener('open-login-modal', onOpen);
    return () => window.removeEventListener('open-login-modal', onOpen);
  }, []);

  function close() {
    setOpen(false);
    setEmail('');
    setName('');
    setMode('choose');
  }

  function finishLogin(provider: 'google' | 'facebook' | 'email', userName: string, userEmail: string) {
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}&backgroundColor=2563eb`;
    login({ name: userName, email: userEmail, avatar, provider });
    close();
    // Redirect to retailer if a click triggered the modal
    const pending = popPendingUrl();
    if (pending) window.open(pending, '_blank', 'noopener,noreferrer,sponsored');
  }

  function fakeOAuth(provider: 'google' | 'facebook') {
    // For now we generate a plausible demo identity. Real OAuth will replace this.
    const demoNames = ['Alex Smith', 'Sarah Patel', 'Jordan Khan', 'Chris Lee'];
    const n = demoNames[Math.floor(Math.random() * demoNames.length)];
    const e = `${n.split(' ')[0].toLowerCase()}@${provider === 'google' ? 'gmail.com' : 'facebook.com'}`;
    finishLogin(provider, n, e);
  }

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    finishLogin('email', name.trim(), email.trim());
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={close}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-slate-100 grid place-items-center text-slate-500"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-block text-2xl font-bold text-brand-600">PriceHunt</div>
          <h2 className="mt-2 text-xl font-semibold">Sign in to continue</h2>
          <p className="text-sm text-slate-500 mt-1">
            Login to compare prices and visit retailers
          </p>
        </div>

        {mode === 'choose' && (
          <div className="space-y-3">
            <button
              onClick={() => fakeOAuth('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.95a6.59 6.59 0 0 1 4.58 1.78l3.27-3.27A11.91 11.91 0 0 0 12 0 12 12 0 0 0 1.31 6.62z" />
                <path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.05a7.1 7.1 0 0 1-6.71-4.81l-3.99 3.09A12 12 0 0 0 12 24a11.46 11.46 0 0 0 7.83-3z" />
                <path fill="#4A90E2" d="M19.83 21A11.78 11.78 0 0 0 24 11.84a13.49 13.49 0 0 0-.22-2.6H12v5h6.76A5.78 5.78 0 0 1 16.04 18z" />
                <path fill="#FBBC05" d="M5.29 14.24a7.13 7.13 0 0 1 0-4.48L1.31 6.62a12 12 0 0 0 0 10.76z" />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => fakeOAuth('facebook')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07" />
              </svg>
              Continue with Facebook
            </button>

            <button
              onClick={() => setMode('email')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Continue with Email
            </button>

            <p className="text-xs text-slate-400 text-center pt-3">
              By signing in, you agree to our Terms &amp; Privacy Policy.
            </p>
          </div>
        )}

        {mode === 'email' && (
          <form onSubmit={submitEmail} className="space-y-4">
            <button
              type="button"
              onClick={() => setMode('choose')}
              className="text-sm text-brand-600 hover:underline"
            >
              ← Back
            </button>
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="John Doe"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
