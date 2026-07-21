"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Replace with a real error reporter (Sentry et al.) in production.
    console.error(error);
  }, [error]);

  const isUpstream = /TMDB|API_KEY/i.test(error?.message ?? "");

  return (
    <div className="shell flex flex-col items-center py-24 text-center">
      <span aria-hidden className="text-5xl">
        ⚠️
      </span>
      <h1 className="mt-5 font-display text-display-sm font-bold text-ink">
        {isUpstream ? "The film database isn't responding" : "Something broke"}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {isUpstream
          ? "MovieHub pulls its data from TMDB, and that request didn't come back. This is usually temporary — try again in a moment."
          : "An unexpected error stopped this page from rendering. Reloading often clears it."}
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-7">
        Try again
      </button>
    </div>
  );
}
