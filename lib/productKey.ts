// Build a stable, URL-safe key from a product title so the same title
// always produces the same key — letting us group offers across retailers.
export function productKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
