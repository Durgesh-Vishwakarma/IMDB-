import Image from "next/image";
import Link from "next/link";
import { getMovieById, getTrendingMovieIds } from "@/lib/tmdb";
import { FaStar } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { MdPeople, MdLanguage, MdAccessTime } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";

// Pre-generate the top trending movie pages at build time (ISR/SSG).
// Any movie ID not in this list is rendered on-demand via SSR.
export async function generateStaticParams() {
  const ids = await getTrendingMovieIds(20);
  return ids.map((id) => ({ id }));
}

// dynamicParams = true (Next.js default) — movie IDs not pre-generated are
// fetched server-side on first request and then cached (SSR → ISR fallback).
export const dynamicParams = true;
export const revalidate = 3600; // re-validate cached movie pages every hour

export async function generateMetadata({ params }) {
  const movie = await getMovieById(params.id);
  const title = movie.title || movie.name || "Movie Details";
  const description =
    movie.overview?.slice(0, 160) ||
    "Read movie details, ratings and release date.";

  const ogImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(ogImage && {
        images: [{ url: ogImage, width: 1280, height: 720, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

// JSON-LD structured data helper for Google rich results
function MovieJsonLd({ movie }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title || movie.name,
    description: movie.overview,
    datePublished: movie.release_date || movie.first_air_date,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined,
    aggregateRating: movie.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: movie.vote_average.toFixed(1),
          ratingCount: movie.vote_count,
          bestRating: "10",
          worstRating: "1",
        }
      : undefined,
    genre: (movie.genres || []).map((g) => g.name),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function MoviePage({ params }) {
  const movieId = params.id;
  const movie = await getMovieById(movieId);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const genres = movie.genres || [];

  // Format runtime: e.g. 148 → "2h 28m"
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  // Uppercase original language code → readable label
  const language = movie.original_language
    ? movie.original_language.toUpperCase()
    : null;

  return (
    <>
      <MovieJsonLd movie={movie} />

      <div className="animate-fade-in pb-16">
        {/* Backdrop */}
        <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-[26rem]">
          {(movie.backdrop_path || movie.poster_path) && (
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movie.backdrop_path || movie.poster_path
              }`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              alt={`${movie.title || movie.name || ""} backdrop`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/30 to-transparent dark:from-slate-950 dark:via-slate-950/30" />
        </div>

        <div className="page-shell relative -mt-28 sm:-mt-36">
          {/* Back button */}
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-amber-600 dark:hover:text-amber-400"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
            {/* Poster */}
            {movie.poster_path && (
              <div className="w-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-slate-50 dark:ring-slate-950 sm:w-44">
                <Image
                  src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                  width={176}
                  height={264}
                  priority
                  sizes="(max-width: 640px) 128px, 176px"
                  className="w-full"
                  alt={movie.title || movie.name || "Movie poster"}
                />
              </div>
            )}

            {/* Title & Meta */}
            <div className="flex-1 pb-1">
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {movie.title || movie.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {rating && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400/15 px-3 py-1 text-sm font-semibold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                    <FaStar className="h-3.5 w-3.5" />
                    {rating} / 10
                  </span>
                )}
                {year && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <BiCalendar className="h-3.5 w-3.5" />
                    {year}
                  </span>
                )}
                {movie.vote_count > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <MdPeople className="h-3.5 w-3.5" />
                    {movie.vote_count.toLocaleString()} votes
                  </span>
                )}
                {runtime && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <MdAccessTime className="h-3.5 w-3.5" />
                    {runtime}
                  </span>
                )}
                {language && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <MdLanguage className="h-3.5 w-3.5" />
                    {language}
                  </span>
                )}
              </div>
              {genres.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <Link
                      key={g.id}
                      href={`/?genre=${g.id}`}
                      className="rounded-full border border-slate-200 px-3 py-0.5 text-xs font-medium text-slate-600 transition hover:border-amber-400 hover:text-amber-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-amber-500 dark:hover:text-amber-400"
                    >
                      {g.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Overview */}
          {movie.overview && (
            <div className="mt-8 max-w-3xl">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-500">
                Overview
              </h2>
              <p className="leading-8 text-slate-700 dark:text-slate-300">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
