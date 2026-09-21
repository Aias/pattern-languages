import { noul, TypeSafeClient } from "@typesafe-ai/sdk";
import { getCollection } from "astro:content";
import { TYPESAFE_API_KEY } from "astro:env/server";

const MATCH_FLOOR = 0.5;
const MATCH_WINDOW = 0.15;
const MIN_MATCHES = 3;
const PATTERNS_PER_REQUEST = 64;

export interface PatternMatch {
  id: string;
  probability: number;
}

export interface SearchResponse {
  query: string;
  matches: PatternMatch[];
}

const chunk = <T>(items: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, (index + 1) * size),
  );

export const searchPatterns = async (
  query: string,
): Promise<PatternMatch[]> => {
  const client = new TypeSafeClient({ apiKey: TYPESAFE_API_KEY });
  const patterns = (await getCollection("patterns")).map((pattern) => ({
    id: pattern.id,
    title: pattern.data.title,
    text: pattern.body ?? "",
  }));

  const batches = chunk(patterns, PATTERNS_PER_REQUEST).map(async (batch) => {
    const result = await client.systemOne({
      state: { query, patterns: batch },
      questions: Object.fromEntries(
        batch.map((pattern, index) => [
          pattern.id,
          noul(
            `Would the design pattern at \`patterns[${index}]\` (titled "${pattern.title}") be applied, literally or by analogy, while designing, producing, or constructing the thing named in \`query\`?`,
            {
              true: "Someone designing or building the thing in the query would draw on this pattern's solution, either directly or by translating its underlying principle to the query's own scale, medium, or materials.",
              false:
                "Neither the pattern's solution nor its underlying principle would inform how the thing in the query is designed or built.",
            },
          ),
        ]),
      ),
    });
    return batch.map((pattern) => ({
      id: pattern.id,
      probability: result.answers[pattern.id]?.noul ?? 0,
    }));
  });

  const ranked = (await Promise.all(batches))
    .flat()
    .sort((a, b) => b.probability - a.probability);
  const cutoff = Math.max(
    MATCH_FLOOR,
    (ranked[0]?.probability ?? 0) - MATCH_WINDOW,
  );
  const aboveCutoff = ranked.filter(
    (match) => match.probability >= cutoff,
  ).length;
  return ranked.slice(0, Math.max(aboveCutoff, MIN_MATCHES));
};
