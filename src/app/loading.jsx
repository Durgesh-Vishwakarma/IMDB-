import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="shell py-16">
      <div className="skeleton h-14 w-full max-w-2xl rounded-lg" />
      <div className="mt-5 space-y-2">
        <div className="skeleton h-4 w-full max-w-lg rounded-full" />
        <div className="skeleton h-4 w-2/3 max-w-sm rounded-full" />
      </div>
      <div className="skeleton mt-8 h-14 w-full max-w-xl rounded-full" />
      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
