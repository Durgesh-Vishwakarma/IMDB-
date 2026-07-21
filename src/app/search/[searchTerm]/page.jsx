import SearchResultsClient from "@/components/SearchResultsClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import { searchMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const term = decodeURIComponent(params.searchTerm || "");
  return {
    title: `Search results for “${term}”`,
    description: `Films matching “${term}” — with ratings, release years and runtimes.`,
    // Search result pages are thin and effectively infinite. Keeping them out
    // of the index protects crawl budget; follow still lets crawlers reach the
    // film pages linked from here.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params }) {
  const searchTerm = decodeURIComponent(params.searchTerm || "");
  const { results } = await searchMovies(searchTerm);

  return (
    <>
      <div className="shell pt-6">
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: `“${searchTerm}”` }]}
        />
      </div>
      <SearchResultsClient searchTerm={searchTerm} initialResults={results} />
    </>
  );
}
