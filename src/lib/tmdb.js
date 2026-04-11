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
        // Exponential back-off: 300ms, 900ms
        await sleep(300 * attempt ** 2);
      }
    }
  }

  throw new Error(
    `TMDB network request failed after ${MAX_RETRIES} attempts. ${lastError?.message ?? ""}`.trim(),
  );
}

// Maps decade string → [gte, lte] date strings for TMDB discover
function decadeToDates(decade) {
  const ranges = {
    "2020s": ["2020-01-01", "2029-12-31"],
    "2010s": ["2010-01-01", "2019-12-31"],
    "2000s": ["2000-01-01", "2009-12-31"],
    "1990s": ["1990-01-01", "1999-12-31"],
    "1980s": ["1980-01-01", "1989-12-31"],
    "1970s": ["1970-01-01", "1979-12-31"],
  };
  return ranges[decade] || null;
}

export async function getMoviesByGenre(
  genre = "fetchTrending",
  year = "all",
  page = 1,
) {
  const safePage = Math.max(1, Number(page) || 1);
  const dates = year && year !== "all" ? decadeToDates(year) : null;

  // If a year filter is active on trending/top_rated, switch to discover
  // so we can apply date constraints (those endpoints ignore date params).
  const forcedDiscover =
    dates && (genre === "fetchTrending" || genre === "fetchTopRated");

  let path = "/trending/all/week";
  let query = {};

  if (forcedDiscover) {
    path = "/discover/movie";
    query = {
      sort_by:
        genre === "fetchTopRated" ? "vote_average.desc" : "popularity.desc",
      "vote_count.gte": genre === "fetchTopRated" ? "200" : "50",
      "primary_release_date.gte": dates[0],
      "primary_release_date.lte": dates[1],
      page: safePage,
    };
  } else if (genre === "fetchTopRated") {
    path = "/movie/top_rated";
    query = { page: safePage };
  } else if (genre !== "fetchTrending" && !isNaN(Number(genre))) {
    path = "/discover/movie";
    query = {
      with_genres: genre,
      sort_by: "popularity.desc",
      page: safePage,
      ...(dates && {
        "primary_release_date.gte": dates[0],
        "primary_release_date.lte": dates[1],
      }),
    };
  }
  // Note: /trending/all/week doesn't support pagination — always returns page 1.

  const data = await fetchFromTmdb(path, { query, revalidate: 300 });
  return {
    results: data.results || [],
    totalPages: Math.min(data.total_pages || 1, 500), // TMDB caps at 500
    currentPage: safePage,
  };
}

export async function getMovieById(id) {
  return fetchFromTmdb(`/movie/${id}`, { revalidate: 86400 });
}

// Fetch the current week's trending movies (used on the home page)
export async function getTrendingMovies(page = 1) {
  const data = await fetchFromTmdb("/trending/movie/week", {
    query: { page },
    revalidate: 300,
  });
  return {
    results: data.results || [],
    totalPages: Math.min(data.total_pages || 1, 500),
    currentPage: page,
  };
}

// Fetch TMDB top-rated movies list (used on the home page)
export async function getTopRatedMovies(page = 1) {
  const data = await fetchFromTmdb("/movie/top_rated", {
    query: { page },
    revalidate: 300,
  });
  return {
    results: data.results || [],
    totalPages: Math.min(data.total_pages || 1, 500),
    currentPage: page,
  };
}

export async function getTrendingMovieIds(limit = 20) {
  const data = await fetchFromTmdb("/trending/movie/week", {
    revalidate: 86400,
  });
  return (data.results || []).slice(0, limit).map((movie) => String(movie.id));
}

export async function searchMovies(query) {
  if (!query?.trim()) {
    return [];
  }

  const data = await fetchFromTmdb("/search/movie", {
    query: {
      query,
      page: "1",
      include_adult: "false",
    },
    noStore: true,
  });

  return data.results || [];
}
