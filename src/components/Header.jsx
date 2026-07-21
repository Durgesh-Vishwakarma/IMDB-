"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import DarkMode from "./DarkMode";
import SearchBox from "./SearchBox";
import { GENRES } from "@/lib/genres";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/genres", label: "Genres" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close both panels once navigation completes, otherwise the menu stays open
  // on top of the page the user just asked for.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur-xl">
      <div className="shell flex h-16 items-center gap-3">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex flex-shrink-0 items-center gap-2.5 rounded-lg"
          aria-label={`${SITE.name} home`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold font-display text-lg font-extrabold leading-none text-gold-ink shadow-sm transition-transform duration-200 group-hover:-rotate-6">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Movie<span className="text-gold">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-gold/15 text-ink"
                  : "text-muted hover:bg-elevated hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop search — reachable from every page */}
        <div className="ml-auto hidden max-w-sm flex-1 lg:block">
          <SearchBox compact />
        </div>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-3">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
            aria-label={searchOpen ? "Close search" : "Open search"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-gold/50 hover:text-ink lg:hidden"
          >
            {searchOpen ? (
              <FiX className="h-4 w-4" />
            ) : (
              <FiSearch className="h-4 w-4" />
            )}
          </button>

          <DarkMode />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-gold/50 hover:text-ink md:hidden"
          >
            {menuOpen ? (
              <FiX className="h-4 w-4" />
            ) : (
              <FiMenu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible search for narrow viewports */}
      {searchOpen && (
        <div
          id="mobile-search"
          className="shell animate-fade-in border-t border-line/70 py-3 lg:hidden"
        >
          <SearchBox autoFocus />
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-line bg-canvas md:hidden"
        >
          <nav aria-label="Mobile" className="shell py-6">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 font-display text-lg font-semibold transition-colors ${
                      isActive(item.href)
                        ? "bg-gold/15 text-ink"
                        : "text-muted hover:bg-elevated hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-8 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
              Browse by genre
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {GENRES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/genre/${g.slug}`}
                    className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:border-gold/50 hover:text-ink"
                  >
                    <span aria-hidden>{g.emoji}</span>
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
