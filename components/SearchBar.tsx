'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ initial = '' }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-2xl mx-auto shadow-sm">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search any product — e.g. iPhone, sofa, baked beans…"
        className="flex-1 px-4 py-3 rounded-l-lg border border-r-0 border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-r-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
      >
        Search
      </button>
    </form>
  );
}
