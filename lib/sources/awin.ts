import type { Product, SearchParams } from '../types';

// ----------------------------------------------------------------------------
// Awin product feed loader — STUB
// ----------------------------------------------------------------------------
// Awin (https://www.awin.com) gives you access to UK retailers like Argos,
// Currys, John Lewis, Boots, AO, B&Q, ASOS, etc. Once approved:
//
//   1. Join the merchants you want.
//   2. Download their product feeds (CSV/XML) from the Awin dashboard.
//   3. Store the feeds in a database (Postgres + a daily cron job).
//   4. Replace the body of searchAwin() with a DB query.
//
// You can also use the Awin Product Data API (paid tier).
// ----------------------------------------------------------------------------

export async function searchAwin(params: SearchParams): Promise<Product[]> {
  const id = process.env.AWIN_PUBLISHER_ID;
  const token = process.env.AWIN_API_TOKEN;
  if (!id || !token) return [];

  // TODO: load and search merchant feeds.
  console.warn('[awin] product feed loader not yet implemented — see lib/sources/awin.ts');
  return [];
}
