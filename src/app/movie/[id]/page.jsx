import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiStar, FiPlay, FiExternalLink } from "react-icons/fi";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import { slugForGenreId } from "@/lib/genres";
import { SITE, absoluteUrl, TMDB_IMAGE } from "@/lib/site";
import {
  getMovieById,
  getTrendingMovieIds,
  movieTitle,
  movieYear,
  movieRating,
  formatRuntime,
  formatDate,
  formatMoney,
  certification,
  directors,
  writers,
  topCast,
  trailerKey,
} from "@/lib/tmdb";

// Pre-render the titles with real search demand; everything else is generated
// on first request and then cached (SSR -> ISR).
export async function generateStaticParams() {
  const ids = await getTrendingMovieIds(40);
  return ids.map((id) => ({ id }));
}

export const dynamicParams = true;
export const revalidate = 86400;

/** Shared fetch — Next dedupes these two calls within a single render. */
async function loadMovie(id) {
  try {
    return await getMovieById(id);
  } catch (err) {
    if (err?.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }) {
  const movie = await loadMovie(params.id);
  if (!movie) return { title: "Film not found" };

  const title = movieTitle(movie);
  const year = movieYear(movie);
  const rating = movieRating(movie);
  const runtime = formatRuntime(movie.runtime);
  const director = directors(movie)[0];

  // A description built from real attributes outperforms a truncated synopsis:
  // it front-loads the facts people search for and never cuts mid-sentence.
  const facts = [
    year,
    movie.genres?.[0]?.name,
    runtime,
    director && `dir. ${director}`,
    rating && `rated ${rating}/10`,
  ].filter(Boolean);

  const description = `${title}${year ? ` (${year})` : ""} — ${facts
    .slice(1)
    .join(", ")}. ${(movie.overview || "").slice(0, 110).trim()}`
    .replace(/\s+/g, " ")
    .slice(0, 158);

  const ogImage =
    TMDB_IMAGE.backdrop(movie.backdrop_path, "w1280") ||
    TMDB_IMAGE.poster(movie.poster_path, "w780");

  const canonical = `/movie/${movie.id}`;

  return {
    title: `${title}${year ? ` (${year})` : ""}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title}${year ? ` (${year})` : ""}`,
      description,
      url: absoluteUrl(canonical),
      type: "video.movie",
      siteName: SITE.name,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1280, height: 720, alt: `${title} still` }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}${year ? ` (${year})` : ""}`,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

function Fact({ label, children }) {
  if (!children) return null;
  return (
    <div className="border-t border-line py-3 first:border-t-0 sm:border-t-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-ink">{children}</dd>
    </div>
  );
}

export default async function MoviePage({ params }) {
  const movie = await loadMovie(params.id);
  if (!movie) notFound();

  const title = movieTitle(movie);
  const year = movieYear(movie);
  const rating = movieRating(movie);
  const runtime = formatRuntime(movie.runtime);
  const cert = certification(movie);
  const released = formatDate(movie.release_date);
  const budget = formatMoney(movie.budget);
  const revenue = formatMoney(movie.revenue);
  const crewDirectors = directors(movie);
  const crewWriters = writers(movie).slice(0, 3);
  const cast = topCast(movie, 10);
  const trailer = trailerKey(movie);
  const similar = (movie.similar?.results || []).slice(0, 12);
  const genres = movie.genres || [];
  const backdrop = TMDB_IMAGE.backdrop(movie.backdrop_path, "w1280");
  const poster = TMDB_IMAGE.poster(movie.poster_path, "w500");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Movie",
          name: title,
          url: absoluteUrl(`/movie/${movie.id}`),
          description: movie.overview,
          image: TMDB_IMAGE.poster(movie.poster_path, "w780"),
          datePublished: movie.release_date,
          duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
          contentRating: cert,
          inLanguage: movie.original_language,
          genre: genres.map((g) => g.name),
          director: crewDirectors.map((n) => ({ "@type": "Person", name: n })),
          author: crewWriters.map((n) => ({ "@type": "Person", name: n })),
          actor: cast.slice(0, 6).map((c) => ({ "@type": "Person", name: c.name })),
          aggregateRating:
            movie.vote_average && movie.vote_count >= 5
              ? {
                  "@type": "AggregateRating",
                  ratingValue: Number(movie.vote_average).toFixed(1),
                  ratingCount: movie.vote_count,
                  bestRating: 10,
                  worstRating: 1,
                }
              : undefined,
          trailer: trailer
            ? {
                "@type": "VideoObject",
                name: `${title} trailer`,
                embedUrl: `https://www.youtube.com/embed/${trailer}`,
                thumbnailUrl: TMDB_IMAGE.backdrop(movie.backdrop_path, "w780"),
                uploadDate: movie.release_date,
                description: `Official trailer for ${title}.`,
              }
            : undefined,
        }}
      />

      <article>
        {/* Backdrop */}
        <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-96">
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/20" />
        </div>

        <div className="shell relative -mt-24 sm:-mt-32">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              ...(genres[0] && slugForGenreId(genres[0].id)
                ? [
                    {
                      name: genres[0].name,
                      href: `/genre/${slugForGenreId(genres[0].id)}`,
                    },
                  ]
                : []),
              { name: title },
            ]}
          />

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end">
            {poster && (
              <div className="w-32 flex-shrink-0 overflow-hidden rounded-panel shadow-lift ring-1 ring-line sm:w-48">
                <Image
                  src={poster}
                  alt={`${title} poster`}
                  width={192}
                  height={288}
                  priority
                  sizes="(max-width: 640px) 128px, 192px"
                  className="w-full"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="font-display text-display-md font-extrabold text-ink">
                {title}
              </h1>

              {movie.tagline && (
                <p className="mt-2 text-base italic text-muted">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Key facts as an inline list — scannable, and each item is
                  real text rather than an icon-only badge. */}
              <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                {rating && (
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 font-bold text-ink">
                    <FiStar aria-hidden className="h-3.5 w-3.5 fill-current text-gold" />
                    {rating}
                    <span className="font-normal text-subtle">/10</span>
                  </li>
                )}
                {year && (
                  <li>
                    <time dateTime={movie.release_date}>{year}</time>
                  </li>
                )}
                {runtime && <li>{runtime}</li>}
                {cert && (
                  <li className="rounded border border-line px-1.5 py-0.5 text-xs font-semibold">
                    {cert}
                  </li>
                )}
                {movie.vote_count > 0 && (
                  <li className="text-subtle">
                    {movie.vote_count.toLocaleString()} ratings
                  </li>
                )}
              </ul>

              {genres.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {genres.map((g) => {
                    const slug = slugForGenreId(g.id);
                    return (
                      <li key={g.id}>
                        {slug ? (
                          <Link href={`/genre/${slug}`} className="chip text-xs">
                            {g.name}
                          </Link>
                        ) : (
                          <span className="chip text-xs">{g.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6"
                >
                  <FiPlay aria-hidden className="h-4 w-4 fill-current" />
                  Watch the trailer
                  <FiExternalLink aria-hidden className="h-3.5 w-3.5 opacity-70" />
                </a>
              )}
            </div>
          </div>

          {/* Synopsis */}
          {movie.overview && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold text-ink">Synopsis</h2>
              <p className="prose-site mt-3">{movie.overview}</p>
            </section>
          )}

          {/* Facts table */}
          <section className="mt-10">
            <h2 className="sr-only">Film details</h2>
            <dl className="panel grid gap-x-8 p-6 sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-3">
              <Fact label="Directed by">{crewDirectors.join(", ")}</Fact>
              <Fact label="Written by">{crewWriters.join(", ")}</Fact>
              <Fact label="Released">{released}</Fact>
              <Fact label="Runtime">{runtime}</Fact>
              <Fact label="Original language">
                {movie.original_language?.toUpperCase()}
              </Fact>
              <Fact label="Status">{movie.status}</Fact>
              <Fact label="Budget">{budget}</Fact>
              <Fact label="Box office">{revenue}</Fact>
              <Fact label="Original title">
                {movie.original_title !== title ? movie.original_title : null}
              </Fact>
            </dl>
          </section>

          {/* Cast */}
          {cast.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold text-ink">Top billed cast</h2>
              <ul className="rail mt-4 pb-2">
                {cast.map((person) => {
                  const photo = TMDB_IMAGE.profile(person.profile_path);
                  return (
                    <li key={person.cast_id ?? person.credit_id} className="w-28 flex-shrink-0">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-card bg-elevated ring-1 ring-line/60">
                        {photo ? (
                          <Image
                            src={photo}
                            alt={person.name}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="grid h-full place-items-center text-2xl opacity-30">
                            👤
                          </div>
                        )}
                      </div>
                      <p className="mt-2 clamp-2 text-xs font-semibold leading-snug text-ink">
                        {person.name}
                      </p>
                      {person.character && (
                        <p className="clamp-2 text-xs leading-snug text-subtle">
                          {person.character}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        {/* Related titles — keeps visitors moving and spreads internal links */}
        {similar.length > 0 && (
          <section className="shell mt-16">
            <SectionHeading
              title="If you liked this"
              description={`Titles that share a genre, era or creative team with ${title}.`}
            />
            <ul className="rail pb-2">
              {similar.map((m) => (
                <li key={m.id} className="w-36 flex-shrink-0 sm:w-40">
                  <Card result={m} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
