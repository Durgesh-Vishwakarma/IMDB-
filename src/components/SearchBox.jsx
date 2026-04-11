"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/search/${search.trim()}`);
  };

  return (
    <form className="page-shell py-3" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <FiSearch className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search movies, series, people..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 pl-11 pr-28 text-sm shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 dark:border-slate-700 dark:bg-slate-900/90 dark:placeholder:text-slate-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20 sm:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 h-8 rounded-xl bg-amber-400 px-4 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          disabled={search.trim() === ""}
        >
          Search
        </button>
      </div>
    </form>
  );
}
