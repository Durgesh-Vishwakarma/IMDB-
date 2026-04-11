import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  try {
    const results = await searchMovies(query);
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to search movies" },
      { status: 500 },
    );
  }
}
