import InnerShell from '@/components/InnerShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — PriceHunt',
  description: 'How PriceHunt handles your data and cookies.',
};

export default function PrivacyPage() {
  return (
    <InnerShell>
      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

        <p className="mt-6">
          PriceHunt ("we", "us", "our") is a UK-based price comparison service. This Privacy Policy explains
          what information we collect about you when you use our website, and how we use it.
        </p>

        <h2 className="text-xl font-bold mt-8">What we collect</h2>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
          <li><strong>Account data</strong> — if you sign in: your name, email address, and avatar.</li>
          <li><strong>Browser data</strong> — wishlist items, recent searches, theme preference. All stored locally in your browser.</li>
          <li><strong>Analytics</strong> — anonymous page views and search terms, used to improve the service.</li>
          <li><strong>Cookies</strong> — essential cookies to keep you signed in. Optional analytics cookies if you consent.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8">Affiliate disclosure</h2>
        <p>
          When you click a "View Deal" link on PriceHunt, we may receive a commission from the retailer if you
          make a purchase. This <strong>does not affect the price you pay</strong>. We are a member of the
          Amazon Associates UK programme, eBay Partner Network, and Awin publisher network, among others.
        </p>

        <h2 className="text-xl font-bold mt-8">How we use your data</h2>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
          <li>To keep you signed in and remember your wishlist.</li>
          <li>To show you relevant deals based on what you've searched.</li>
          <li>To send price-drop alerts if you opt in.</li>
          <li>To detect and prevent fraud.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8">Who we share data with</h2>
        <p>
          We <strong>do not sell your personal data</strong>. We share limited data with these processors:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
          <li><strong>Vercel</strong> — hosts the site and serves pages.</li>
          <li><strong>Google / Facebook</strong> — only if you choose to sign in with them.</li>
          <li><strong>Retailer affiliate networks</strong> — when you click a deal link, the retailer sees a referral code (no personal data).</li>
        </ul>

        <h2 className="text-xl font-bold mt-8">Your rights (UK GDPR)</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your account and data</li>
          <li>Object to or restrict processing</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise these rights, email <a href="mailto:privacy@pricehunt.example" className="text-emerald-600">privacy@pricehunt.example</a>.
        </p>

        <h2 className="text-xl font-bold mt-8">Contact</h2>
        <p>
          Questions? Email <a href="mailto:hello@pricehunt.example" className="text-emerald-600">hello@pricehunt.example</a>.
        </p>
      </article>
    </InnerShell>
  );
}
