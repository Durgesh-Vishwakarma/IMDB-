"use client";

import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The server has no idea which theme the user prefers, so the button can't
  // render its real icon until after hydration. A same-sized placeholder keeps
  // the header from shifting when it swaps in.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-gold/50 hover:text-ink"
    >
      {!mounted ? (
        <span className="h-4 w-4" />
      ) : isDark ? (
        <MdLightMode className="h-5 w-5 text-gold" />
      ) : (
        <MdDarkMode className="h-5 w-5" />
      )}
    </button>
  );
}
