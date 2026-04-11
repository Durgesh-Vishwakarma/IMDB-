import React from "react";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <nav className="page-shell pb-1 pt-4">
      <div className="flex w-fit items-center gap-1 rounded-2xl bg-slate-100/90 p-1.5 dark:bg-slate-800/90">
        <NavbarItem title="🔥 Trending" params="fetchTrending" />
        <NavbarItem title="⭐ Top Rated" params="fetchTopRated" />
      </div>
    </nav>
  );
}
