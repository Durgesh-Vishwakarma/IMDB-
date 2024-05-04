import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Menuitem from "./Menuitem";
import Link from "next/link";
import DarkMode from "./DarkMode";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
      <div className="flex gap-4">
        <Menuitem title="home" address="/" Icon={AiFillHome} />
        <Menuitem title="about" address="about" Icon={BsFillInfoCircleFill} />
      </div>
      <div className="flex items-center gap-4">
        <DarkMode />
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="text-2xl font-bold  dark:bg-red-700 bg-yellow-400 py-1 px-2 rounded-lg">
            IMDB
          </span>
          <span className="text-xl hidden sm:inline">website</span>
        </Link>
      </div>
    </div>
  );
}
