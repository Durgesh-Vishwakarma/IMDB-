import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function Card({ result }) {
  const imagePath = result.poster_path || result.backdrop_path;
  const rating = result.vote_average ? result.vote_average.toFixed(1) : null;
  const year = (result.release_date || result.first_air_date || "").slice(0, 4);

  return (
    <Link href={`/movie/${result.id}`} className="group block">
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-black/20 dark:bg-slate-800 dark:group-hover:shadow-black/50">
        {imagePath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${imagePath}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={result.title || result.name || ""}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400 text-sm">
            No Image
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Rating badge */}
        {rating && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur-sm">
            <FaStar className="h-3 w-3" />
            {rating}
          </div>
        )}

        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="truncate text-sm font-bold text-white">
            {result.title || result.name}
          </p>
          {year && <p className="mt-0.5 text-xs text-slate-300">{year}</p>}
        </div>
      </div>

      {/* Info below card */}
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
          {result.title || result.name}
        </h3>
        {year && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {year}
          </p>
        )}
      </div>
    </Link>
  );
}
