import { notFound } from "next/navigation";
import Results from "@/components/Results";
import Pagination from "@/components/Pagination";
import FilterBar from "@/components/FilterBar";
import GenreRail from "@/components/GenreRail";
import Breadcrumbs from "@/components/Breadcrumbs";
import EmptyState from "@/components/EmptyState";
import JsonLd from "@/components/JsonLd";
import { GENRES, GENRE_BY_SLUG, DECADES, SORTS } from "@/lib/genres";
import { absoluteUrl, SITE } from "@/lib/site";
import { getMoviesByGenreId, movieTitle, movieYear } from "@/lib/tmdb";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return GENRES.map((g) => ({ slug: g.slug }));
}

/** Validates and normalises the query string so bad input can't reach TMDB. */
function readParams(searchParams = {}) {
  const decade = DECADES.some((d) => d.id === searchParams.decade)
    ? searchParams.decade
    : "all";
  const sort = SORTS.some((s) => s.id === searchParams.sort)
    ? searchParams.sort
    : "popular";
  const page = Math.max(1, Math.min(Number(searchParams.page) || 1, 500));
  return { decade, sort, page };
}

export async function generateMetadata({ params, searchParams }) {
  const genre = GENRE_BY_SLUG[params.slug];
  if (!genre) return {};

  const { decade, sort, page } = readParams(searchParams);
  const decadeLabel = decade !== "all" ? ` from the ${decade}` : "";
  const pageLabel = page > 1 ? ` — page ${page}` : "";

  // Canonical always points at the unfiltered genre page. Filter and page
  // combinations produce near-duplicate content; consolidating them onto one
  // URL concentrates ranking signals instead of splitting them 150 ways.
  const canonical = `/genre/${genre.slug}`;
  const isFiltered = decade !== "all" || sort !== "popular" || page > 1;

  return {
    title: `${genre.title}${decadeLabel}${pageLabel}`,
    description: genre.description,
    alternates: { canonical },
    openGraph: {
      title: `${genre.title}${decadeLabel} · ${SITE.name}`,
      description: genre.description,
      url: absoluteUrl(canonical),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${genre.title}${decadeLabel}`,
      description: genre.description,
    },
    // Filtered views stay crawlable (follow) so the crawler reaches the movie
    // pages behind them, but stay out of the index themselves.
    robots: isFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function GenrePage({ params, searchParams }) {
  const genre = GENRE_BY_SLUG[params.slug];
  if (!genre) notFound();

  const { decade, sort, page } = readParams(searchParams);
  const { results, totalPages, totalResults } = await getMoviesByGenreId(
    genre.id,
    { decade, sort, page },
  );

  const basePath = `/genre/${genre.slug}`;
  const decadeLabel = decade !== "all" ? ` · ${decade}` : "";
  const sortLabel = SORTS.find((s) => s.id === sort)?.label;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: genre.title,
          description: genre.description,
          url: absoluteUrl(basePath),
          isPartOf: { "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: results.length,
            itemListElement: results.slice(0, 20).map((m, i) => ({
              "@type": "ListItem",
              position: (page - 1) * 20 + i + 1,
              url: absoluteUrl(`/movie/${m.id}`),
              name: `${movieTitle(m)}${movieYear(m) ? ` (${movieYear(m)})` : ""}`,
            })),
          },
        }}
      />

      <div className="shell pt-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Genres", href: "/genres" },
            { name: genre.name },
          ]}
        />
      </div>

      {/* Header: H1 plus the intro copy that gives this page something to rank on */}
      <header className="shell pb-8 pt-5">
        <h1 className="font-display text-display-md font-extrabold text-ink">
          <span aria-hidden className="mr-2">
            {genre.emoji}
          </span>
          {genre.title}
          {decadeLabel && <span className="text-gold">{decadeLabel}</span>}
        </h1>
        <p className="prose-site mt-4">{genre.intro}</p>
        {totalResults > 0 && (
          <p className="mt-4 text-sm text-subtle">
            {totalResults.toLocaleString()} titles ·{" "}
            <span className="text-muted">{sortLabel}</span>
          </p>
        )}
      </header>

      <div className="shell border-y border-line py-4">
        <GenreRail current={genre.slug} />
      </div>

      <div className="shell py-6">
        <FilterBar basePath={basePath} decade={decade} sort={sort} />
      </div>

      <div className="shell">
        {results.length ? (
          <Results results={results} className="py-4" />
        ) : (
          <EmptyState
            title="Nothing matches those filters"
            body={`There are no ${genre.name.toLowerCase()} titles in the ${decade} with enough ratings to list. Try a wider decade or a different sort order.`}
            actionHref={basePath}
            actionLabel={`Reset ${genre.name} filters`}
          />
        )}
      </div>

      <div className="shell">
        <Pagination
          basePath={basePath}
          currentPage={page}
          totalPages={totalPages}
          params={{
            decade: decade !== "all" ? decade : "",
            sort: sort !== "popular" ? sort : "",
          }}
        />
      </div>
    </>
  );
}
