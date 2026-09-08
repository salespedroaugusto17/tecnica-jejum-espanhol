/**
 * UTM parameter propagation utility.
 *
 * Captures UTM parameters from the landing page URL on first load and stores
 * them so they survive internal SPA navigation (quiz steps, etc.).
 * When the user clicks the CTA, the stored UTMs are appended to the checkout URL.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Cached UTM params captured on first call. */
let cachedUtms: Record<string, string> | null = null;

/**
 * Reads UTM parameters from the current page URL and caches them.
 * Subsequent calls return the cached copy so internal SPA navigation
 * (which may strip the query string) doesn't lose the values.
 */
function getUtmParams(): Record<string, string> {
  if (cachedUtms !== null) return cachedUtms;

  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
    }
  }

  cachedUtms = utms;
  return utms;
}

/**
 * Appends the captured UTM parameters to a given checkout URL.
 *
 * @example
 * // User landed on ?utm_source=facebook&utm_campaign=teste
 * buildCheckoutUrl("https://pay.cakto.com.br/3368npu_998861")
 * // → "https://pay.cakto.com.br/3368npu_998861?utm_source=facebook&utm_campaign=teste"
 */
export function buildCheckoutUrl(baseUrl: string): string {
  const utms = getUtmParams();
  const entries = Object.entries(utms);

  if (entries.length === 0) return baseUrl;

  try {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const url = new URL(baseUrl, origin);
    for (const [key, value] of entries) {
      url.searchParams.set(key, value);
    }
    if (baseUrl.startsWith("/")) {
      return url.pathname + url.search;
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/**
 * Call this early (e.g. in the root component or on app mount) to ensure
 * UTM parameters are captured before any SPA navigation strips them.
 */
export function captureUtmParams(): void {
  getUtmParams();
}
