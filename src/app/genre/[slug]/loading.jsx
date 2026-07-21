import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="shell py-10">
      <div className="skeleton h-10 w-72 rounded-lg" />
      <div className="mt-4 space-y-2">
        <div className="skeleton h-4 w-full max-w-xl rounded-full" />
        <div className="skeleton h-4 w-3/4 max-w-md rounded-full" />
      </div>
      <div className="mt-8 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-20 rounded-full" />
        ))}
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
