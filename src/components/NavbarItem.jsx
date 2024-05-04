"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavbarItem({ title, params }) {
  let searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  return (
    <div>
      <Link
        className={`hover:text-amber-600 font-semibold ${
          genre === params
            ? "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"
            : ""
        }`}
        href={`/?genre=${params}`}
      >
        {title}
      </Link>
    </div>
  );
}
