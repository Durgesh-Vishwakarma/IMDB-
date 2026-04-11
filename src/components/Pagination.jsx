"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function buildHref(searchParams, page) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", page);
  return `/?${params.toString()}`;
}

// Returns a compact page window: [1, ..., p-1, p, p+1, ..., last]
function pageWindow(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const pages = pageWindow(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const go = (page) =>
    startTransition(() => router.push(buildHref(searchParams, page)));

  return (
    <div
      className={`page-shell flex items-center justify-center gap-1.5 py-10 transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Prev */}
      <button
        onClick={() => go(currentPage - 1)}
        disabled={!hasPrev || isPending}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) => {
        const prevP = pages[i - 1];
        const showEllipsis = prevP && p - prevP > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && (
              <span className="px-1 text-sm text-slate-400 dark:text-slate-600">
                …
              </span>
            )}
            <button
              onClick={() => go(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl px-2 text-sm font-semibold transition-all duration-150 ${
                p === currentPage
                  ? "bg-amber-400 text-slate-900 shadow-sm shadow-amber-400/30 dark:bg-amber-500 dark:text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      {/* Next */}
      <button
        onClick={() => go(currentPage + 1)}
        disabled={!hasNext || isPending}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>

      {/* Page indicator */}
      <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">
        Page {currentPage} of {totalPages.toLocaleString()}
      </span>
    </div>
  );
}
