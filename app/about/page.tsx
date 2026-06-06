import Link from 'next/link';
import InnerShell from '@/components/InnerShell';
import type { Metadata } from 'next';
import { Target, ShieldCheck, ChartBar, Filter, Award, Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About PriceHunt — UK Price Comparison',
  description: 'How PriceHunt helps UK shoppers find the lowest prices across 106+ retailers.',
};

export default function AboutPage() {
  return (
    <InnerShell>
      <div className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wide uppercase">
            About PriceHunt
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Built so UK shoppers stop overpaying.
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            PriceHunt compares prices for the same product across 106+ trusted UK retailers — and
            cuts the noise that Google Shopping doesn't.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
          {[
            { value: '106+',    label: 'UK retailers' },
            { value: '5,000+',  label: 'Product offers' },
            { value: '17',      label: 'Categories' },
            { value: '£42',     label: 'Avg saving / purchase' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Why we built this</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Searching for the cheapest washing machine on Google Shopping returns 30 results — except 12 are
          for the wrong model, 5 are accessories priced like the device, and the "lowest price" advertised
          comes from a seller you've never heard of. We thought: there has to be a better way.
        </p>
        <p className="text-slate-700 leading-relaxed mb-12">
          PriceHunt only shows offers from retailers UK shoppers actually trust. We label each match as
          <strong> Exact</strong>, <strong>Likely</strong>, or <strong>Variant</strong> so you can decide
          fast. And we show <strong>real 30-day price history</strong> so you can tell whether today's
          "deal" is genuine or fake markdown theatre.
        </p>

        {/* How it works */}
        <h2 className="text-2xl font-bold mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            { icon: Target,      title: '1. Search any product',  text: 'Type what you want. Our search is smart about UK products — "milk", "Pampers", "iPhone 17", "Aldi vs Lidl"…' },
            { icon: Filter,      title: '2. We filter results',    text: 'We strip accessories and wrong variants. Only relevant offers from retailers we vetted.' },
            { icon: ChartBar,    title: '3. Compare & save',       text: 'See every retailer side-by-side with price, delivery cost, rating, and 30-day price history.' },
          ].map(s => (
            <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Trust */}
        <h2 className="text-2xl font-bold mb-6">Who we work with</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          We list deals from retailers that pass our basic quality bar: UK-registered, in business 2+ years,
          and resolving customer service issues. We're partnered with:
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {[
            'Amazon UK','eBay','Argos','Currys','John Lewis','Tesco','Sainsbury\'s','ASDA','Morrisons',
            'Aldi','Lidl','Iceland','Ocado','M&S','Co-op','Waitrose','ASOS','Zara','H&M','Next','Primark',
            'JD Sports','Apple','Sky','BT','Virgin Media','EE','Vodafone','Three','O2','AutoTrader',
            'Compare the Market','Uber Eats','Deliveroo','Just Eat','IKEA','B&Q','Wayfair','Selfridges',
            'TK Maxx','Boohoo','River Island'
          ].map(name => (
            <span key={name} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
              {name}
            </span>
          ))}
        </div>

        {/* Affiliate disclosure */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <h3 className="font-bold text-amber-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> How we make money
          </h3>
          <p className="text-sm text-amber-800 mt-2 leading-relaxed">
            PriceHunt is free for shoppers. When you click "View Deal" and buy something, we sometimes
            get a small commission from the retailer — at no extra cost to you. This is industry-standard
            for price comparison sites. We <strong>don't promote retailers in exchange for better
            commission</strong>: our ranking is based purely on price and reliability.
          </p>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:opacity-90"
          >
            Start comparing →
          </Link>
        </div>
      </div>
    </InnerShell>
  );
}
