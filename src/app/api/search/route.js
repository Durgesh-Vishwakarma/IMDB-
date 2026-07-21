import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").slice(0, 120);
  const page = searchParams.get("page") || "1";

  if (!query.trim()) {
    return NextResponse.json({ results: [], totalResults: 0 });
  }

  try {
    // searchMovies returns a normalised list object, so spread it rather than
    // nesting — the previous version produced { results: { results: [...] } }.
    const data = await searchMovies(query, page);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Failed to search movies" },
      { status: 502 },
    );
  }
}
