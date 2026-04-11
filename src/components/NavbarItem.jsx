"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavbarItem({ title, params }) {
  let searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const isActive = genre === params || (!genre && params === "fetchTrending");

  return (
    <Link
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        isActive
          ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      }`}
      href={`/?genre=${params}`}
    >
      {title}
    </Link>
  );
}
