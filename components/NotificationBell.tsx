'use client';

import { useEffect, useRef, useState } from 'react';
import { getNotifications, isRead, markRead, markAllRead, unreadCount, timeAgo, type Notification } from '@/lib/notificationsClient';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const refresh = () => {
      setCount(unreadCount());
      setItems(getNotifications());
    };
    refresh();
    window.addEventListener('notifs-changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('notifs-changed', refresh);
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

  if (!mounted) {
    return (
      <button aria-label="Notifications" className="relative w-9 h-9 rounded-full hover:bg-slate-100 grid place-items-center">
        <BellIcon />
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Notifications"
        onClick={() => setOpen(o => !o)}
        className="relative w-9 h-9 rounded-full hover:bg-slate-100 grid place-items-center"
      >
        <BellIcon />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold grid place-items-center">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border rounded-xl shadow-xl overflow-hidden z-30">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold">Notifications</span>
            {count > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-brand-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                No notifications yet
              </div>
            ) : items.map(n => {
              const read = isRead(n.id);
              return (
                <a
                  key={n.id}
                  href={n.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markRead(n.id)}
                  className={`block px-4 py-3 hover:bg-slate-50 border-b last:border-b-0 ${read ? 'opacity-60' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">{n.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{n.title}</span>
                        {!read && <span className="w-2 h-2 bg-brand-500 rounded-full" />}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.body}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{timeAgo(n.ts)}</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-slate-600">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
