'use client';

export interface Notification {
  id: string;
  title: string;
  body: string;
  url?: string;
  emoji: string;
  ts: number;
}

// Hardcoded sample promotions. In production fetch from a CMS / API.
const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: 'n1', emoji: '🛒',  title: 'Tesco 20% off Clubcard prices', body: 'Use your Clubcard for 20% off groceries this weekend.', url: 'https://www.tesco.com', ts: Date.now() - 1000 * 60 * 15 },
  { id: 'n2', emoji: '🎁',  title: 'Amazon Lightning Deals live', body: 'Up to 60% off electronics. Selected items only.', url: 'https://www.amazon.co.uk', ts: Date.now() - 1000 * 60 * 60 },
  { id: 'n3', emoji: '📺',  title: 'Currys: £200 off Samsung 65" QLED', body: 'Was £1199, now £999 — limited stock.', url: 'https://www.currys.co.uk', ts: Date.now() - 1000 * 60 * 60 * 3 },
  { id: 'n4', emoji: '👗',  title: 'Shein 70% off summer fashion', body: 'New dresses, swimwear and accessories.', url: 'https://uk.shein.com', ts: Date.now() - 1000 * 60 * 60 * 6 },
  { id: 'n5', emoji: '🍔',  title: 'Argos Free Click & Collect', body: 'No delivery fees this week on all orders.', url: 'https://www.argos.co.uk', ts: Date.now() - 1000 * 60 * 60 * 12 },
  { id: 'n6', emoji: '🎮',  title: 'PlayStation 5 deal at John Lewis', body: 'PS5 Slim + Spider-Man 2 bundle £499 with 2-year guarantee.', url: 'https://www.johnlewis.com', ts: Date.now() - 1000 * 60 * 60 * 18 },
  { id: 'n7', emoji: '⚡',  title: 'Temu: New users get £100 coupon', body: 'Spin to claim free shipping + coupon bundle.', url: 'https://www.temu.com', ts: Date.now() - 1000 * 60 * 60 * 24 },
  { id: 'n8', emoji: '🏠',  title: 'IKEA Family member offers', body: 'Save up to 50% on selected furniture.', url: 'https://www.ikea.com/gb', ts: Date.now() - 1000 * 60 * 60 * 30 },
];

const READ_KEY = 'pricehunt-notifs-read-v1';

function readSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
}

function writeSet(set: Set<string>): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(READ_KEY, JSON.stringify(Array.from(set)));
  window.dispatchEvent(new Event('notifs-changed'));
}

export function getNotifications(): Notification[] {
  return [...SAMPLE_NOTIFICATIONS].sort((a, b) => b.ts - a.ts);
}

export function isRead(id: string): boolean {
  return readSet().has(id);
}

export function markRead(id: string): void {
  const set = readSet();
  set.add(id);
  writeSet(set);
}

export function markAllRead(): void {
  const set = new Set(SAMPLE_NOTIFICATIONS.map(n => n.id));
  writeSet(set);
}

export function unreadCount(): number {
  const set = readSet();
  return SAMPLE_NOTIFICATIONS.filter(n => !set.has(n.id)).length;
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
