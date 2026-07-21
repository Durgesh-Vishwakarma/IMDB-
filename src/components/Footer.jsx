import Link from "next/link";
import { GENRES } from "@/lib/genres";
import { SITE } from "@/lib/site";

const YEAR = new Date().getFullYear();

/**
 * Footer doubles as an internal-linking hub: every genre page is one click
 * from every page on the site, which is how link equity reaches the deeper
 * routes without relying on the sitemap alone.
 */
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface/50">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.2fr_2fr]">
        {/* Brand + positioning */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold font-display text-lg font-extrabold leading-none text-gold-ink">
              M
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Movie<span className="text-gold">Hub</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A faster way to decide what to watch. Ratings, runtimes, cast and
            release dates for more than a million films — no account, no
            paywall, no autoplaying trailers.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-3">
          <nav aria-labelledby="footer-browse">
            <h2
              id="footer-browse"
              className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle"
            >
              Browse
            </h2>
            <ul className="space-y-2 text-sm">
              {GENRES.slice(0, 7).map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/genre/${g.slug}`}
                    className="text-muted transition-colors hover:text-gold"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-more">
            <h2
              id="footer-more"
              className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle"
            >
              More genres
            </h2>
            <ul className="space-y-2 text-sm">
              {GENRES.slice(7, 14).map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/genre/${g.slug}`}
                    className="text-muted transition-colors hover:text-gold"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-site">
            <h2
              id="footer-site"
              className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle"
            >
              Site
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/genres"
                  className="text-muted transition-colors hover:text-gold"
                >
                  All genres
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted transition-colors hover:text-gold"
                >
                  About MovieHub
                </Link>
              </li>
              <li>
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-gold"
                >
                  TMDB
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {SITE.name}. Not affiliated with IMDb or TMDB.
          </p>
          {/* TMDB's terms require this attribution wherever their data appears. */}
          <p>
            Film data and images provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 transition-colors hover:text-gold"
            >
              The Movie Database
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
