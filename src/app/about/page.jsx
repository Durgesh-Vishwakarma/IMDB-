import React from "react";
import { MdMovie, MdSearch, MdStar } from "react-icons/md";

export const metadata = {
  title: "About",
  description:
    "Learn about MovieHub — a Next.js movie database app powered by the TMDB API, featuring SSR, ISR, dark mode, and a fully responsive TailwindCSS UI.",
  openGraph: {
    title: "About | MovieHub",
    description:
      "MovieHub is built with Next.js 14, TMDB API, TailwindCSS, and React Query — delivering real-time movie data with optimal SEO and performance.",
    type: "website",
  },
};

const features = [
  {
    icon: MdSearch,
    title: "Powerful Search",
    desc: "Find any movie or TV show instantly from a database of millions of titles.",
  },
  {
    icon: MdStar,
    title: "Top Rated & Trending",
    desc: "Stay up to date with what's popular and critically acclaimed worldwide.",
  },
  {
    icon: MdMovie,
    title: "Rich Movie Details",
    desc: "Dive into overviews, ratings, genres, and more for every title.",
  },
];

export default function About() {
  return (
    <section className="page-shell animate-fade-in py-10">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          About <span className="text-amber-500">MovieHub</span>
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Your modern gateway to cinema.
        </p>
      </div>

      {/* Feature cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass-panel rounded-2xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15">
              <Icon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="glass-panel space-y-5 rounded-2xl p-6 md:p-8">
        <p className="leading-7 text-slate-700 dark:text-slate-300">
          MovieHub is a web application that allows users to search and explore
          a vast library of movies, TV shows, and celebrities. With a
          user-friendly interface and a robust search engine, our platform makes
          it easy for film enthusiasts to discover new titles, read reviews, and
          get the latest news from the entertainment industry.
        </p>
        <p className="leading-7 text-slate-700 dark:text-slate-300">
          Built with Next.js and powered by the TMDB API, MovieHub leverages
          modern web technologies including SSR, ISR, and full dark-mode support
          to deliver a smooth, fast, and accessible experience for all users.
        </p>
        <p className="leading-7 text-slate-700 dark:text-slate-300">
          Whether you are a casual moviegoer or a die-hard cinephile, MovieHub
          has something for everyone. With regular updates and new features,
          start exploring our vast library today and discover a new world of
          entertainment!
        </p>
      </div>
    </section>
  );
}
