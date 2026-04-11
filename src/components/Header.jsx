import Menuitem from "./Menuitem";
import Link from "next/link";
import DarkMode from "./DarkMode";
import { MdLocalMovies } from "react-icons/md";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
      <div className="page-shell flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25 transition-transform duration-200 group-hover:scale-105">
            <MdLocalMovies className="text-xl text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              Movie<span className="text-amber-500">Hub</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:block">
              Powered by TMDB
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <Menuitem title="Home" address="/" iconName="home" />
          <Menuitem title="About" address="/about" iconName="about" />
        </nav>

        {/* Dark mode */}
        <DarkMode />
      </div>
    </header>
  );
}
