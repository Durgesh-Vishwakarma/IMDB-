import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/** Compact page window: [1, …, p-1, p, p+1, …, last] */
function pageWindow(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

/**
 * Pagination as real links.
 *
 * The old version used onClick + router.push, so crawlers saw a single page
 * and everything past page 1 was unreachable. Anchors let the crawler walk the
 * whole set, and the existing query string is preserved so filters survive
 * paging.
 *
 * @param {{basePath: string, currentPage: number, totalPages: number, params?: object}} props
 */
export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  params = {},
}) {
  if (totalPages <= 1) return null;

  const href = (page) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) search.set(k, v);
    });
    if (page > 1) search.set("page", String(page));
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = pageWindow(currentPage, totalPages);
  const arrow =
    "grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-gold/50 hover:text-ink";

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center gap-3 py-12">
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          {currentPage > 1 ? (
            <Link href={href(currentPage - 1)} rel="prev" aria-label="Previous page" className={arrow}>
              <FiChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span aria-disabled="true" className={`${arrow} opacity-30`}>
              <FiChevronLeft className="h-4 w-4" />
            </span>
          )}
        </li>

        {pages.map((p, i) => {
          const gap = i > 0 && p - pages[i - 1] > 1;
          const isCurrent = p === currentPage;
          return (
            <li key={p} className="flex items-center gap-1.5">
              {gap && (
                <span aria-hidden className="px-1 text-sm text-subtle">
                  …
                </span>
              )}
              <Link
                href={href(p)}
                aria-label={`Page ${p}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "bg-gold text-gold-ink"
                    : "border border-line bg-surface text-muted hover:border-gold/50 hover:text-ink"
                }`}
              >
                {p}
              </Link>
            </li>
          );
        })}

        <li>
          {currentPage < totalPages ? (
            <Link href={href(currentPage + 1)} rel="next" aria-label="Next page" className={arrow}>
              <FiChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span aria-disabled="true" className={`${arrow} opacity-30`}>
              <FiChevronRight className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>

      <p className="text-xs text-subtle">
        Page {currentPage} of {totalPages.toLocaleString()}
      </p>
    </nav>
  );
}
