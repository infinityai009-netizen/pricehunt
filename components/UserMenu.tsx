'use client';

import { useEffect, useRef, useState } from 'react';
import { getUser, logout, openLoginModal, type User } from '@/lib/authClient';

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refresh = () => setUser(getUser());
    refresh();
    window.addEventListener('auth-changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('auth-changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => openLoginModal()}
        className="text-sm font-medium px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
      >
        Sign in
      </button>
    );
  }

  const initials = user.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm hover:bg-slate-100 rounded-full pl-1 pr-3 py-1"
      >
        <span className="w-7 h-7 rounded-full bg-brand-600 text-white grid place-items-center text-xs font-bold">
          {initials}
        </span>
        <span className="hidden sm:inline font-medium">{user.name.split(' ')[0]}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg overflow-hidden z-30">
          <div className="px-4 py-3 border-b">
            <div className="font-semibold text-sm">{user.name}</div>
            <div className="text-xs text-slate-500 truncate">{user.email}</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">
              Signed in via {user.provider}
            </div>
          </div>
          <button
            onClick={() => { setOpen(false); window.location.href = '/wishlist'; }}
            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2"
          >
            ❤️ My Wishlist
          </button>
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-rose-600 border-t"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
