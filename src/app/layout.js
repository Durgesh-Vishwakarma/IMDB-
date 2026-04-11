import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./Providers";
import SearchBox from "@/components/SearchBox";
import GenreFilter from "@/components/GenreFilter";
import YearSort from "@/components/YearSort";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "IMDB Movie Hub",
    template: "%s | IMDB Movie Hub",
  },
  description:
    "Discover trending and top-rated movies with a fast Next.js app using modern web best practices.",
  keywords: ["Next.js", "React", "TMDB", "movies", "SSR", "ISR", "SEO"],
  openGraph: {
    title: "IMDB Movie Hub",
    description:
      "Explore movies with optimized performance and SEO in Next.js.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <SearchBox />
          <Suspense fallback={<div className="page-shell h-12 pb-3 pt-1" />}>
            <GenreFilter />
          </Suspense>
          <Suspense fallback={<div className="page-shell h-10 pb-3" />}>
            <YearSort />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
