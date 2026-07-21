import Card from "./Card";

/**
 * Poster grid.
 *
 * The stagger animation is capped at the first 12 cards — running a delayed
 * animation on 100+ nodes makes the whole grid feel sluggish rather than
 * lively, and delays past ~400ms read as jank.
 */
export default function Results({ results, className = "" }) {
  if (!results?.length) return null;

  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 ${className}`}
    >
      {results.map((result, i) => (
        <li
          key={result.id}
          className="animate-rise"
          style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
        >
          <Card result={result} priority={i < 6} />
        </li>
      ))}
    </ul>
  );
}
