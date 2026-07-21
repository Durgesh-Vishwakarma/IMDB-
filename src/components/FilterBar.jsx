import Link from "next/link";
import { DECADES, SORTS } from "@/lib/genres";

/**
 * Decade + sort controls.
 *
 * Deliberately a server component rendering plain anchors rather than a
 * client component calling router.push. Anchors are crawlable, work without
 * JavaScript, support middle-click and cmd-click, and ship no bundle. The
 * previous button-based version was invisible to search engines.
 *
 * @param {{basePath: string, decade: string, sort: string}} props
 */
export default function FilterBar({ basePath, decade = "all", sort = "popular" }) {
  const href = (next) => {
    const params = new URLSearchParams();
    const d = next.decade ?? decade;
    const s = next.sort ?? sort;
    if (d && d !== "all") params.set("decade", d);
    if (s && s !== "popular") params.set("sort", s);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span
          id="filter-decade"
          className="mt-2 w-14 flex-shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-subtle"
        >
          Decade
        </span>
        <ul aria-labelledby="filter-decade" className="flex flex-wrap gap-2">
          {DECADES.map((d) => (
            <li key={d.id}>
              <Link
                href={href({ decade: d.id })}
                scroll={false}
                data-active={decade === d.id}
                aria-current={decade === d.id ? "true" : undefined}
                className="chip text-xs"
              >
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-3">
        <span
          id="filter-sort"
          className="mt-2 w-14 flex-shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-subtle"
        >
          Sort
        </span>
        <ul aria-labelledby="filter-sort" className="flex flex-wrap gap-2">
          {SORTS.map((s) => (
            <li key={s.id}>
              <Link
                href={href({ sort: s.id })}
                scroll={false}
                data-active={sort === s.id}
                aria-current={sort === s.id ? "true" : undefined}
                className="chip text-xs"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
