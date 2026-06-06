"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, Clock, TrendingUp, Loader2 } from "lucide-react";

const POPULAR = [
  "iPhone 15 Pro 256GB",
  "Samsung Galaxy S24 Ultra",
  "PlayStation 5 Slim",
  "Sony WH-1000XM5",
  "MacBook Air M3",
  "Dyson Airwrap",
  "Nintendo Switch OLED",
  "Apple Watch Series 9",
  "Air Fryer",
  "Washing Machine",
  "Cravendale Whole Milk",
  "Heinz Baked Beans",
  "Pampers Size 4",
  "Aptamil First Milk",
  "Nike Air Force 1",
  "iPad Pro M2",
  "Samsung 65 QLED TV",
  "BMW 3 Series 2020",
  "EE Unlimited SIM",
  "Sky Stream Broadband",
  "Pizza Hut Meat Feast",
  "Tesla Model 3",
];

const RECENT_KEY = "pricehunt-recent-v1";

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function writeRecent(items: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, 6)));
}

export default function SmartSearchBar({ dark = false }: { dark?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlightIdx(-1);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Live suggestions: filter popular by query
  const suggestions = q.trim().length === 0
    ? []
    : POPULAR.filter(p => p.toLowerCase().includes(q.toLowerCase())).slice(0, 6);

  function doSearch(term: string) {
    const query = term.trim();
    if (!query) return;
    setSearching(true);
    const recentNew = [query, ...recent.filter(r => r.toLowerCase() !== query.toLowerCase())].slice(0, 6);
    setRecent(recentNew);
    writeRecent(recentNew);
    setOpen(false);
    setHighlightIdx(-1);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function clearRecent() {
    setRecent([]);
    writeRecent([]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const items = suggestions.length > 0 ? suggestions : recent;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx(i => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0 && items[highlightIdx]) {
        doSearch(items[highlightIdx]);
      } else {
        doSearch(q);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightIdx(-1);
    }
  }

  // Pick a rotating example placeholder
  const [example, setExample] = useState(POPULAR[0]);
  useEffect(() => {
    const t = setInterval(() => {
      setExample(POPULAR[Math.floor(Math.random() * POPULAR.length)]);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const showDropdown = open && (suggestions.length > 0 || recent.length > 0);

  return (
    <div ref={wrapperRef} className="relative">
      <form
        onSubmit={e => { e.preventDefault(); doSearch(q); }}
        className={`rounded-3xl p-2.5 ${dark ? "bg-slate-900" : "bg-white shadow-2xl shadow-slate-200/50"}`}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${dark ? "text-slate-400" : "text-slate-500"}`} />
            <input
              value={q}
              onChange={e => { setQ(e.target.value); setOpen(true); setHighlightIdx(-1); }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              placeholder={`Try: "${example}"`}
              className={`h-14 sm:h-16 w-full rounded-2xl border pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-emerald-400 transition ${
                dark
                  ? "border-white/10 bg-slate-950 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
            />
            {searching && (
              <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500 animate-spin" />
            )}
          </div>
          <button
            type="submit"
            disabled={!q.trim()}
            className="h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 text-white font-bold text-base hover:opacity-90 transition flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-40"
          >
            Compare prices <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div className={`absolute z-50 left-0 right-0 mt-2 rounded-2xl border shadow-2xl overflow-hidden ${
          dark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
        }`}>
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"} flex items-center gap-1.5`}>
                <Sparkles className="h-3 w-3" /> Suggestions
              </div>
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => doSearch(s)}
                  onMouseEnter={() => setHighlightIdx(i)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition ${
                    highlightIdx === i
                      ? dark ? "bg-white/10 text-white" : "bg-emerald-50 text-emerald-700"
                      : dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <TrendingUp className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="flex-1">{s}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </button>
              ))}
            </div>
          ) : recent.length > 0 ? (
            <div className="py-2">
              <div className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"} flex items-center justify-between`}>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Recent searches
                </span>
                <button onClick={clearRecent} className="text-rose-500 hover:underline text-[10px] normal-case font-medium">
                  Clear
                </button>
              </div>
              {recent.map((s, i) => (
                <button
                  key={s}
                  onClick={() => doSearch(s)}
                  onMouseEnter={() => setHighlightIdx(i)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition ${
                    highlightIdx === i
                      ? dark ? "bg-white/10 text-white" : "bg-emerald-50 text-emerald-700"
                      : dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Clock className={`h-4 w-4 flex-shrink-0 ${dark ? "text-slate-400" : "text-slate-400"}`} />
                  <span className="flex-1">{s}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
