"use client";

import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import EmptyState from "./EmptyState";
import CardSkeleton from "./CardSkeleton";

async function fetchSearchResults(searchTerm) {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(searchTerm)}`,
  );
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();
  return data.results || [];
}

export default function SearchResultsClient({ searchTerm, initialResults = [] }) {
  const {
    data: results = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["movie-search", searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    initialData: initialResults,
    enabled: Boolean(searchTerm),
    staleTime: 60_000,
  });

  if (isError) {
    return (
      <EmptyState
        emoji="⚠️"
        title="Search isn't responding"
        body="The request to the film database failed. It's usually temporary — try the same search again in a moment."
        actionHref="/"
        actionLabel="Back to home"
      />
    );
  }

  if (!results.length && isFetching) {
    return (
      <div className="shell py-10">
        <div className="skeleton h-5 w-40 rounded-full" />
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <li key={i}>
              <CardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!results.length) {
    return (
      <EmptyState
        title={`No films match “${searchTerm}”`}
        body="Check the spelling, try the original-language title, or drop a word — searching for fewer terms usually widens the net enough."
      />
    );
  }

  return (
    <div className="shell py-8">
      <h1 className="font-display text-display-sm font-bold text-ink">
        Results for &ldquo;{searchTerm}&rdquo;
      </h1>
      <p className="mt-2 text-sm text-subtle" aria-live="polite">
        {isFetching
          ? "Searching…"
          : `${results.length} film${results.length === 1 ? "" : "s"} found`}
      </p>
      <Results results={results} className="mt-8" />
    </div>
  );
}
