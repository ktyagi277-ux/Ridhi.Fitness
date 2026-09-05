/**
 * Tiny in-memory rate limiter for the lead endpoint (per server instance).
 * Stops a bot from flooding the Google Sheet with fake leads.
 */
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_HITS = 5; // submissions per IP per window

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    // opportunistic cleanup so the map never grows unbounded
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}
