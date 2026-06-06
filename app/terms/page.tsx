import InnerShell from '@/components/InnerShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — PriceHunt',
  description: 'Terms of using PriceHunt.',
};

export default function TermsPage() {
  return (
    <InnerShell>
      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

        <p className="mt-6">
          By using PriceHunt you agree to these terms. Please read them carefully.
        </p>

        <h2 className="text-xl font-bold mt-8">What we do</h2>
        <p>
          PriceHunt is a price-comparison service. We aggregate publicly available product and price
          information from third-party retailers in the UK and display it in a single search interface.
          We do not sell products ourselves.
        </p>

        <h2 className="text-xl font-bold mt-8">Prices and accuracy</h2>
        <p>
          We make a reasonable effort to keep prices accurate, but they change frequently.
          Always verify the price on the retailer's own website before purchasing.
          PriceHunt is not responsible for any discrepancy between the price shown here and the
          price at checkout.
        </p>

        <h2 className="text-xl font-bold mt-8">Purchases</h2>
        <p>
          All purchases are made directly with the retailer, not PriceHunt. Returns, refunds, warranties,
          and customer support are the responsibility of the retailer. PriceHunt has no involvement in
          the transaction or its fulfilment.
        </p>

        <h2 className="text-xl font-bold mt-8">Affiliate commissions</h2>
        <p>
          When you click "View Deal" and make a purchase, we may receive a small commission from the
          retailer. This does not change the price you pay. We are independent — listing a retailer
          does not constitute endorsement, and we do not promote retailers in exchange for higher
          commission rates above our standard ranking criteria.
        </p>

        <h2 className="text-xl font-bold mt-8">Acceptable use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-700">
          <li>Scrape, copy, or republish our content without permission</li>
          <li>Use the service for illegal purposes</li>
          <li>Attempt to bypass our security or access non-public areas of the site</li>
          <li>Impersonate other users</li>
        </ul>

        <h2 className="text-xl font-bold mt-8">Limitation of liability</h2>
        <p>
          PriceHunt is provided "as is", with no warranties express or implied. To the maximum extent
          permitted by UK law, we are not liable for any loss arising from your use of the service.
        </p>

        <h2 className="text-xl font-bold mt-8">Governing law</h2>
        <p>
          These terms are governed by the laws of England and Wales. Any disputes shall be resolved
          in the courts of England and Wales.
        </p>

        <h2 className="text-xl font-bold mt-8">Contact</h2>
        <p>
          Questions? Email <a href="mailto:hello@pricehunt.example" className="text-emerald-600">hello@pricehunt.example</a>.
        </p>
      </article>
    </InnerShell>
  );
}
