"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ArrowRight,
  Sparkles,
  Bell,
  Heart,
  ShieldCheck,
  TrendingDown,
  Star,
  Store,
  Zap,
  LineChart,
  Moon,
  Sun,
  User,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const products = [
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
    history: [
      { day: "Mon", price: 949 },
      { day: "Tue", price: 939 },
      { day: "Wed", price: 929 },
      { day: "Thu", price: 919 },
      { day: "Fri", price: 914 },
      { day: "Sat", price: 909 },
      { day: "Sun", price: 899 },
    ],
    offers: [
      { store: "Amazon", price: 899, match: "Exact", shipping: "Free" },
      { store: "Currys", price: 914, match: "Exact", shipping: "Free" },
      { store: "Argos", price: 919, match: "Likely", shipping: "£4.99" },
      { store: "eBay", price: 879, match: "Variant", shipping: "Free" },
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
    history: [
      { day: "Mon", price: 309 },
      { day: "Tue", price: 299 },
      { day: "Wed", price: 289 },
      { day: "Thu", price: 279 },
      { day: "Fri", price: 269 },
      { day: "Sat", price: 269 },
      { day: "Sun", price: 259 },
    ],
    offers: [
      { store: "Amazon", price: 259, match: "Exact", shipping: "Free" },
      { store: "John Lewis", price: 269, match: "Exact", shipping: "Free" },
      { store: "eBay", price: 241, match: "Likely", shipping: "Free" },
    ],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra 512GB",
    category: "Phones",
    price: 1049,
    oldPrice: 1149,
    drop: 100,
    badge: "Trending",
    emoji: "📲",
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    retailers: ["Samsung", "Amazon", "Very"],
    rating: 4.9,
    history: [
      { day: "Mon", price: 1149 },
      { day: "Tue", price: 1139 },
      { day: "Wed", price: 1119 },
      { day: "Thu", price: 1099 },
      { day: "Fri", price: 1089 },
      { day: "Sat", price: 1069 },
      { day: "Sun", price: 1049 },
    ],
    offers: [
      { store: "Samsung", price: 1049, match: "Exact", shipping: "Free" },
      { store: "Amazon", price: 1059, match: "Exact", shipping: "Free" },
      { store: "Very", price: 1099, match: "Likely", shipping: "Free" },
    ],
  },
];

const categories = ["All", "Phones", "Audio", "Laptops"];
const trust = [
  {
    title: "Cleaner search results",
    text: "Accessories and wrong variants are pushed down automatically.",
    icon: ShieldCheck,
  },
  {
    title: "Live price movement",
    text: "Users can spot whether today is really the lowest point.",
    icon: LineChart,
  },
  {
    title: "High-intent clicks",
    text: "Best deal badges and retailer summaries increase click-through.",
    icon: Zap,
  },
];

function Pill({ children, active = false, dark = false }: { children: React.ReactNode; active?: boolean; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? dark
            ? "border-white bg-white text-slate-900"
            : "border-slate-900 bg-slate-900 text-white"
          : dark
          ? "border-white/15 bg-white/5 text-slate-200"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {children}
    </span>
  );
}

export default function PriceHuntHomeRefresh() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [watchlist, setWatchlist] = useState<number[]>([1]);
  const [alerts, setAlerts] = useState<number[]>([2]);
  const [signedIn, setSignedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery = !query || product.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const pageClass = darkMode
    ? "bg-slate-950 text-white"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#ffffff_100%)] text-slate-900";

  const shellCard = darkMode
    ? "border border-white/10 bg-white/5 backdrop-blur-xl"
    : "border border-white/60 bg-white/80 backdrop-blur-xl";

  const softText = darkMode ? "text-slate-300" : "text-slate-600";
  const mutedPanel = darkMode ? "bg-white/5" : "bg-slate-50";

  const toggleId = (list: number[], setList: React.Dispatch<React.SetStateAction<number[]>>, id: number) => {
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  };

  return (
    <div className={`${pageClass} min-h-screen transition-colors duration-300`}>
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 font-bold text-white shadow-lg">
              PH
            </div>
            <div>
              <p className="text-lg font-semibold">PriceHunt</p>
              <p className={`text-xs ${softText}`}>Price comparison, redesigned for conversion</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" className={darkMode ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "bg-white"} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />} {darkMode ? "Light" : "Dark"}
            </Button>
            <Button className={signedIn ? "bg-emerald-600 hover:bg-emerald-700" : ""} onClick={() => setShowLogin(true)}>
              <User className="mr-2 h-4 w-4" /> {signedIn ? "Dashboard" : "Sign in"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`rounded-[32px] p-6 sm:p-8 ${shellCard}`}>
            <Pill active={false} dark={darkMode}>
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Fresh homepage concept
            </Pill>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Compare smarter deals <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">without noisy results</span>
            </h1>
            <p className={`mt-5 max-w-2xl text-lg ${softText}`}>
              This refreshed UI is intentionally very different from the old design — more modern, more premium, and much better for conversions.
            </p>

            <div className={`mt-8 rounded-[28px] p-3 ${darkMode ? "bg-slate-900" : "bg-white shadow-xl shadow-slate-200/50"}`}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${softText}`} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search e.g. iPhone 15 Pro 256GB"
                    className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none ${
                      darkMode
                        ? "border-white/10 bg-slate-950 text-white placeholder:text-slate-500"
                        : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>
                <Button className="h-14 rounded-2xl bg-slate-900 px-6 text-white hover:bg-slate-800" onClick={() => setActiveProduct(filtered[0] || products[0])}>
                  Search now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button key={category} onClick={() => setSelectedCategory(category)}>
                    <Pill active={selectedCategory === category} dark={darkMode}>{category}</Pill>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Tracked stores", value: "500+" },
                { label: "Average savings", value: "£42" },
                { label: "Products monitored", value: "24k" },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-3xl p-5 ${mutedPanel}`}>
                  <p className={`text-sm ${softText}`}>{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

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
              <div className={`rounded-3xl p-4 ${mutedPanel}`}>
                <p className={`text-xs ${softText}`}>Retailers</p>
                <p className="mt-1 text-xl font-semibold">{activeProduct.retailers.length}+</p>
              </div>
              <div className={`rounded-3xl p-4 ${mutedPanel}`}>
                <p className={`text-xs ${softText}`}>Rating</p>
                <p className="mt-1 text-xl font-semibold">{activeProduct.rating} / 5</p>
              </div>
              <div className={`rounded-3xl p-4 ${mutedPanel}`}>
                <p className={`text-xs ${softText}`}>Price drop</p>
                <p className="mt-1 text-xl font-semibold">£{activeProduct.drop}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {trust.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className={`rounded-[28px] ${shellCard}`}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className={`mt-2 ${softText}`}>{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.92fr]">
          <Card className={`rounded-[32px] ${shellCard}`}>
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className={`text-sm ${softText}`}>Latest drops</p>
                  <h2 className="mt-1 text-3xl font-bold">A more visual deals section</h2>
                </div>
                <div className={`hidden rounded-full px-3 py-1 text-xs font-medium md:block ${darkMode ? "bg-white/5 text-slate-300" : "bg-slate-100 text-slate-700"}`}>
                  New homepage style
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {products.map((product) => {
                  const inWatchlist = watchlist.includes(product.id);
                  const alertOn = alerts.includes(product.id);
                  return (
                    <motion.div key={product.id} whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
                      <div className={`overflow-hidden rounded-[28px] border ${darkMode ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"}`}>
                        <div className={`bg-gradient-to-br ${product.accent} p-5 text-white`}>
                          <div className="flex items-center justify-between">
                            <Pill active>{product.badge}</Pill>
                            <div className="flex gap-2">
                              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15" onClick={() => toggleId(watchlist, setWatchlist, product.id)}>
                                <Heart className={`h-4 w-4 ${inWatchlist ? "fill-current text-rose-200" : "text-white"}`} />
                              </button>
                              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15" onClick={() => toggleId(alerts, setAlerts, product.id)}>
                                <Bell className={`h-4 w-4 ${alertOn ? "text-amber-200" : "text-white"}`} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-10 text-5xl">{product.emoji}</div>
                          <p className="mt-4 text-lg font-semibold">{product.name}</p>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-2xl font-bold">£{product.price}</p>
                              <p className="text-sm text-slate-400 line-through">£{product.oldPrice}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-1 text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-medium">{product.rating}</span>
                              </div>
                              <p className={`mt-1 text-xs ${softText}`}>Match confidence: High</p>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {product.retailers.slice(0, 3).map((retailer) => (
                              <Pill key={retailer} dark={darkMode}>{retailer}</Pill>
                            ))}
                          </div>
                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <Button className="rounded-2xl bg-slate-900 text-white hover:bg-slate-800" onClick={() => setActiveProduct(product)}>
                              View deal
                            </Button>
                            <Button variant="outline" className={darkMode ? "rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10" : "rounded-2xl bg-white"} onClick={() => toggleId(watchlist, setWatchlist, product.id)}>
                              {inWatchlist ? "Saved" : "Watchlist"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className={`rounded-[32px] ${shellCard}`}>
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={`text-sm ${softText}`}>Comparison panel</p>
                    <h2 className="mt-1 text-2xl font-bold">{activeProduct.name}</h2>
                  </div>
                  <Pill active dark={darkMode}>Best click potential</Pill>
                </div>

                <div className="mt-5 space-y-3">
                  {activeProduct.offers.map((offer, index) => (
                    <div key={`${offer.store}-${index}`} className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-3xl p-4 ${offer.match === "Exact" ? (darkMode ? "bg-emerald-500/10" : "bg-emerald-50") : mutedPanel}`}>
                      <div>
                        <div className="flex items-center gap-2 font-medium">
                          <Store className="h-4 w-4 text-slate-400" /> {offer.store}
                        </div>
                        <p className={`mt-1 text-sm ${softText}`}>Shipping: {offer.shipping}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£{offer.price}</p>
                      </div>
                      <div>
                        {offer.match === "Exact" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : offer.match === "Likely" ? (
                          <TrendingDown className="h-5 w-5 text-amber-500" />
                        ) : (
                          <X className="h-5 w-5 text-rose-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`rounded-[32px] ${shellCard}`}>
              <CardContent className="p-6 sm:p-7">
                <p className={`text-sm ${softText}`}>Price history</p>
                <h2 className="mt-1 text-2xl font-bold">A more compact chart card</h2>
                <div className={`mt-5 rounded-[28px] p-4 ${mutedPanel}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{activeProduct.name}</p>
                      <p className={`text-sm ${softText}`}>7-day movement</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-500">Lowest this week</p>
                      <p className="text-2xl font-bold">£{activeProduct.price}</p>
                    </div>
                  </div>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activeProduct.history} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="dealFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
                        <XAxis dataKey="day" tick={{ fill: darkMode ? "#cbd5e1" : "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: darkMode ? "#cbd5e1" : "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} domain={["dataMin - 15", "dataMax + 15"]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="url(#dealFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-[32px] p-6 ${shellCard}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={`text-sm ${softText}`}>UI only modal</p>
                <h3 className="text-2xl font-bold">Welcome back</h3>
              </div>
              <button className="rounded-2xl p-2 hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setShowLogin(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <input className={`h-12 w-full rounded-2xl border px-4 outline-none ${darkMode ? "border-white/10 bg-slate-900 text-white" : "border-slate-200 bg-white"}`} placeholder="Email" />
              <input type="password" className={`h-12 w-full rounded-2xl border px-4 outline-none ${darkMode ? "border-white/10 bg-slate-900 text-white" : "border-slate-200 bg-white"}`} placeholder="Password" />
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => { setSignedIn(true); setShowLogin(false); }}>Sign in</Button>
                <Button variant="outline" className={darkMode ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "bg-white"} onClick={() => { setSignedIn(true); setShowLogin(false); }}>Create account</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
