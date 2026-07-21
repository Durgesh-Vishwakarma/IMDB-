import Link from "next/link";
import { GENRES } from "@/lib/genres";

/**
 * Horizontal strip of genre links.
 *
 * @param {{current?: string}} props — current genre slug, highlighted.
 */
export default function GenreRail({ current }) {
  return (
    <nav aria-label="Genres">
      <ul className="rail py-1">
        {GENRES.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/genre/${g.slug}`}
              data-active={current === g.slug}
              aria-current={current === g.slug ? "page" : undefined}
              className="chip"
            >
              <span aria-hidden>{g.emoji}</span>
              {g.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
