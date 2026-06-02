import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PriceHunt | Homepage Refresh",
  description: "Refreshed premium homepage UI for PriceHunt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
