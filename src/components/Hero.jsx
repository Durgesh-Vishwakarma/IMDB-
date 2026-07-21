import Link from "next/link";
import Image from "next/image";
import { FiStar, FiArrowRight } from "react-icons/fi";
import SearchBox from "./SearchBox";
import { TMDB_IMAGE } from "@/lib/site";
import { movieTitle, movieYear, movieRating } from "@/lib/tmdb";

/**
 * Home page hero.
 *
 * The backdrop is the week's top trending film, so the page has a different
 * face each week without any editorial work. The <h1> is real text over the
 * image rather than baked into it — a heading rendered as an image is
 * invisible to both crawlers and screen readers.
 */
export default function Hero({ movie }) {
  const backdrop = TMDB_IMAGE.backdrop(movie?.backdrop_path, "w1280");
  const title = movie ? movieTitle(movie) : null;
  const year = movie ? movieYear(movie) : null;
  const rating = movie ? movieRating(movie) : null;

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      {backdrop && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backdrop}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-[0.18] dark:opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-canvas/85 to-canvas" />
        </div>
      )}

      <div className="shell py-16 sm:py-20 lg:py-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Updated hourly from The Movie Database
        </p>

        <h1 className="max-w-3xl font-display text-display-lg font-extrabold text-ink">
          Stop scrolling.{" "}
          <span className="text-gold">Start watching.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Search a million films, filter by genre and decade, and get the
          ratings, runtime and cast in one screen. Free, instant, and no account
          required.
        </p>

        <div className="mt-8 max-w-xl">
          <SearchBox />
        </div>

        {movie && (
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-subtle">Trending this week</span>
            <Link
              href={`/movie/${movie.id}`}
              className="group inline-flex items-center gap-2 font-semibold text-ink"
            >
              {title}
              {year && <span className="font-normal text-subtle">({year})</span>}
              {rating && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-ink">
                  <FiStar aria-hidden className="h-3 w-3 fill-current text-gold" />
                  {rating}
                </span>
              )}
              <FiArrowRight
                aria-hidden
                className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
