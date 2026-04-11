"use client";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-amber-600 dark:hover:bg-slate-700"
    >
      {currentTheme === "dark" ? (
        <MdLightMode className="h-5 w-5 text-amber-400" />
      ) : (
        <MdDarkMode className="h-5 w-5 text-slate-600" />
      )}
    </button>
  );
}
