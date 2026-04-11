import Results from "@/components/Results";
import Pagination from "@/components/Pagination";
import { getMoviesByGenre } from "@/lib/tmdb";
import { Suspense } from "react";

export const revalidate = 300;

const GENRE_LABELS = {
  fetchTrending: "🔥 Trending This Week",
  fetchTopRated: "⭐ Top Rated Movies",
  28: "💥 Action",
  35: "😂 Comedy",
  27: "👻 Horror",
  878: "🚀 Sci-Fi",
  18: "🎭 Drama",
  10749: "❤️ Romance",
  53: "🔪 Thriller",
  16: "🎨 Animation",
  14: "🧙 Fantasy",
  80: "🕵️ Crime",
  12: "🧭 Adventure",
  9648: "🔎 Mystery",
  10751: "👨‍👩‍👧 Family",
  36: "📜 History",
};

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";
  const year = searchParams.year || "all";
  const page = Number(searchParams.page) || 1;

  const { results, totalPages, currentPage } = await getMoviesByGenre(
    genre,
    year,
    page,
  );

  const label = GENRE_LABELS[genre] || GENRE_LABELS[Number(genre)] || "Browse";
  const yearLabel = year !== "all" ? year : null;

  return (
    <main>
      <div className="page-shell flex items-center gap-3 pt-2">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {label}
          {yearLabel && (
            <span className="ml-2 text-amber-500 dark:text-amber-400">
              · {yearLabel}
            </span>
          )}
        </h2>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {results.length} titles
        </span>
      </div>

      <Results results={results} />

      <Suspense fallback={null}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </main>
  );
}
