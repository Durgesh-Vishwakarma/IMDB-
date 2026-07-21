import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { GENRES } from "@/lib/genres";
import { SITE, absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

export const metadata = {
  title: "All Movie Genres",
  description:
    "Every genre on MovieHub, from action to westerns. Filter any genre by decade and sort by rating, popularity or release date.",
  alternates: { canonical: "/genres" },
  openGraph: {
    title: `All Movie Genres · ${SITE.name}`,
    description:
      "Browse films by genre and decade — action, comedy, horror, sci-fi, drama and thirteen more categories.",
    url: absoluteUrl("/genres"),
    type: "website",
  },
};

export default function GenresPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Movie Genres",
          url: absoluteUrl("/genres"),
          description: metadata.description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: GENRES.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: g.title,
              url: absoluteUrl(`/genre/${g.slug}`),
            })),
          },
        }}
      />

      <div className="shell pt-6">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Genres" }]} />
      </div>

      <header className="shell py-8">
        <h1 className="font-display text-display-md font-extrabold text-ink">
          Every genre, one page
        </h1>
        <p className="prose-site mt-4">
          Genre is a blunt instrument on its own — &ldquo;drama&rdquo; covers
          about a third of everything ever made. Each page below pairs the genre
          with a decade filter and a sort order, which is usually enough to get
          from a vague mood to a specific film in two clicks.
        </p>
      </header>

      <div className="shell pb-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GENRES.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/genre/${g.slug}`}
                className="panel group flex h-full flex-col p-5 transition-colors hover:border-gold/50 hover:bg-gold/5"
              >
                <span aria-hidden className="text-2xl">
                  {g.emoji}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-gold">
                  {g.title}
                </h2>
                <p className="clamp-3 mt-2 text-sm leading-relaxed text-muted">
                  {g.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
