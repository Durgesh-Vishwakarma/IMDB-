/**
 * Central site configuration.
 *
 * SITE_URL resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  — set this to your real domain in production.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production domain Vercel
 *      injects (does NOT change per-deployment, unlike VERCEL_URL).
 *   3. VERCEL_URL — per-deployment preview URL.
 *   4. localhost fallback for `next dev`.
 *
 * Canonical tags, the sitemap, robots.txt and JSON-LD all read from here, so
 * pointing the site at a custom domain later is a one-line env change.
 */
function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    "http://localhost:3000",
  ];

  const url = candidates.find(Boolean);
  return url.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

export const SITE = {
  name: "MovieHub",
  /** Used in <title> templates and structured data. */
  legalName: "MovieHub",
  tagline: "Find your next film in seconds",
  /** Max 155 chars — the default meta description for the site. */
  description:
    "Browse trending films, all-time top-rated classics and every major genre. Ratings, runtimes, cast and release dates for over a million titles — free, fast, no sign-up.",
  locale: "en_US",
  twitter: "@moviehub",
  url: SITE_URL,
};

/** Absolute URL helper — required for canonicals, sitemaps and OG tags. */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const TMDB_IMAGE = {
  poster: (p, size = "w500") =>
    p ? `https://image.tmdb.org/t/p/${size}${p.startsWith("/") ? p : `/${p}`}` : null,
  backdrop: (p, size = "w1280") =>
    p ? `https://image.tmdb.org/t/p/${size}${p.startsWith("/") ? p : `/${p}`}` : null,
  profile: (p, size = "w185") =>
    p ? `https://image.tmdb.org/t/p/${size}${p.startsWith("/") ? p : `/${p}`}` : null,
};
