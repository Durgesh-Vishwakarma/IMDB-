import { DECADES, SORTS } from "./genres";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

// Transient error codes that are safe to retry (e.g. ECONNRESET on Windows)
const RETRYABLE_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "ENOTFOUND",
  "UND_ERR_SOCKET",
]);

function buildUrl(path, query = {}) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...query,
  });

  return `${TMDB_BASE_URL}${path}?${searchParams.toString()}`;
}

function isRetryable(err) {
  const code = err?.cause?.code ?? err?.code ?? "";
  return RETRYABLE_CODES.has(code);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFromTmdb(
  path,
  { query = {}, revalidate = 300, noStore = false } = {},
) {
  if (!API_KEY) {
    throw new Error(
      "API_KEY is missing. Add it to your environment variables.",
    );
  }

  const fetchOptions = noStore
    ? { cache: "no-store" }
    : { next: { revalidate } };

  const MAX_RETRIES = 3;
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(buildUrl(path, query), fetchOptions);

      if (!response.ok) {
        // 404 is a real answer, not a failure — let callers handle notFound().
        if (response.status === 404) {
          const err = new Error("TMDB resource not found");
          err.status = 404;
          throw err;
        }
        // 429 = rate-limited: back off and retry
        if (response.status === 429 && attempt < MAX_RETRIES) {
          const retryAfter = Number(response.headers.get("Retry-After") ?? 1);
          await sleep(retryAfter * 1000);
          continue;
        }
        throw new Error(`TMDB request failed: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      lastError = err;

      // Don't retry non-network errors (e.g. bad status already thrown above)
      if (!isRetryable(err)) throw err;

      if (attempt < MAX_RETRIES) {
        // Exponential back-off: 300ms, 1200ms
        await sleep(300 * attempt ** 2);
      }
    }
  }

  throw new Error(
    `TMDB network request failed after ${MAX_RETRIES} attempts. ${lastError?.message ?? ""}`.trim(),
  );
}

/** Maps a decade id ("1990s") to TMDB primary_release_date bounds. */
function decadeToDates(decade) {
  if (!decade || decade === "all") return null;
  const start = Number(String(decade).slice(0, 4));
  if (!DECADES.some((d) => d.id === decade) || Number.isNaN(start)) return null;
  return [`${start}-01-01`, `${start + 9}-12-31`];
}

function tmdbSort(sortId) {
  return SORTS.find((s) => s.id === sortId)?.tmdb ?? SORTS[0].tmdb;
}

function normalizeList(data, page) {
  return {
    results: data.results || [],
    totalPages: Math.min(data.total_pages || 1, 500), // TMDB caps at 500
    totalResults: data.total_results || 0,
    currentPage: page,
  };
}

/**
 * Discover movies within a genre, optionally constrained by decade and sort.
 * Used by every /genre/<slug> page.
 */
export async function getMoviesByGenreId(
  genreId,
  { decade = "all", sort = "popular", page = 1 } = {},
) {
  const safePage = Math.max(1, Math.min(Number(page) || 1, 500));
  const dates = decadeToDates(decade);
  const sortBy = tmdbSort(sort);

  const query = {
    with_genres: String(genreId),
    sort_by: sortBy,
    page: String(safePage),
    include_adult: "false",
    // Without a vote floor, "highest rated" returns obscure titles with a
    // single 10/10 vote. 200 is TMDB's own threshold for its top-rated list.
    "vote_count.gte": sort === "rating" ? "200" : "25",
    ...(dates && {
      "primary_release_date.gte": dates[0],
      "primary_release_date.lte": dates[1],
    }),
  };

  const data = await fetchFromTmdb("/discover/movie", {
    query,
    revalidate: 3600,
  });
  return normalizeList(data, safePage);
}

/** This week's trending movies — the home page hero and first rail. */
export async function getTrendingMovies(page = 1) {
  const safePage = Math.max(1, Number(page) || 1);
  const data = await fetchFromTmdb("/trending/movie/week", {
    query: { page: String(safePage) },
    revalidate: 3600,
  });
  return normalizeList(data, safePage);
}

/** TMDB's all-time top-rated list. */
export async function getTopRatedMovies(page = 1) {
  const safePage = Math.max(1, Number(page) || 1);
  const data = await fetchFromTmdb("/movie/top_rated", {
    query: { page: String(safePage) },
    revalidate: 86400,
  });
  return normalizeList(data, safePage);
}

/** Movies currently in cinemas. */
export async function getNowPlayingMovies(page = 1) {
  const safePage = Math.max(1, Number(page) || 1);
  const data = await fetchFromTmdb("/movie/now_playing", {
    query: { page: String(safePage), region: "US" },
    revalidate: 21600,
  });
  return normalizeList(data, safePage);
}

/**
 * Full movie record in a single request.
 *
 * append_to_response bundles credits, videos, similar titles and release
 * certifications into one round-trip instead of five — which matters both for
 * TTFB and for staying inside TMDB's rate limit during static generation.
 */
export async function getMovieById(id) {
  return fetchFromTmdb(`/movie/${id}`, {
    query: {
      append_to_response: "credits,videos,similar,release_dates,external_ids",
    },
    revalidate: 86400,
  });
}

/** Movie ids to pre-render at build time (ISR seeds the rest on demand). */
export async function getTrendingMovieIds(limit = 40) {
  try {
    const [week, top] = await Promise.all([
      fetchFromTmdb("/trending/movie/week", { revalidate: 86400 }),
      fetchFromTmdb("/movie/top_rated", { revalidate: 86400 }),
    ]);
    const ids = [...(week.results || []), ...(top.results || [])].map((m) =>
      String(m.id),
    );
    return [...new Set(ids)].slice(0, limit);
  } catch {
    // Never fail the build over a pre-render list — fall back to pure SSR.
    return [];
  }
}

export async function searchMovies(query, page = 1) {
  if (!query?.trim()) {
    return { results: [], totalPages: 1, totalResults: 0, currentPage: 1 };
  }

  const safePage = Math.max(1, Number(page) || 1);
  const data = await fetchFromTmdb("/search/movie", {
    query: {
      query,
      page: String(safePage),
      include_adult: "false",
    },
    noStore: true,
  });

  return normalizeList(data, safePage);
}

/* ------------------------------------------------------------------ */
/* Presentation helpers — shared by cards, detail pages and JSON-LD    */
/* ------------------------------------------------------------------ */

export function movieTitle(movie) {
  return movie?.title || movie?.name || "Untitled";
}

export function movieYear(movie) {
  return (
    (movie?.release_date || movie?.first_air_date || "").slice(0, 4) || null
  );
}

export function movieRating(movie) {
  return movie?.vote_average ? Number(movie.vote_average).toFixed(1) : null;
}

/** 148 -> "2h 28m" */
export function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h${m ? ` ${m}m` : ""}` : `${m}m`;
}

/** "2014-11-05" -> "5 November 2014" */
export function formatDate(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatMoney(amount) {
  if (!amount || amount < 1000) return null;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
  // Compact notation emits "$165.0M" for round figures. Intl's
  // trailingZeroDisplay option would handle this but has patchy support, so
  // strip the redundant ".0" directly.
  return formatted.replace(/\.0(?=[A-Z]?$)/, "");
}

/** US content rating (PG-13, R…) from the appended release_dates payload. */
export function certification(movie) {
  const us = movie?.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
  const cert = us?.release_dates?.find((r) => r.certification)?.certification;
  return cert || null;
}

export function directors(movie) {
  return (movie?.credits?.crew || [])
    .filter((c) => c.job === "Director")
    .map((c) => c.name);
}

export function writers(movie) {
  const jobs = new Set(["Screenplay", "Writer", "Story"]);
  const names = (movie?.credits?.crew || [])
    .filter((c) => jobs.has(c.job))
    .map((c) => c.name);
  return [...new Set(names)];
}

export function topCast(movie, limit = 10) {
  return (movie?.credits?.cast || []).slice(0, limit);
}

/** Best available YouTube trailer key, if TMDB has one. */
export function trailerKey(movie) {
  const videos = movie?.videos?.results || [];
  const pick =
    videos.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
    ) ||
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videos.find((v) => v.site === "YouTube" && v.type === "Teaser");
  return pick?.key ?? null;
}
