import CardSkeleton from "@/components/CardSkeleton";

// Next.js automatically renders this file while the page is loading
export default function Loading() {
  return (
    <div className="page-shell py-6">
      {/* Section header shimmer */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
