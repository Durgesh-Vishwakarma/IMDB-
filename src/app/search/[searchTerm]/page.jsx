import SearchResultsClient from "@/components/SearchResultsClient";
import { searchMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const term = decodeURIComponent(params.searchTerm || "");
  return {
    title: `Search: ${term}`,
    description: `Browse movie search results for "${term}" — powered by the TMDB API.`,
  };
}

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  const results = await searchMovies(searchTerm);

  return (
    <div>
      <SearchResultsClient searchTerm={searchTerm} initialResults={results} />
    </div>
  );
}
