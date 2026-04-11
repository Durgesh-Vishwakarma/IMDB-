"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-shell flex flex-col items-center justify-center py-24 text-center">
      <p className="mb-4 text-5xl">⚠️</p>
      <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {error?.message?.includes("TMDB")
          ? "Could not reach the movie database. Check your connection or API key."
          : "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
      >
        Try again
      </button>
    </div>
  );
}
