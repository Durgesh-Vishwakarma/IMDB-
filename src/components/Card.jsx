import Link from "next/link";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { TMDB_IMAGE } from "@/lib/site";
import { movieTitle, movieYear, movieRating } from "@/lib/tmdb";

/**
 * Poster card.
 *
 * @param {{result: object, priority?: boolean}} props
 *   priority — set on the first row only. Marking every poster as priority
 *   defeats the purpose and hurts LCP rather than helping it.
 */
export default function Card({ result, priority = false }) {
  const poster = TMDB_IMAGE.poster(result.poster_path, "w500");
  const title = movieTitle(result);
  const year = movieYear(result);
  const rating = movieRating(result);

  return (
    <article className="group">
      <Link
        href={`/movie/${result.id}`}
        className="block rounded-card focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-card bg-elevated shadow-card ring-1 ring-line/60 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lift">
          {poster ? (
            <Image
              src={poster}
              alt={`${title} poster`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, (max-width: 1536px) 18vw, 15vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-1 p-3 text-center">
              <span aria-hidden className="text-2xl opacity-40">
                🎞️
              </span>
              <span className="text-xs text-subtle">No poster</span>
            </div>
          )}

          {/* Rating badge */}
          {rating && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              <FiStar aria-hidden className="h-3 w-3 fill-current text-gold" />
              <span className="sr-only">Rated </span>
              {rating}
            </div>
          )}

          {/* Overview on hover — desktop affordance only, all of this info is
              also present as real text below the card for small screens. */}
          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="clamp-3 p-3 text-xs leading-relaxed text-white/85">
              {result.overview || "No synopsis available for this title yet."}
            </p>
          </div>
        </div>
      </Link>

      <div className="mt-2.5">
        <h3 className="clamp-2 text-sm font-semibold leading-snug text-ink">
          <Link href={`/movie/${result.id}`} className="rounded hover:text-gold">
            {title}
          </Link>
        </h3>
        {year && (
          <p className="mt-0.5 text-xs text-subtle">
            <time dateTime={year}>{year}</time>
          </p>
        )}
      </div>
    </article>
  );
}
