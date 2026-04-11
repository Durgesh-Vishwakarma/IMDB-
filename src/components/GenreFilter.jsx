"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";

const GENRES = [
  { id: "fetchTrending", label: "🔥 Trending" },
  { id: "fetchTopRated", label: "⭐ Top Rated" },
  { id: "28", label: "💥 Action" },
  { id: "35", label: "😂 Comedy" },
  { id: "27", label: "👻 Horror" },
  { id: "878", label: "🚀 Sci-Fi" },
  { id: "18", label: "🎭 Drama" },
  { id: "10749", label: "❤️ Romance" },
  { id: "53", label: "🔪 Thriller" },
  { id: "16", label: "🎨 Animation" },
  { id: "14", label: "🧙 Fantasy" },
  { id: "80", label: "🕵️ Crime" },
  { id: "12", label: "🧭 Adventure" },
  { id: "9648", label: "🔎 Mystery" },
  { id: "10751", label: "👨‍👩‍👧 Family" },
  { id: "36", label: "📜 History" },
];

export default function GenreFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrollRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  const current = searchParams.get("genre") || "fetchTrending";
  const year = searchParams.get("year");

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
    }
  };

  const handleGenre = (genreId) => {
    const params = new URLSearchParams();
    params.set("genre", genreId);
    if (year) params.set("year", year);
    // startTransition keeps the current page visible while the new page loads
    startTransition(() => router.push(`/?${params.toString()}`));
  };

  return (
    <div className="page-shell pb-3 pt-1">
      <div className="relative flex items-center gap-1">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-600 dark:hover:bg-slate-700"
        >
          <FiChevronLeft className="h-4 w-4 text-slate-500 dark:text-slate-300" />
        </button>

        {/* Scrollable chip strip */}
        <div
          ref={scrollRef}
          className={`flex flex-1 gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
        >
          {GENRES.map((g) => {
            const isActive = current === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleGenre(g.id)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/30 dark:bg-amber-500 dark:text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                }`}
              >
                {isActive && isPending ? (
                  <span className="inline-flex items-center gap-1.5">
                    <FiLoader className="h-3.5 w-3.5 animate-spin" />
                    {g.label}
                  </span>
                ) : (
                  g.label
                )}
              </button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-600 dark:hover:bg-slate-700"
        >
          <FiChevronRight className="h-4 w-4 text-slate-500 dark:text-slate-300" />
        </button>
      </div>
    </div>
  );
}
