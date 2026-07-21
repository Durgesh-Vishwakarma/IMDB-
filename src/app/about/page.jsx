import Link from "next/link";
import { FiSearch, FiSliders, FiFilm, FiZap } from "react-icons/fi";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "About MovieHub",
  description:
    "What MovieHub is, where the data comes from, and how the genre and decade filters work. Built on the TMDB API with Next.js.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${SITE.name}`,
    description:
      "A film database built for the ten minutes before you press play. Free, fast and account-free, powered by TMDB.",
    url: absoluteUrl("/about"),
    type: "website",
  },
};

const CAPABILITIES = [
  {
    icon: FiSearch,
    title: "Search that finds the film",
    body: "Type a partial title, a misspelling or a foreign-language name and the right result is usually first. Search runs against TMDB's full catalogue, not a cached subset.",
  },
  {
    icon: FiSliders,
    title: "Genre crossed with decade",
    body: "Most sites make you pick one or the other. Combining them — highly-rated 1970s thrillers, popular 2000s animation — is where a catalogue this size becomes browsable.",
  },
  {
    icon: FiFilm,
    title: "The details that decide it",
    body: "Runtime, certificate, director, principal cast, budget and box office on every film page, plus related titles when the first pick isn't right.",
  },
  {
    icon: FiZap,
    title: "Fast, and free of friction",
    body: "Pages are pre-rendered and cached at the edge. No account, no paywall, no cookie wall, no autoplaying trailer the moment a page opens.",
  },
];

const FAQ = [
  {
    q: "Where does the data come from?",
    a: "Every film record, poster and rating comes from The Movie Database (TMDB), an open, community-maintained film catalogue. Data is re-fetched continuously, so ratings and new releases stay current.",
  },
  {
    q: "Is MovieHub affiliated with IMDb?",
    a: "No. MovieHub is an independent project and is not affiliated with, endorsed by, or connected to IMDb, Amazon or TMDB. It uses TMDB's public API under their terms of use.",
  },
  {
    q: "Does it cost anything, or need an account?",
    a: "Neither. There is no sign-up, no paywall and no account to create. Nothing on the site is gated.",
  },
  {
    q: "Can I stream films here?",
    a: "No — MovieHub is a reference and discovery tool, not a streaming service. It tells you what a film is, who made it and whether it's worth your evening. Where to watch it is up to you.",
  },
  {
    q: "Why do ratings differ from IMDb?",
    a: "Ratings here are TMDB's, drawn from a different and generally smaller voting population than IMDb's. Expect broad agreement on well-known films and larger gaps on obscure ones.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* FAQPage markup makes the site eligible for expandable FAQ results.
          The questions below are the ones people actually ask about a site
          like this, which is the only reason this block is worth having. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <div className="shell pt-6">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      </div>

      <header className="shell py-10">
        <h1 className="max-w-3xl font-display text-display-md font-extrabold text-ink">
          A film database built for deciding, not cataloguing
        </h1>
        <div className="prose-site mt-6">
          <p>
            There is no shortage of places to look a film up. What is harder to
            find is a site that helps with the actual problem — it&rsquo;s
            Tuesday, you have two hours, and you want something good.
          </p>
          <p>
            MovieHub is built around that moment. It pairs a fast search with
            filters that narrow a million-title catalogue down to a shortlist,
            and puts the deciding details — runtime, certificate, director,
            cast — on one screen rather than three.
          </p>
        </div>
      </header>

      <section className="shell pb-4">
        <h2 className="sr-only">What you can do here</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {CAPABILITIES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="panel p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15">
                <Icon aria-hidden className="h-5 w-5 text-gold" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell py-12">
        <h2 className="font-display text-display-sm font-bold text-ink">
          How it&rsquo;s built
        </h2>
        <div className="prose-site mt-4">
          <p>
            MovieHub runs on <strong>Next.js</strong> with the App Router. Genre
            and film pages are statically generated and revalidated on a
            schedule, so a visitor gets a cached HTML document from the edge
            rather than waiting on an API round-trip. Search is the exception —
            it runs live, because a stale search result is worse than a slow
            one.
          </p>
          <p>
            Film data comes from the{" "}
            <a
              href="https://www.themoviedb.org/documentation/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDB API
            </a>
            , with requests batched and retried on transient network failures.
            Styling is Tailwind CSS over a small set of design tokens, which is
            what lets the light and dark themes stay consistent without
            duplicated styles.
          </p>
        </div>
      </section>

      <section className="shell pb-16">
        <h2 className="font-display text-display-sm font-bold text-ink">
          Common questions
        </h2>
        <dl className="mt-6 max-w-readable divide-y divide-line border-y border-line">
          {FAQ.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Start browsing
          </Link>
          <Link href="/genres" className="btn-ghost">
            See all genres
          </Link>
        </div>
      </section>
    </>
  );
}
