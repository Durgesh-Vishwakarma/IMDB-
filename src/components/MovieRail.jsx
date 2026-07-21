import Card from "./Card";
import SectionHeading from "./SectionHeading";

/**
 * Scrollable row of posters. Used on the home page where a full grid for every
 * category would push the page past a reasonable length.
 */
export default function MovieRail({
  title,
  description,
  href,
  linkLabel,
  movies,
  priority = false,
}) {
  if (!movies?.length) return null;

  return (
    <section className="shell py-8">
      <SectionHeading
        title={title}
        description={description}
        href={href}
        linkLabel={linkLabel}
      />
      <ul className="rail -mx-4 px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {movies.map((movie, i) => (
          <li key={movie.id} className="w-36 flex-shrink-0 sm:w-40 lg:w-44">
            <Card result={movie} priority={priority && i < 5} />
          </li>
        ))}
      </ul>
    </section>
  );
}
