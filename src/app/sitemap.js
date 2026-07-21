import { SITE_URL } from "@/lib/site";
import { GENRES } from "@/lib/genres";
import { getTrendingMovies, getTopRatedMovies } from "@/lib/tmdb";

export const revalidate = 86400;

/**
 * Sitemap.
 *
 * Static routes and every genre page are always included. Movie pages are
 * seeded from the trending and top-rated lists — there are over a million
 * titles in TMDB and a sitemap is capped at 50,000 URLs, so listing the
 * pages that actually have search demand beats listing everything.
 */
export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/genres", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  ].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const genreRoutes = GENRES.map((g) => ({
    url: `${SITE_URL}/genre/${g.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  let movieRoutes = [];
  try {
    const [trending, topRated] = await Promise.all([
      getTrendingMovies(1),
      getTopRatedMovies(1),
    ]);
    const seen = new Set();
    movieRoutes = [...trending.results, ...topRated.results]
      .filter((m) => {
        if (seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      })
      .map((m) => ({
        url: `${SITE_URL}/movie/${m.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch {
    // A TMDB outage should degrade the sitemap, not break the build.
  }

  return [...staticRoutes, ...genreRoutes, ...movieRoutes];
}
