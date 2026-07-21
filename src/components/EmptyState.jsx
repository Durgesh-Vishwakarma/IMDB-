import Link from "next/link";

/**
 * Shared empty / zero-results state. Always offers a way forward — a dead end
 * with no next action is the fastest way to lose a visitor.
 */
export default function EmptyState({
  emoji = "🎬",
  title,
  body,
  actionHref = "/genres",
  actionLabel = "Browse by genre",
  // Defaults to h2 because this usually sits inside a page that already has an
  // h1. The 404 page passes "h1" — a page with no h1 at all is both an
  // accessibility failure and a wasted ranking signal.
  as: Heading = "h2",
}) {
  return (
    <div className="shell flex flex-col items-center py-24 text-center">
      <span aria-hidden className="text-5xl">
        {emoji}
      </span>
      <Heading className="mt-5 font-display text-display-sm font-bold text-ink">
        {title}
      </Heading>
      {body && <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{body}</p>}
      {actionHref && (
        <Link href={actionHref} className="btn-ghost mt-7">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
