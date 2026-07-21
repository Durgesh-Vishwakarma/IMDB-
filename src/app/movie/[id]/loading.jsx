export default function Loading() {
  return (
    <div>
      <div className="skeleton h-56 w-full rounded-none sm:h-72 lg:h-96" />
      <div className="shell relative -mt-24 sm:-mt-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="skeleton aspect-[2/3] w-32 rounded-panel sm:w-48" />
          <div className="flex-1 space-y-4">
            <div className="skeleton h-11 w-3/4 max-w-lg rounded-lg" />
            <div className="skeleton h-4 w-1/2 max-w-xs rounded-full" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-7 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-3">
          <div className="skeleton h-5 w-32 rounded-full" />
          <div className="skeleton h-4 w-full max-w-2xl rounded-full" />
          <div className="skeleton h-4 w-full max-w-xl rounded-full" />
          <div className="skeleton h-4 w-2/3 max-w-md rounded-full" />
        </div>
      </div>
    </div>
  );
}
