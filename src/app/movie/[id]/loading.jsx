export default function MovieLoading() {
  return (
    <div className="animate-pulse pb-16">
      {/* Backdrop skeleton */}
      <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 sm:h-80 md:h-[26rem]" />

      <div className="page-shell relative -mt-28 sm:-mt-36">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          {/* Poster skeleton */}
          <div className="h-[192px] w-32 flex-shrink-0 rounded-2xl bg-slate-300 dark:bg-slate-700 sm:h-[264px] sm:w-44" />

          {/* Title & meta skeleton */}
          <div className="flex-1 space-y-3 pb-1">
            <div className="h-8 w-3/4 rounded-xl bg-slate-300 dark:bg-slate-700" />
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>

        {/* Overview skeleton */}
        <div className="mt-8 max-w-3xl space-y-2">
          <div className="h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-4/5 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
