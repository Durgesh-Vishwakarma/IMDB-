import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="shell py-10">
      <div className="skeleton h-9 w-64 rounded-lg" />
      <div className="skeleton mt-3 h-4 w-32 rounded-full" />
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
