import './globals.css';
import type { Metadata } from 'next';
import AuthModal from '@/components/AuthModal';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'PriceHunt — Compare prices across 106+ UK retailers',
  description:
    'Search once, compare everywhere. Find the best price across Amazon, eBay, Argos, Currys, John Lewis, Tesco, Temu, Shein, EE, Sky, AutoTrader and more. Save up to £42 per purchase.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Providers>
          {children}
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}
