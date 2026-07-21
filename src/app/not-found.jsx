import EmptyState from "@/components/EmptyState";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <EmptyState
      as="h1"
      emoji="🎞️"
      title="This page isn't in the archive"
      body="The link may be broken, or the film may have been removed from TMDB. Search for it by name, or start from a genre."
      actionHref="/genres"
      actionLabel="Browse by genre"
    />
  );
}
