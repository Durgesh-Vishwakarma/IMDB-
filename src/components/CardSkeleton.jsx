export default function CardSkeleton() {
  return (
    <div aria-hidden>
      <div className="skeleton aspect-[2/3] w-full rounded-card" />
      <div className="mt-2.5 space-y-2">
        <div className="skeleton h-3.5 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-1/3 rounded-full" />
      </div>
    </div>
  );
}
