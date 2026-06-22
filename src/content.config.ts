import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const patterns = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/patterns" }),
  schema: z.object({
    title: z.string(),
    number: z.number().optional(),
    significance: z.number().min(0).max(3).default(0),
    dependsOn: z.array(z.string()).default([]),
    supports: z.array(z.string()).default([]),
  }),
});

export const collections = { patterns };
