import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

/**
 * Section header used on the home page rails.
 *
 * `as` lets a caller drop the heading to h3 where the document outline needs
 * it — heading levels should never skip, and screen-reader users navigate by
 * them.
 */
export default function SectionHeading({
  title,
  description,
  href,
  linkLabel = "See all",
  as: Tag = "h2",
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <Tag className="font-display text-display-sm font-bold text-ink">
          {title}
        </Tag>
        {description && (
          <p className="mt-1.5 max-w-readable text-sm text-muted">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-gold"
        >
          {linkLabel}
          <FiArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
