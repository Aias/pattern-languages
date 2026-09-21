import type { APIRoute } from "astro";
import { searchPatterns, type SearchResponse } from "../../lib/pattern-search";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    return Response.json({ error: "Missing search query" }, { status: 400 });
  }
  const body: SearchResponse = { query, matches: await searchPatterns(query) };
  return Response.json(body);
};
