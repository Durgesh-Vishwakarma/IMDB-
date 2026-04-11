"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiLoader } from "react-icons/fi";

const DECADES = [
  { id: "all", label: "All Years" },
  { id: "2020s", label: "2020s" },
  { id: "2010s", label: "2010s" },
  { id: "2000s", label: "2000s" },
  { id: "1990s", label: "1990s" },
  { id: "1980s", label: "1980s" },
  { id: "1970s", label: "1970s" },
];

export default function YearSort() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentYear = searchParams.get("year") || "all";
  const genre = searchParams.get("genre") || "fetchTrending";

  const handleSelect = (decadeId) => {
    const params = new URLSearchParams();
    params.set("genre", genre);
    if (decadeId !== "all") params.set("year", decadeId);
    startTransition(() => router.push(`/?${params.toString()}`));
  };

  return (
    <div className="page-shell pb-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 flex-shrink-0 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Year
        </span>
        {DECADES.map((d) => {
          const isActive = currentYear === d.id;
          return (
            <button
              key={d.id}
              onClick={() => handleSelect(d.id)}
              disabled={isPending}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-amber-400 text-slate-900 shadow-sm shadow-amber-400/30 dark:bg-amber-500 dark:text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
              } ${isPending && !isActive ? "opacity-60" : ""}`}
            >
              {isActive && isPending ? (
                <span className="inline-flex items-center gap-1">
                  <FiLoader className="h-3 w-3 animate-spin" />
                  {d.label}
                </span>
              ) : (
                d.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
