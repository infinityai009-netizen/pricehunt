// Generates a deterministic fake 30-day price history per product key.
// In production replace this with a daily snapshot table in Postgres.

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export interface PricePoint {
  date: string;   // YYYY-MM-DD
  price: number;
}

export function fakePriceHistory(productKey: string, currentPrice: number, days = 30): PricePoint[] {
  const points: PricePoint[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const seed = hash(productKey + i);
    // Wobble ±8% around the current price, with a slight downward drift over time
    const drift = (i / days) * 0.05;
    const wobble = ((seed % 17) - 8) / 100;
    const price = Math.max(1, Math.round(currentPrice * (1 + drift + wobble) * 100) / 100);
    points.push({ date: d.toISOString().slice(0, 10), price });
  }
  // Force the final point to equal currentPrice so the chart "lands" correctly
  points[points.length - 1].price = currentPrice;
  return points;
}
