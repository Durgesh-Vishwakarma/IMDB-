import Card from "./Card";

export default function Results({ results }) {
  return (
    <div className="page-shell grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {results.map((result, i) => (
        <div
          key={result.id}
          className="animate-slide-up"
          style={{ animationDelay: `${i * 35}ms` }}
        >
          <Card result={result} />
        </div>
      ))}
    </div>
  );
}
