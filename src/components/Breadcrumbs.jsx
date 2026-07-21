import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/site";

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data.
 *
 * Google renders these in place of the raw URL in search results, which
 * measurably improves click-through on deep pages. Emitting the markup
 * without the visible trail is against their guidelines, so the two are
 * deliberately generated from the same array.
 *
 * @param {{items: {name: string, href?: string}[]}} props
 */
export default function Breadcrumbs({ items }) {
  if (!items?.length) return null;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.href ? absoluteUrl(item.href) : undefined,
          })),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-subtle">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.name} className="flex items-center gap-1">
                {i > 0 && (
                  <FiChevronRight aria-hidden className="h-3 w-3 opacity-60" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded transition-colors hover:text-ink"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-muted">
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
