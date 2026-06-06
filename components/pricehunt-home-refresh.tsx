"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, Sparkles, Bell, Heart, ShieldCheck,
  TrendingDown, Star, Store, Zap, LineChart, Moon, Sun,
  User, CheckCircle2, X, BadgePercent, Eye, Target, Award,
  Flame, Quote, Filter, ChartBar, ShoppingBag,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  CartesianGrid, XAxis, YAxis, Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SmartSearchBar from "@/components/SmartSearchBar";
import {
  openLoginModal, getUser, logout, type User as AuthUser,
} from "@/lib/authClient";
import {
  getNotifications, unreadCount, markRead, markAllRead, timeAgo,
} from "@/lib/notificationsClient";

// ─── Featured deals shown in hero / latest drops ─────────────────────────────
const FEATURED = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro 256GB",
    category: "Phones",
    price: 899, oldPrice: 949, drop: 50,
    badge: "Best deal", urgency: "Only 3 left at this price",
    emoji: "📱",
    accent: "from-sky-500 via-cyan-400 to-blue-600",
    retailers: ["Amazon", "Currys", "Argos", "eBay"],
    rating: 4.8, reviews: 12480,
    productKey: "apple-iphone-15-128gb",
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
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    price: 259, oldPrice: 309, drop: 50,
    badge: "Price drop", urgency: "Lowest in 30 days",
    emoji: "🎧",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    retailers: ["Amazon", "John Lewis", "eBay"],
    rating: 4.7, reviews: 8742,
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
    price: 1049, oldPrice: 1149, drop: 100,
    badge: "Trending", urgency: "Hot deal · 142 views/hour",
    emoji: "📲",
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    retailers: ["Samsung", "Amazon", "Very"],
    rating: 4.9, reviews: 5320,
    productKey: "samsung-galaxy-s24-256gb",
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

// ─── Top UK retailers shown as logo wall ─────────────────────────────────────
const RETAILER_LOGOS = [
  "Amazon", "eBay", "Argos", "Currys", "John Lewis",
  "Tesco", "Sainsbury's", "ASDA", "Morrisons", "Aldi", "Lidl", "Iceland",
  "ASOS", "Zara", "H&M", "Next", "Primark", "JD Sports",
  "AutoTrader", "Compare the Market", "Sky", "BT", "EE", "Vodafone",
  "Uber Eats", "Deliveroo", "Just Eat", "Apple",
];

// ─── Testimonials (placeholder until real reviews come in) ───────────────────
const TESTIMONIALS = [
  {
    name: "Sarah M.",  location: "London",
    quote: "Saved £127 on my new fridge by checking PriceHunt before buying at Currys. Wish I'd found it earlier!",
    stars: 5, avatar: "👩",
  },
  {
    name: "James K.",  location: "Manchester",
    quote: "The grocery comparison is unreal. I now save £25/week just by knowing which Tesco/Aldi has my staples cheapest.",
    stars: 5, avatar: "👨",
  },
  {
    name: "Priya R.",  location: "Birmingham",
    quote: "Found a Samsung S24 Ultra £180 cheaper on eBay than Carphone Warehouse. The match-confidence rating is genius.",
    stars: 5, avatar: "👩‍🦱",
  },
  {
    name: "Tom L.",    location: "Edinburgh",
    quote: "The price-drop alerts pinged me twice this month. Bought a Dyson V15 for £200 off. Take my money.",
    stars: 4, avatar: "👨‍🦰",
  },
];

// ─── Why PriceHunt (differentiators) ─────────────────────────────────────────
const WHY = [
  {
    icon: Target,
    title: "Exact-match scoring",
    text: "We tell you whether each retailer has the EXACT product you searched for, or just a similar variant — no more confusion.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Filter,
    title: "No fake accessories",
    text: "Searching for an iPhone? We won't pollute results with phone cases, chargers, or cables priced like the device.",
    color: "from-cyan-500 to-sky-500",
  },
  {
    icon: ChartBar,
    title: "Real price history",
    text: "Don't get duped by fake discounts. We show 30-day price history so you know if today's deal is actually the lowest.",
    color: "from-violet-500 to-purple-500",
  },
];

// ─── Trust badges row ────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "Trusted by 12,400+ UK shoppers" },
  { icon: Store,       text: "106+ retailers compared" },
  { icon: Zap,         text: "Prices updated every 4 hours" },
  { icon: Award,       text: "£42 average saving per purchase" },
];

// ─── Pill helper ─────────────────────────────────────────────────────────────
function Pill({
  children, active = false, dark = false, className = "",
}: { children: React.ReactNode; active?: boolean; dark?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? dark ? "border-white bg-white text-slate-900" : "border-slate-900 bg-slate-900 text-white"
          : dark ? "border-white/15 bg-white/5 text-slate-200" : "border-slate-200 bg-white text-slate-700"
      } ${className}`}
    >
      {children}
    </span>
  );
}

// ─── Main page component ─────────────────────────────────────────────────────
export default function PriceHuntHomeRefresh() {
  const [darkMode, setDarkMode]         = useState(false);
  const [activeProduct, setActiveProduct] = useState(FEATURED[0]);
  const [watchlist, setWatchlist]       = useState<number[]>([]);
  const [alertIds, setAlertIds]         = useState<number[]>([]);
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

  const pageClass = darkMode
    ? "bg-slate-950 text-white"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_32%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_45%,#ffffff_100%)] text-slate-900";

  const shellCard = darkMode
    ? "border border-white/10 bg-white/5 backdrop-blur-xl"
    : "border border-white/60 bg-white/85 backdrop-blur-xl";

  const softText  = darkMode ? "text-slate-300" : "text-slate-600";
  const mutedPanel = darkMode ? "bg-white/5" : "bg-slate-50";

  const toggleId = (list: number[], setList: React.Dispatch<React.SetStateAction<number[]>>, id: number) =>
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  const initials = user?.name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() ?? "";

  return (
    <div className={`${pageClass} min-h-screen transition-colors duration-300`}>

      {/* ───── HEADER ───── */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 font-bold text-white shadow-lg text-xs sm:text-sm">
              PH
            </div>
            <div className="hidden xs:block">
              <p className="text-base sm:text-lg font-extrabold leading-tight">PriceHunt</p>
              <p className={`hidden sm:block text-[11px] ${softText}`}>106+ UK retailers • Free</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium ml-4">
            {[
              ["Electronics", "/category/electronics"],
              ["Grocery",     "/category/grocery"],
              ["Fashion",     "/category/fashion"],
              ["Cars",        "/category/cars"],
              ["Broadband",   "/category/broadband"],
              ["Food",        "/category/food"],
            ].map(([label, href]) => (
              <Link key={label} href={href}
                className={`hover:text-emerald-600 transition ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <button
              onClick={() => setDarkMode(d => !d)}
              aria-label="Toggle theme"
              className={`h-9 w-9 sm:h-10 sm:w-10 rounded-2xl grid place-items-center transition ${darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link href="/wishlist" aria-label="Wishlist"
              className={`h-9 w-9 sm:h-10 sm:w-10 rounded-2xl grid place-items-center transition ${darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              <Heart className="h-4 w-4" />
            </Link>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(o => !o)}
                aria-label="Notifications"
                className={`relative h-9 w-9 sm:h-10 sm:w-10 rounded-2xl grid place-items-center transition ${darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                <Bell className="h-4 w-4" />
                {mounted && notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-[1.15rem] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold grid place-items-center">
                    {notifCount > 9 ? "9+" : notifCount}
                  </span>
                )}
              </button>
              {notifOpen && mounted && (
                <div className={`absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border overflow-hidden z-40 ${darkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"}`}>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/30">
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
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{n.title}</div>
                          <div className={`text-xs mt-0.5 line-clamp-2 ${softText}`}>{n.body}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{timeAgo(n.ts)}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mounted && user ? (
              <div className="relative group">
                <button className="h-9 w-9 sm:h-10 sm:w-10 rounded-2xl grid place-items-center bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-bold text-xs">
                  {initials}
                </button>
                <div className={`absolute right-0 mt-2 w-44 rounded-2xl shadow-xl border overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-40 ${darkMode ? "bg-slate-900 border-white/10 text-white" : "bg-white border-slate-200"}`}>
                  <div className="px-4 py-2.5 border-b border-slate-200/50 text-xs truncate">{user.email}</div>
                  <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/5">❤️ Wishlist</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-slate-50 dark:hover:bg-white/5 border-t border-slate-100 dark:border-white/5">Sign out</button>
                </div>
              </div>
            ) : (
              <button onClick={() => mounted && openLoginModal()}
                className="h-9 sm:h-10 rounded-2xl px-3 sm:px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs sm:text-sm font-semibold hover:opacity-90 flex items-center gap-1.5">
                <User className="h-4 w-4" /> <span className="hidden sm:inline">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ───── HERO ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Pill dark={darkMode} className="mb-5">
            <Sparkles className="mr-1.5 h-3 w-3 text-emerald-500" /> 106+ retailers · Real-time prices · No login required
          </Pill>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-5xl">
          Find the best price instantly —{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
            without false matches
          </span>
        </h1>

        <p className={`mt-5 max-w-2xl text-lg sm:text-xl ${softText}`}>
          Compare real products across Amazon, Tesco, Argos, ASOS, EE, AutoTrader, Uber Eats, and 100+ trusted UK stores in seconds.{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Save up to £42 on average.</span>
        </p>

        <div className="mt-7 max-w-3xl">
          <SmartSearchBar dark={darkMode} />
        </div>

        {/* Trust badges row */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {TRUST_BADGES.map(b => (
            <div key={b.text} className={`flex items-center gap-2 ${softText}`}>
              <b.icon className="h-4 w-4 text-emerald-500" />
              <span className="font-medium">{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── RETAILER LOGO WALL ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-2 sm:mt-4">
        <div className={`rounded-3xl p-6 sm:p-8 ${shellCard}`}>
          <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider text-center ${softText}`}>
            Comparing prices across UK's most trusted retailers
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-8 sm:gap-y-4">
            {RETAILER_LOGOS.map(logo => (
              <span key={logo}
                className={`text-base sm:text-lg font-bold tracking-tight ${darkMode ? "text-slate-300" : "text-slate-700"} hover:text-emerald-500 transition cursor-default`}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHY PRICEHUNT? ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="text-center mb-10 sm:mb-14">
          <Pill dark={darkMode}>
            <Sparkles className="mr-1.5 h-3 w-3 text-emerald-500" /> Why PriceHunt
          </Pill>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Cleaner than Google Shopping.
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Built for UK shoppers.
            </span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${softText}`}>
            Why use us instead of Googling? Because we cut out the noise that wastes your time.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className={`h-full rounded-3xl ${shellCard}`}>
                <CardContent className="p-7">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${w.color} text-white shadow-lg`}>
                    <w.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl sm:text-2xl font-extrabold">{w.title}</h3>
                  <p className={`mt-2.5 text-[15px] leading-relaxed ${softText}`}>{w.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── FEATURED DEAL HERO + DEALS GRID ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <Pill dark={darkMode}>
              <Flame className="mr-1.5 h-3 w-3 text-orange-500" /> Hot today
            </Pill>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Today's biggest price drops</h2>
            <p className={`mt-1 text-base ${softText}`}>Verified deals our shoppers saved on this week.</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {FEATURED.map((product, i) => {
            const inWatchlist = watchlist.includes(product.id);
            const alertOn = alertIds.includes(product.id);
            const percentOff = Math.round((product.drop / product.oldPrice) * 100);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -5 }}
              >
                <div className={`group overflow-hidden rounded-3xl border h-full flex flex-col ${darkMode ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white shadow-lg shadow-slate-200/40 hover:shadow-2xl"} transition-shadow`}>
                  <div className={`relative bg-gradient-to-br ${product.accent} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-white text-slate-900 px-3 py-1 text-xs font-bold">
                        {product.badge === "Best deal" && <BadgePercent className="mr-1 h-3 w-3 text-emerald-600" />}
                        {product.badge === "Price drop" && <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />}
                        {product.badge === "Trending" && <Flame className="mr-1 h-3 w-3 text-orange-500" />}
                        {product.badge}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur transition"
                          onClick={() => toggleId(watchlist, setWatchlist, product.id)}
                          aria-label="Save to watchlist"
                        >
                          <Heart className={`h-4 w-4 ${inWatchlist ? "fill-current text-rose-300" : "text-white"}`} />
                        </button>
                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur transition"
                          onClick={() => toggleId(alertIds, setAlertIds, product.id)}
                          aria-label="Set price alert"
                        >
                          <Bell className={`h-4 w-4 ${alertOn ? "fill-current text-amber-200" : "text-white"}`} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-7 text-6xl drop-shadow-lg">{product.emoji}</div>
                    <p className="mt-4 text-lg font-bold leading-tight line-clamp-2">{product.name}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-1 backdrop-blur text-xs font-medium">
                      <Eye className="h-3 w-3" /> {product.urgency}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-extrabold">£{product.price}</p>
                          <p className="text-sm text-slate-400 line-through">£{product.oldPrice}</p>
                        </div>
                        <p className="text-xs font-bold text-emerald-600 mt-0.5">Save £{product.drop} ({percentOff}% off)</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-bold text-sm">{product.rating}</span>
                        </div>
                        <p className={`text-[10px] mt-0.5 ${softText}`}>{product.reviews.toLocaleString()} reviews</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.retailers.slice(0, 4).map(r => (
                        <span key={r} className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md ${darkMode ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
                          {r}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 grid grid-cols-[1fr_auto] gap-2">
                      <Link
                        href={`/product/${product.productKey}`}
                        className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-bold py-3 text-center hover:opacity-90 transition flex items-center justify-center gap-1.5"
                      >
                        View deal <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setActiveProduct(product)}
                        className={`rounded-2xl border px-3 text-sm font-medium transition ${darkMode ? "border-white/10 text-white hover:bg-white/5" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                        aria-label="Compare"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ───── PRICE COMPARISON PANEL + HISTORY CHART ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Comparison panel */}
          <Card className={`rounded-3xl ${shellCard}`}>
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${softText}`}>Live comparison</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight">{activeProduct.name}</h3>
                </div>
                <Pill dark={darkMode}>
                  <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" /> Verified
                </Pill>
              </div>
              <div className="space-y-2.5">
                {activeProduct.offers.map((offer, i) => (
                  <div
                    key={`${offer.store}-${i}`}
                    className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl p-3.5 sm:p-4 transition ${
                      offer.match === "Exact"
                        ? darkMode ? "bg-emerald-500/10 ring-1 ring-emerald-500/30" : "bg-emerald-50 ring-1 ring-emerald-200"
                        : mutedPanel
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Store className="h-4 w-4 text-slate-400" /> {offer.store}
                        {i === 0 && (
                          <span className="text-[10px] font-bold uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">
                            Best
                          </span>
                        )}
                      </div>
                      <p className={`mt-0.5 text-xs ${softText}`}>Shipping: {offer.shipping}</p>
                    </div>
                    <p className="font-extrabold text-base">£{offer.price}</p>
                    <div>
                      {offer.match === "Exact" ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-1 rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Exact
                        </span>
                      ) : offer.match === "Likely" ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-1 rounded-md">
                          <TrendingDown className="h-3 w-3" /> Likely
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-1 rounded-md">
                          <X className="h-3 w-3" /> Variant
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/product/${activeProduct.productKey}`}
                className="mt-5 block w-full text-center py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
              >
                See all 106 retailers →
              </Link>
            </CardContent>
          </Card>

          {/* Price history chart */}
          <Card className={`rounded-3xl ${shellCard}`}>
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${softText}`}>7-day price history</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight">Don't get fooled by fake discounts</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Lowest this week</p>
                  <p className="text-2xl sm:text-3xl font-extrabold mt-0.5">£{activeProduct.price}</p>
                </div>
              </div>
              <div className={`rounded-2xl p-3 ${mutedPanel}`}>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeProduct.history} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="dealFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="#10b981" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
                      <XAxis dataKey="day" tick={{ fill: darkMode ? "#cbd5e1" : "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: darkMode ? "#cbd5e1" : "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} domain={["dataMin - 15", "dataMax + 15"]} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "none", background: darkMode ? "#1e293b" : "#fff", fontSize: 12 }} />
                      <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="url(#dealFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="text-center mb-10 sm:mb-12">
          <Pill dark={darkMode}>
            <Quote className="mr-1.5 h-3 w-3 text-emerald-500" /> Real shoppers, real savings
          </Pill>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trusted by 12,400+ UK shoppers
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className={`h-full rounded-3xl ${shellCard}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                    {Array.from({ length: 5 - t.stars }).map((_, j) => (
                      <Star key={`e${j}`} className="h-4 w-4 text-slate-300" />
                    ))}
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed ${softText}`}>"{t.quote}"</p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="text-2xl">{t.avatar}</div>
                    <div>
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-[11px] text-slate-400">{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── CATEGORY GRID ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Browse by category</h2>
          <p className={`mt-2 text-base ${softText}`}>From electronics to insurance — 17 categories, 106 retailers.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { slug: "electronics", emoji: "📱", label: "Electronics" },
            { slug: "grocery",     emoji: "🛒", label: "Grocery" },
            { slug: "fashion",     emoji: "👗", label: "Fashion" },
            { slug: "home",        emoji: "🏠", label: "Home" },
            { slug: "cars",        emoji: "🚗", label: "Used Cars" },
            { slug: "broadband",   emoji: "📡", label: "Broadband" },
            { slug: "food",        emoji: "🍔", label: "Food Delivery" },
            { slug: "gaming",      emoji: "🎮", label: "Gaming" },
            { slug: "beauty",      emoji: "💄", label: "Beauty" },
            { slug: "sports",      emoji: "⚽", label: "Sports" },
            { slug: "insurance",   emoji: "🛡️", label: "Insurance" },
            { slug: "mobileplan",  emoji: "📞", label: "Mobile Plans" },
            { slug: "toys",        emoji: "🧸", label: "Toys" },
            { slug: "outdoor",     emoji: "🏕️", label: "Outdoor" },
          ].map(c => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`group rounded-2xl p-4 text-center transition border ${
                darkMode
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-400"
                  : "border-slate-200 bg-white hover:border-emerald-400 hover:shadow-lg"
              }`}
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{c.emoji}</div>
              <div className={`text-xs font-bold mt-2 ${darkMode ? "text-slate-200" : "text-slate-800"}`}>{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-14 sm:mt-20 mb-16 sm:mb-24">
        <div className={`rounded-[36px] p-8 sm:p-14 text-center relative overflow-hidden ${
          darkMode ? "bg-gradient-to-br from-emerald-600/30 to-cyan-600/30 border border-emerald-500/30" : "bg-gradient-to-br from-emerald-500 to-cyan-600"
        }`}>
          <Sparkles className="absolute top-6 left-6 h-8 w-8 text-white/20" />
          <Sparkles className="absolute bottom-6 right-8 h-12 w-12 text-white/20" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Stop wasting money on the wrong store.
          </h2>
          <p className="mt-4 text-white/90 text-lg max-w-xl mx-auto">
            Average shopper saves <span className="font-extrabold">£42 per purchase</span>. Free, no signup needed.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/search?q=iPhone"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" /> Find the cheapest deal
            </Link>
            <button
              onClick={() => mounted && openLoginModal()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/15 backdrop-blur text-white font-bold hover:bg-white/25 border border-white/30 transition"
            >
              <Bell className="h-4 w-4" /> Get price alerts
            </button>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className={`border-t ${darkMode ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center text-white font-bold text-xs">PH</div>
              <span className="text-lg font-extrabold">PriceHunt</span>
            </div>
            <p className={softText}>
              The fastest way to find the lowest price across UK's top online retailers. We may earn commission on purchases — at no extra cost to you.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Top categories</h4>
            <ul className={`space-y-2 ${softText}`}>
              <li><Link href="/category/electronics" className="hover:text-emerald-500">Electronics</Link></li>
              <li><Link href="/category/grocery" className="hover:text-emerald-500">Grocery</Link></li>
              <li><Link href="/category/fashion" className="hover:text-emerald-500">Fashion</Link></li>
              <li><Link href="/category/cars" className="hover:text-emerald-500">Used Cars</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Features</h4>
            <ul className={`space-y-2 ${softText}`}>
              <li><Link href="/wishlist" className="hover:text-emerald-500">Watchlist</Link></li>
              <li>Price alerts</li>
              <li>Price history graphs</li>
              <li>106+ retailers compared</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">About</h4>
            <ul className={`space-y-2 ${softText}`}>
              <li>How we work</li>
              <li>Privacy</li>
              <li>Affiliate disclosure</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className={`border-t ${darkMode ? "border-white/10" : "border-slate-200"}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs">
            <span className={softText}>© {new Date().getFullYear()} PriceHunt. Made with ❤️ in the UK.</span>
            <span className={softText}>Affiliate links earn us a small commission — at no cost to you.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
