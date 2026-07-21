import Link from "next/link";
import Hero from "@/components/Hero";
import MovieRail from "@/components/MovieRail";
import GenreRail from "@/components/GenreRail";
import Results from "@/components/Results";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { GENRES } from "@/lib/genres";
import { SITE, absoluteUrl } from "@/lib/site";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  movieTitle,
} from "@/lib/tmdb";

// Rebuild hourly. Trending data doesn't change faster than that, and serving a
// static page beats a fresh SSR render on every visit for both TTFB and cost.
export const revalidate = 3600;

export const metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Fired in parallel — sequential awaits here would triple time-to-first-byte.
  const [trending, topRated, nowPlaying] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
  ]);

  const featured = trending.results[0];
  const trendingGrid = trending.results.slice(0, 18);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${SITE.name} — ${SITE.tagline}`,
          description: SITE.description,
          url: absoluteUrl("/"),
          mainEntity: {
            "@type": "ItemList",
            name: "Trending movies this week",
            itemListElement: trendingGrid.slice(0, 10).map((m, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/movie/${m.id}`),
              name: movieTitle(m),
            })),
          },
        }}
      />

      <Hero movie={featured} />

      {/* Genre entry points, immediately below the fold */}
      <div className="shell border-b border-line py-5">
        <GenreRail />
      </div>

      <section className="shell py-10">
        <SectionHeading
          title="Trending this week"
          description="The films people are actually watching right now, ranked by TMDB activity across the last seven days."
        />
        <Results results={trendingGrid} />
      </section>

      <MovieRail
        title="In cinemas now"
        description="Currently on release in the US — useful if you're deciding what to book rather than what to stream."
        movies={nowPlaying.results.slice(0, 16)}
      />

      <MovieRail
        title="The all-time greats"
        description="TMDB's highest-rated films, filtered to titles with enough votes to mean something."
        href="/genre/drama?sort=rating"
        linkLabel="Explore top rated"
        movies={topRated.results.slice(0, 16)}
      />

      {/* Genre directory — the main internal-link surface on the site */}
      <section className="shell py-12">
        <SectionHeading
          title="Browse every genre"
          description="Each genre page can be filtered by decade and sorted by rating, popularity or release date."
          href="/genres"
          linkLabel="All genres"
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GENRES.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/genre/${g.slug}`}
                className="panel flex items-center gap-3 p-4 transition-colors hover:border-gold/50 hover:bg-gold/5"
              >
                <span aria-hidden className="text-xl">
                  {g.emoji}
                </span>
                <span className="text-sm font-semibold text-ink">{g.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Real body copy. A page of nothing but poster grids gives a search
          engine almost no text to understand or rank. */}
      <section className="shell pb-16">
        <div className="panel p-6 sm:p-10">
          <h2 className="font-display text-display-sm font-bold text-ink">
            What MovieHub is for
          </h2>
          <div className="prose-site mt-4">
            <p>
              Most film databases are built for cataloguing. This one is built
              for the ten minutes before you press play, when you know roughly
              what you want and need to turn that into a specific title.
            </p>
            <p>
              Every genre page combines three filters that usually live in
              different places: <strong>genre</strong>, <strong>decade</strong>{" "}
              and <strong>sort order</strong>. Asking for highly-rated 1970s
              thrillers, or popular animated films from the 2000s, takes two
              clicks and returns a ranked list rather than a wall of everything.
            </p>
            <p>
              Individual film pages carry the details that actually decide the
              question — runtime, certificate, director, principal cast, budget
              and box office — plus a set of related titles if the first pick
              doesn&rsquo;t land. Data comes from{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Movie Database
              </a>
              , refreshed continuously, and nothing here is behind a login.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
