"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

/**
 * @param {{compact?: boolean, autoFocus?: boolean}} props
 *   compact — header variant: shorter, no visible submit button.
 */
export default function SearchBox({ compact = false, autoFocus = false }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();
  const trimmed = value.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trimmed) return;
    router.push(`/search/${encodeURIComponent(trimmed)}`);
  };

  const clear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={compact ? "" : "w-full"}
    >
      <label htmlFor={compact ? "search-compact" : "search-main"} className="sr-only">
        Search for a movie
      </label>
      <div className="relative flex items-center">
        <FiSearch
          aria-hidden
          className={`pointer-events-none absolute text-subtle ${
            compact ? "left-3 h-4 w-4" : "left-4 h-5 w-5"
          }`}
        />
        <input
          id={compact ? "search-compact" : "search-main"}
          ref={inputRef}
          type="search"
          autoFocus={autoFocus}
          autoComplete="off"
          enterKeyHint="search"
          placeholder={
            compact ? "Search films…" : "Search any film — try “Dune” or “Parasite”"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full rounded-full border border-line bg-surface text-ink shadow-sm outline-none transition-colors placeholder:text-subtle focus:border-gold ${
            compact
              ? "h-10 pl-9 pr-9 text-sm"
              : "h-14 pl-12 pr-32 text-base sm:text-lg"
          } [&::-webkit-search-cancel-button]:hidden`}
        />

        {/* Clear button — appears only once there's something to clear. */}
        {trimmed && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className={`absolute grid place-items-center rounded-full text-subtle transition-colors hover:text-ink ${
              compact ? "right-2.5 h-6 w-6" : "right-[7.5rem] h-7 w-7"
            }`}
          >
            <FiX className="h-4 w-4" />
          </button>
        )}

        {!compact && (
          <button
            type="submit"
            disabled={!trimmed}
            className="btn-primary absolute right-2 h-10"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}
