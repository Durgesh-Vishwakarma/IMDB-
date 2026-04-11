export default function CardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Poster placeholder */}
      <div className="aspect-[2/3] w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
      {/* Title placeholder */}
      <div className="mt-2.5 space-y-2 px-0.5">
        <div className="h-3.5 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-2/5 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}
