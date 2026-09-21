import { score, TypeSafeClient } from "@typesafe-ai/sdk";
import { getCollection } from "astro:content";
import { TYPESAFE_API_KEY } from "astro:env/server";

const MATCH_PROBABILITY = 0.5;
const PATTERNS_PER_REQUEST = 64;

export interface PatternMatch {
  id: string;
  score: number;
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
      state: { query },
      questions: Object.fromEntries(
        batch.map((pattern) => [
          pattern.id,
          score(
            {
              pattern,
              question: `How much practical guidance does the design pattern at \`pattern\` (titled "${pattern.title}") provide for designing or building the thing named in \`query\`, directly or by analogy?`,
            },
            [
              "The pattern provides no applicable guidance for designing or building the thing in the query.",
              "The pattern shares a theme with the thing in the query but does not guide a concrete design decision.",
              "The pattern's solution guides a concrete supporting detail in designing or building the thing in the query, directly or by analogy.",
              "The pattern's solution guides a central design decision for the thing in the query, directly or by analogy.",
            ],
          ),
        ]),
      ),
    });
    return batch.flatMap((pattern) => {
      const answer = result.answers[pattern.id];
      if (!answer) {
        throw new Error(`Missing pattern score: ${pattern.id}`);
      }
      const probability = answer.probabilities[2] + answer.probabilities[3];
      return probability >= MATCH_PROBABILITY
        ? [{ id: pattern.id, score: answer.score }]
        : [];
    });
  });

  return (await Promise.all(batches)).flat().sort((a, b) => b.score - a.score);
};
