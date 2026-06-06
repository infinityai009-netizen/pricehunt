'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { login, popPendingUrl } from '@/lib/authClient';

interface ProviderFlags {
  google: boolean;
  facebook: boolean;
  github: boolean;
  email: boolean;
  credentials: boolean;
}

const DEFAULTS: ProviderFlags = {
  google: false, facebook: false, github: false, email: false, credentials: true,
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'choose' | 'email' | 'signup' | 'magic'>('choose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [providers, setProviders] = useState<ProviderFlags>(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  // Fetch which providers are configured at runtime
  useEffect(() => {
    fetch('/api/auth-providers')
      .then(r => r.json())
      .then(setProviders)
      .catch(() => setProviders(DEFAULTS));
  }, []);

  useEffect(() => {
    const onOpen = () => { setOpen(true); reset(); };
    window.addEventListener('open-login-modal', onOpen);
    return () => window.removeEventListener('open-login-modal', onOpen);
  }, []);

  function reset() {
    setMode('choose');
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setLoading(false);
    setMagicSent(false);
  }

  function close() {
    setOpen(false);
    reset();
  }

  // ── OAuth handlers ─────────────────────────────────────────────────────────
  async function oauthSignIn(provider: 'google' | 'facebook' | 'github') {
    setLoading(true);
    setError('');
    if (providers[provider]) {
      // Real OAuth flow — NextAuth handles the redirect
      const pending = popPendingUrl();
      await signIn(provider, { callbackUrl: pending ?? window.location.pathname });
      return;
    }
    // Fallback to localStorage demo
    const demoNames: Record<typeof provider, string[]> = {
      google:   ['Alex Smith', 'Sarah Patel', 'Jordan Khan', 'Chris Lee'],
      facebook: ['Emma Brown', 'Liam Wilson', 'Olivia Davis', 'Noah Garcia'],
      github:   ['Dev User', 'Code Ninja', 'Open Source Fan'],
    };
    const names = demoNames[provider];
    const n = names[Math.floor(Math.random() * names.length)];
    const e = `${n.toLowerCase().replace(' ', '.')}@${provider === 'google' ? 'gmail.com' : provider === 'facebook' ? 'facebook.com' : 'users.noreply.github.com'}`;
    finishLogin(provider, n, e);
  }

  // ── Email + password (credentials) sign-up / sign-in ───────────────────────
  async function emailPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both fields');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name');
      return;
    }
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email: email.trim(),
      password,
      name: name.trim() || email.split('@')[0],
      redirect: false,
    });
    if (result?.error) {
      setError('Sign in failed. Please try again.');
      setLoading(false);
      return;
    }
    finishLogin('email', name.trim() || email.split('@')[0], email.trim());
  }

  // ── Magic link via email ───────────────────────────────────────────────────
  async function magicLinkSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    setError('');
    if (providers.email) {
      await signIn('resend', { email: email.trim(), redirect: false });
      setMagicSent(true);
      setLoading(false);
    } else {
      setError('Email login not configured yet. Use Google or password instead.');
      setLoading(false);
    }
  }

  function finishLogin(provider: 'google' | 'facebook' | 'github' | 'email', userName: string, userEmail: string) {
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}&backgroundColor=2563eb`;
    login({ name: userName, email: userEmail, avatar, provider: provider as any });
    close();
    const pending = popPendingUrl();
    if (pending) window.open(pending, '_blank', 'noopener,noreferrer,sponsored');
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
      onClick={close}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 sm:p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full hover:bg-slate-100 grid place-items-center text-slate-500"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm">
            PriceHunt
          </div>
          <h2 className="mt-4 text-2xl font-extrabold">
            {mode === 'signup' ? 'Create your account' : mode === 'magic' ? 'Check your email' : 'Welcome back'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {mode === 'signup' ? 'Save prices & get drop alerts' :
             mode === 'magic' ? `We've sent a sign-in link to ${email}` :
             'Sign in to track prices and get deal alerts'}
          </p>
        </div>

        {magicSent ? (
          <div className="text-center py-6">
            <div className="text-6xl mb-3">📧</div>
            <p className="text-sm text-slate-700">
              Click the link in the email to sign in.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              You can close this window.
            </p>
          </div>
        ) : mode === 'choose' ? (
          <>
            {/* Social sign-in buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => oauthSignIn('google')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold transition disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.95a6.59 6.59 0 0 1 4.58 1.78l3.27-3.27A11.91 11.91 0 0 0 12 0 12 12 0 0 0 1.31 6.62z" />
                  <path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.05a7.1 7.1 0 0 1-6.71-4.81l-3.99 3.09A12 12 0 0 0 12 24a11.46 11.46 0 0 0 7.83-3z" />
                  <path fill="#4A90E2" d="M19.83 21A11.78 11.78 0 0 0 24 11.84a13.49 13.49 0 0 0-.22-2.6H12v5h6.76A5.78 5.78 0 0 1 16.04 18z" />
                  <path fill="#FBBC05" d="M5.29 14.24a7.13 7.13 0 0 1 0-4.48L1.31 6.62a12 12 0 0 0 0 10.76z" />
                </svg>
                Continue with Google
                {!providers.google && <span className="text-[10px] text-amber-600 font-bold ml-1">DEMO</span>}
              </button>

              <button
                onClick={() => oauthSignIn('facebook')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold transition disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07" />
                </svg>
                Continue with Facebook
                {!providers.facebook && <span className="text-[10px] text-amber-600 font-bold ml-1">DEMO</span>}
              </button>

              {providers.github && (
                <button
                  onClick={() => oauthSignIn('github')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold transition disabled:opacity-50"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.4s2.05.13 3.01.4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 0z"/>
                  </svg>
                  Continue with GitHub
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Email magic link button */}
            {providers.email && (
              <button
                onClick={() => setMode('magic')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold mb-2.5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email me a sign-in link
              </button>
            )}

            {/* Email + password buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setMode('email')}
                className="px-4 py-3 border border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold text-sm"
              >
                Sign in with email
              </button>
              <button
                onClick={() => setMode('signup')}
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90"
              >
                Create account
              </button>
            </div>

            {(!providers.google || !providers.facebook) && (
              <p className="mt-5 text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
                <strong>DEMO badge</strong> means OAuth keys aren't set yet. The button still creates a demo account so you can try the experience.
              </p>
            )}

            <p className="mt-4 text-[11px] text-slate-400 text-center">
              By continuing, you agree to our Terms &amp; Privacy Policy.
            </p>
          </>
        ) : mode === 'magic' ? (
          <form onSubmit={magicLinkSubmit} className="space-y-4">
            <button type="button" onClick={() => setMode('choose')} className="text-sm text-emerald-600 hover:underline mb-2">
              ← Back
            </button>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
                className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            {error && <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send sign-in link'}
            </button>
          </form>
        ) : (
          /* mode === 'email' or 'signup' */
          <form onSubmit={emailPasswordSubmit} className="space-y-4">
            <button type="button" onClick={() => setMode('choose')} className="text-sm text-emerald-600 hover:underline">
              ← Back to options
            </button>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold mb-1.5">Full name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Sarah Patel"
                  autoFocus
                  className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus={mode === 'email'}
                className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {error && <p className="text-xs text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
            </button>

            <p className="text-center text-xs text-slate-500">
              {mode === 'signup' ? (
                <>Already have an account?{' '}
                  <button type="button" onClick={() => setMode('email')} className="text-emerald-600 font-semibold hover:underline">
                    Sign in
                  </button>
                </>
              ) : (
                <>Don't have one yet?{' '}
                  <button type="button" onClick={() => setMode('signup')} className="text-emerald-600 font-semibold hover:underline">
                    Create one
                  </button>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
