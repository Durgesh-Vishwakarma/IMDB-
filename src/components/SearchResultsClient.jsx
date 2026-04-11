"use client";

import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import { FiLoader } from "react-icons/fi";

async function fetchSearchResults(searchTerm) {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(searchTerm)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await response.json();
  return data.results || [];
}

export default function SearchResultsClient({
  searchTerm,
  initialResults = [],
}) {
  const {
    data: results = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["movie-search", searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    initialData: initialResults,
    enabled: Boolean(searchTerm),
  });

  if (isError) {
    return (
      <div className="page-shell py-20 text-center">
        <p className="mb-4 text-5xl">😢</p>
        <h1 className="text-xl font-semibold text-rose-500">
          Could not load search results right now.
        </h1>
        <p className="mt-1 text-sm text-slate-400">Please try again later.</p>
      </div>
    );
  }

  if (!results.length && !isFetching) {
    return (
      <div className="page-shell py-20 text-center">
        <p className="mb-4 text-5xl">🎬</p>
        <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          No results for &ldquo;{searchTerm}&rdquo;
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-shell flex items-center gap-2 pt-4">
        {isFetching ? (
          <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <FiLoader className="h-4 w-4 animate-spin" />
            Searching...
          </span>
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            <strong className="font-semibold text-slate-700 dark:text-slate-200">
              {results.length}
            </strong>{" "}
            result{results.length !== 1 ? "s" : ""} for &ldquo;{searchTerm}
            &rdquo;
          </span>
        )}
      </div>
      <Results results={results} />
    </div>
  );
}
