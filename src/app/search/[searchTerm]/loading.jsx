import CardSkeleton from "@/components/CardSkeleton";

export default function SearchLoading() {
  return (
    <div className="page-shell py-6">
      <div className="mb-5 h-4 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
