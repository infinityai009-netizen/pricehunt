'use client';

import { useEffect, useState } from 'react';

const KEY = 'pricehunt-cookie-consent-v1';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.localStorage.getItem(KEY)) {
      // Show after a tiny delay so it doesn't pop instantly on first paint
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function set(value: 'all' | 'essential') {
    window.localStorage.setItem(KEY, value);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🍪</div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">We use cookies</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              We use essential cookies to make the site work, and analytics to understand how shoppers use it.
              Affiliate links may earn us a commission — at no cost to you.{' '}
              <a href="/privacy" className="text-emerald-600 hover:underline">Privacy policy</a>.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => set('all')}
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold hover:opacity-90"
              >
                Accept all
              </button>
              <button
                onClick={() => set('essential')}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold hover:bg-slate-50"
              >
                Essential only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
