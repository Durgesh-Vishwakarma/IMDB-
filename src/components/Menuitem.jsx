"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";

const icons = {
  home: AiFillHome,
  about: BsFillInfoCircleFill,
};

export default function Menuitem({ title, address, iconName }) {
  const pathname = usePathname();
  const isActive = pathname === address;
  const Icon = icons[iconName];

  return (
    <Link
      href={address}
      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 ${
        isActive
          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
    >
      {Icon && <Icon className="text-lg" />}
      <span className="hidden text-xs font-semibold uppercase tracking-wide sm:inline">
        {title}
      </span>
    </Link>
  );
}
