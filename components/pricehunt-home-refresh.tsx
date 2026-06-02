"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search, ArrowRight, Sparkles, Bell, Heart, ShieldCheck,
  TrendingDown, Star, Store, Zap, LineChart, Moon, Sun,
  User, CheckCircle2, X,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  CartesianGrid, XAxis, YAxis, Tooltip,
} from "recharts";
import { openLoginModal } from "@/lib/authClient";
import { getUser, logout, type User as AuthUser } from "@/lib/authClient";
import { getNotifications, unreadCount, markRead, markAllRead, timeAgo } from "@/lib/notificationsClient";
import { getWishlist, toggleWishlist } from "@/lib/wishlistClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Static featured products shown in hero ──────────────────────────────────
const FEATURED = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro 256GB",
    category: "Phones",
    price: 899,
    oldPrice: 949,
    drop: 50,
    badge: "Best deal",
    emoji: "📱",
    accent: "from-sky-500 via-cyan-400 to-blue-600",
    retailers: ["Amazon", "Currys", "Argos", "eBay"],
    rating: 4.8,
    productKey: "apple-iphone-15-pro-256gb",
    history: [
      { day: "Mon", price: 949 }, { day: "Tue", price: 939 },
      { day: "Wed", price: 929 }, { day: "Thu", price: 919 },
      { day: "Fri", price: 914 }, { day: "Sat", price: 909 },
      { day: "Sun", price: 899 },
    ],
    offers: [
      { store: "Amazon",     price: 899, match: "Exact",   shipping: "Free" },
      { store: "Currys",     price: 914, match: "Exact",   shipping: "Free" },
      { store: "Argos",      price: 919, match: "Likely",  shipping: "£4.99" },
      { store: "eBay",       price: 879, match: "Variant", shipping: "Free" },
    ],
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 259,
    oldPrice: 309,
    drop: 50,
    badge: "Price drop",
    emoji: "🎧",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    retailers: ["Amazon", "John Lewis", "eBay"],
    rating: 4.7,
    productKey: "sony-wh-1000xm5-wireless-headphones",
    history: [
      { day: "Mon", price: 309 }, { day: "Tue", price: 299 },
      { day: "Wed", price: 289 }, { day: "Thu", price: 279 },
      { day: "Fri", price: 269 }, { day: "Sat", price: 269 },
      { day: "Sun", price: 259 },
    ],
    offers: [
      { store: "Amazon",     price: 259, match: "Exact",  shipping: "Free" },
      { store: "John Lewis", price: 269, match: "Exact",  shipping: "Free" },
      { store: "eBay",       price: 241, match: "Likely", shipping: "Free" },
    ],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    price: 1049,
    oldPrice: 1149,
    drop: 100,
    badge: "Trending",
    emoji: "📲",
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    retailers: ["Samsung", "Amazon", "Very"],
    rating: 4.9,
    productKey: "samsung-galaxy-s24-ultra",
    history: [
      { day: "Mon", price: 1149 }, { day: "Tue", price: 1139 },
      { day: "Wed", price: 1119 }, { day: "Thu", price: 1099 },
      { day: "Fri", price: 1089 }, { day: "Sat", price: 1069 },
      { day: "Sun", price: 1049 },
    ],
    offers: [
      { store: "Samsung", price: 1049, match: "Exact",  shipping: "Free" },
      { store: "Amazon",  price: 1059, match: "Exact",  shipping: "Free" },
      { store: "Very",    price: 1099, match: "Likely", shipping: "Free" },
    ],
  },
];

const STATS = [
  { label: "Tracked stores",      value: "106+" },
  { label: "Average savings",     value: "£42"  },
  { label: "Products monitored",  value: "5k+"  },
];

const TRUST = [
  { title: "Cleaner search results",  text: "Accessories and wrong variants pushed down automatically.", icon: ShieldCheck },
  { title: "Live price movement",     text: "Spot whether today is really the lowest price point.",    icon: LineChart    },
  { title: "High-intent clicks",      text: "Best deal badges and retailer summaries boost CTR.",       icon: Zap          },
];

const CATEGORIES = ["All", "Phones", "Audio", "Laptops"];

const TRENDING = [
  "iPhone 15 Pro", "PlayStation 5", "Dyson Airwrap",
  "Air Fryer", "Milk", "Cheese", "Washing Machine",
];

// ─── Helper components ────────────────────────────────────────────────────────
function Pill({ children, active = false, dark = false }: { children: React.ReactNode; active?: boolean; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? dark ? "border-white bg-white text-slate-900" : "border-slate-900 bg-slate-900 text-white"
          : dark ? "border-white/15 bg-white/5 text-slate-200" : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {children}
    </span>
  );
}

// ─── Main homepage component ──────────────────────────────────────────────────
export default function PriceHuntHomeRefresh() {
  const router = useRouter();
  const [darkMode, setDarkMode]         = useState(false);
  const [query, setQuery]               = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProduct, setActiveProduct]       = useState(FEATURED[0]);
  const [watchlist, setWatchlist]       = useState<number[]>([1]);
  const [alertIds, setAlertIds]         = useState<number[]>([2]);
  const [user, setUser]                 = useState<AuthUser | null>(null);
  const [notifOpen, setNotifOpen]       = useState(false);
  const [notifCount, setNotifCount]     = useState(0);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUser());
    setNotifCount(unreadCount());
    const onChange = () => { setUser(getUser()); setNotifCount(unreadCount()); };
    window.addEventListener("auth-changed",    onChange);
    window.addEventListener("notifs-changed",  onChange);
    return () => {
      window.removeEventListener("auth-changed",   onChange);
      window.removeEventListener("notifs-changed", onChange);
    };
  }, []);

  const filtered = useMemo(() =>
    FEATURED.filter(p => {
      const matchCat   = selectedCategory === "All" || p.category === selectedCategory;
      const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    }),
    [query, selectedCategory]
  );

  function doSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function quickSearch(term: string) {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  // Styling helpers
  const pageClass = darkMode
    ? "bg-slate-950 text-white"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#ffffff_100%)] text-slate-900";

  const shellCard = darkMode
    ? "border border-white/10 bg-white/5 backdrop-blur-xl"
    : "border border-white/60 bg-white/80 backdrop-blur-xl";

  const softText  = darkMode ? "text-slate-300" : "text-slate-600";
  const mutedPanel = darkMode ? "bg-white/5" : "bg-slate-50";

  const toggleId = (list: number[], setList: React.Dispatch<React.SetStateAction<number[]>>, id: number) =>
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  const initials = user?.name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() ?? "";

  return (
    <div className={`${pageClass} min-h-screen transition-colors duration-300`}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 font-bold text-white shadow-lg text-sm">
              PH
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-semibold">PriceHunt</p>
              <p className={`text-xs ${softText}`}>Compare prices across 106+ UK retailers</p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {[
              ["Electronics", "/category/electronics"],
              ["Grocery",     "/category/grocery"],
              ["Fashion",     "/category/fashion"],
              ["Cars",        "/category/cars"],
              ["Broadband",   "/category/broadband"],
            ].map(([label, href]) => (
              <Link key={label} href={href}
                className={`hover:text-emerald-600 transition ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Dark mode */}
            <button
              onClick={() => setDarkMode(d => !d)}
              className={`h-10 w-10 rounded-2xl grid place-items-center transition ${darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Wishlist */}
            <Link href="/wishlist"
              className={`h-10 w-10 rounded-2xl grid place-items-center transition ${darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              <Heart className="h-4 w-4" />
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(o => !o)}
                className={`relative h-10 w-10 rounded-2xl grid place-items-center transition ${darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                <Bell className="h-4 w-4" />
                {mounted && notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold grid place-items-center">
                    {notifCount > 9 ? "9+" : notifCount}
                  </span>
                )}
              </button>

              {notifOpen && mounted && (
                <div className={`absolute right-0 mt-2 w-80 rounded-[24px] shadow-xl border overflow-hidden z-40 ${darkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"}`}>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/50">
                    <span className="font-semibold text-sm">Notifications</span>
                    <button onClick={markAllRead} className="text-xs text-emerald-500 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {getNotifications().map(n => (
                      <a key={n.id} href={n.url ?? "#"} target="_blank" rel="noopener noreferrer"
                        onClick={() => markRead(n.id)}
                        className={`flex gap-3 px-4 py-3 hover:bg-slate-50 border-b last:border-0 dark:hover:bg-white/5 ${darkMode ? "border-white/5" : "border-slate-100"}`}
                      >
                        <span className="text-2xl">{n.emoji}</span>
                        <div>
                          <div className="text-sm font-medium">{n.title}</div>
                          <div className={`text-xs mt-0.5 ${softText}`}>{n.body}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{timeAgo(n.ts)}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User / sign-in */}
            {mounted && user ? (
              <div className="relative group">
                <button className="h-10 w-10 rounded-2xl grid place-items-center bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-bold text-xs">
                  {initials}
                </button>
                <div className={`absolute right-0 mt-2 w-44 rounded-[20px] shadow-xl border overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-40 ${darkMode ? "bg-slate-900 border-white/10 text-white" : "bg-white border-slate-200"}`}>
                  <div className="px-4 py-2.5 border-b border-slate-200/50 text-xs truncate">{user.email}</div>
                  <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-slate-50">❤️ Wishlist</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-slate-50 border-t border-slate-100">Sign out</button>
                </div>
              </div>
            ) : (
              <Button className="h-10 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:opacity-90 border-0" onClick={() => mounted && openLoginModal()}>
                <User className="mr-1.5 h-4 w-4" /> Sign in
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">

        {/* Hero 2-col */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left: search card */}
          <div className={`rounded-[32px] p-6 sm:p-8 ${shellCard}`}>
            <Pill dark={darkMode}>
              <Sparkles className="mr-2 h-3.5 w-3.5" /> 106+ UK retailers compared
            </Pill>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Search once,{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                compare everywhere
              </span>
            </h1>
            <p className={`mt-4 max-w-2xl text-lg ${softText}`}>
              Amazon, Tesco, Zara, EE, AutoTrader, Uber Eats — one search covers them all.
              With delivery fees, in-store prices, and price-drop history.
            </p>

            {/* Search bar */}
            <form onSubmit={doSearch}
              className={`mt-8 rounded-[28px] p-3 ${darkMode ? "bg-slate-900" : "bg-white shadow-xl shadow-slate-200/50"}`}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${softText}`} />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search e.g. iPhone 15 Pro, washing machine, Aptamil…"
                    className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none text-sm ${
                      darkMode
                        ? "border-white/10 bg-slate-950 text-white placeholder:text-slate-500"
                        : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>
                <button type="submit"
                  className="h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 text-white font-semibold hover:opacity-90 transition flex items-center gap-2 whitespace-nowrap"
                >
                  Search now <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Category pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} type="button" onClick={() => setSelectedCategory(cat)}>
                    <Pill active={selectedCategory === cat} dark={darkMode}>{cat}</Pill>
                  </button>
                ))}
              </div>
            </form>

            {/* Trending */}
            <div className="mt-5 flex flex-wrap gap-2 items-center">
              <span className={`text-xs font-medium ${softText}`}>Trending:</span>
              {TRENDING.map(t => (
                <button key={t} onClick={() => quickSearch(t)}
                  className={`text-xs px-3 py-1 rounded-full border hover:border-emerald-400 hover:text-emerald-600 transition ${
                    darkMode ? "border-white/15 text-slate-300" : "border-slate-200 text-slate-700 bg-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {STATS.map(s => (
                <div key={s.label} className={`rounded-3xl p-5 ${mutedPanel}`}>
                  <p className={`text-xs ${softText}`}>{s.label}</p>
                  <p className="mt-1 text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: featured deal card */}
          <div className={`overflow-hidden rounded-[32px] ${shellCard}`}>
            <div className={`bg-gradient-to-br ${activeProduct.accent} p-6 text-white sm:p-8`}>
              <div className="flex items-center justify-between gap-4">
                <Pill active>{activeProduct.badge}</Pill>
                <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">Featured result</div>
              </div>
              <div className="mt-10 flex items-end justify-between gap-4">
                <div>
                  <div className="text-6xl">{activeProduct.emoji}</div>
                  <p className="mt-4 max-w-xs text-2xl font-semibold">{activeProduct.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/75">Lowest today</p>
                  <p className="text-4xl font-bold">£{activeProduct.price}</p>
                  <p className="text-sm text-white/70 line-through">£{activeProduct.oldPrice}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
              {[
                { label: "Retailers",   value: `${activeProduct.retailers.length}+` },
                { label: "Rating",      value: `${activeProduct.rating}/5` },
                { label: "Price drop",  value: `£${activeProduct.drop}` },
              ].map(s => (
                <div key={s.label} className={`rounded-3xl p-4 ${mutedPanel}`}>
                  <p className={`text-xs ${softText}`}>{s.label}</p>
                  <p className="mt-1 text-xl font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 sm:px-6">
              <Link href={`/product/${activeProduct.productKey}`}
                className="block w-full text-center py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
              >
                Compare all prices →
              </Link>
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {TRUST.map(item => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className={`rounded-[28px] ${shellCard}`}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className={`mt-2 text-sm ${softText}`}>{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Deals + comparison panel */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.92fr]">

          {/* Deals cards */}
          <Card className={`rounded-[32px] ${shellCard}`}>
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <p className={`text-sm ${softText}`}>Today's price drops</p>
                  <h2 className="mt-1 text-3xl font-bold">Latest deals</h2>
                </div>
                <Link href="/search?q=iphone"
                  className={`hidden rounded-full px-3 py-1 text-xs font-medium md:block ${darkMode ? "bg-white/5 text-slate-300 hover:bg-white/10" : "bg-slate-100 text-slate-700 hover:bg-slate-200"} transition`}
                >
                  See all →
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {(filtered.length ? filtered : FEATURED).map(product => {
                  const inWatchlist = watchlist.includes(product.id);
                  const alertOn    = alertIds.includes(product.id);
                  return (
                    <motion.div key={product.id} whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
                      <div className={`overflow-hidden rounded-[28px] border ${darkMode ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"}`}>
                        {/* Gradient top */}
                        <div className={`bg-gradient-to-br ${product.accent} p-5 text-white`}>
                          <div className="flex items-center justify-between">
                            <Pill active>{product.badge}</Pill>
                            <div className="flex gap-1.5">
                              <button
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 transition"
                                onClick={() => toggleId(watchlist, setWatchlist, product.id)}
                              >
                                <Heart className={`h-4 w-4 ${inWatchlist ? "fill-current text-rose-200" : "text-white"}`} />
                              </button>
                              <button
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 transition"
                                onClick={() => toggleId(alertIds, setAlertIds, product.id)}
                              >
                                <Bell className={`h-4 w-4 ${alertOn ? "text-amber-200" : "text-white"}`} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-8 text-5xl">{product.emoji}</div>
                          <p className="mt-3 text-base font-semibold leading-tight">{product.name}</p>
                        </div>

                        {/* Bottom */}
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-2xl font-bold">£{product.price}</p>
                              <p className="text-sm text-slate-400 line-through">£{product.oldPrice}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-1 text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-medium text-sm">{product.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {product.retailers.slice(0, 3).map(r => (
                              <Pill key={r} dark={darkMode}>{r}</Pill>
                            ))}
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setActiveProduct(product)}
                              className="rounded-xl bg-slate-900 text-white text-xs font-medium py-2 hover:bg-slate-800 transition"
                            >
                              View deal
                            </button>
                            <Link
                              href={`/product/${product.productKey}`}
                              className={`rounded-xl border text-xs font-medium py-2 text-center transition ${darkMode ? "border-white/10 text-white hover:bg-white/5" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                            >
                              Compare
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Right column: comparison + chart */}
          <div className="space-y-6">

            {/* Comparison panel */}
            <Card className={`rounded-[32px] ${shellCard}`}>
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className={`text-sm ${softText}`}>Price comparison</p>
                    <h2 className="mt-1 text-xl font-bold leading-tight">{activeProduct.name}</h2>
                  </div>
                  <Pill active dark={darkMode}>Best deal</Pill>
                </div>
                <div className="space-y-2.5">
                  {activeProduct.offers.map((offer, i) => (
                    <div key={`${offer.store}-${i}`}
                      className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl p-4 ${
                        offer.match === "Exact"
                          ? darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
                          : mutedPanel
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 font-medium text-sm">
                          <Store className="h-3.5 w-3.5 text-slate-400" /> {offer.store}
                        </div>
                        <p className={`mt-0.5 text-xs ${softText}`}>Delivery: {offer.shipping}</p>
                      </div>
                      <p className="font-semibold text-sm">£{offer.price}</p>
                      <div>
                        {offer.match === "Exact" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : offer.match === "Likely" ? (
                          <TrendingDown className="h-5 w-5 text-amber-500" />
                        ) : (
                          <X className="h-5 w-5 text-rose-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/product/${activeProduct.productKey}`}
                  className="mt-4 block w-full text-center py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  See all retailers →
                </Link>
              </CardContent>
            </Card>

            {/* Price history chart */}
            <Card className={`rounded-[32px] ${shellCard}`}>
              <CardContent className="p-6 sm:p-7">
                <p className={`text-sm ${softText}`}>7-day price history</p>
                <div className="flex items-center justify-between mt-1 mb-5">
                  <h2 className="text-xl font-bold">{activeProduct.name}</h2>
                  <div className="text-right">
                    <p className="text-xs text-emerald-500">Lowest this week</p>
                    <p className="text-2xl font-bold">£{activeProduct.price}</p>
                  </div>
                </div>
                <div className={`rounded-[24px] p-4 ${mutedPanel}`}>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activeProduct.history} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="dealFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
                        <XAxis dataKey="day" tick={{ fill: darkMode ? "#cbd5e1" : "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: darkMode ? "#cbd5e1" : "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} domain={["dataMin - 15", "dataMax + 15"]} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "none", background: darkMode ? "#1e293b" : "#fff" }} />
                        <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="url(#dealFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Category quick links */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Shop by category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {[
              { slug: "electronics", emoji: "📱", label: "Electronics" },
              { slug: "grocery",     emoji: "🛒", label: "Grocery" },
              { slug: "fashion",     emoji: "👗", label: "Fashion" },
              { slug: "home",        emoji: "🏠", label: "Home" },
              { slug: "cars",        emoji: "🚗", label: "Cars" },
              { slug: "broadband",   emoji: "📡", label: "Broadband" },
              { slug: "food",        emoji: "🍔", label: "Food" },
              { slug: "gaming",      emoji: "🎮", label: "Gaming" },
              { slug: "beauty",      emoji: "💄", label: "Beauty" },
              { slug: "sports",      emoji: "⚽", label: "Sports" },
              { slug: "insurance",   emoji: "🛡️", label: "Insurance" },
              { slug: "mobileplan",  emoji: "📞", label: "Mobile" },
              { slug: "toys",        emoji: "🧸", label: "Toys" },
              { slug: "outdoor",     emoji: "🏕️", label: "Outdoor" },
            ].map(c => (
              <Link key={c.slug} href={`/category/${c.slug}`}
                className={`rounded-2xl p-3 text-center hover:scale-105 transition border ${
                  darkMode ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md"
                }`}
              >
                <div className="text-2xl">{c.emoji}</div>
                <div className={`text-xs font-medium mt-1 ${softText}`}>{c.label}</div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
