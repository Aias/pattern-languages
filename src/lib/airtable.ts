import Airtable from "airtable";

const BASE_ID = "appRtVtmOW4oibIij";

// Initialize Airtable
const base = new Airtable({
  apiKey: import.meta.env.AIRTABLE_ACCESS_TOKEN,
}).base(BASE_ID);

// Types
export interface Pattern {
  id: string;
  pattern: string;
  number: number | null;
  problem: string | null;
  solution: string | null;
  significance: number;
  dependsOnIds: string[];
  supportsIds: string[];
  // Resolved references (populated after fetching all patterns)
  dependsOn: PatternRef[];
  supports: PatternRef[];
}

export interface PatternRef {
  pattern: string;
}

type AirtableRecord = {
  id: string;
  fields: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getFields = (record: AirtableRecord): Record<string, unknown> => {
  if (!isRecord(record.fields)) {
    return {};
  }

  return record.fields;
};

const getString = (
  fields: Record<string, unknown>,
  key: string,
): string | null => {
  const value = fields[key];
  return typeof value === "string" ? value : null;
};

const getNumber = (
  fields: Record<string, unknown>,
  key: string,
): number | null => {
  const value = fields[key];
  return typeof value === "number" ? value : null;
};

const getStringArray = (
  fields: Record<string, unknown>,
  key: string,
): string[] => {
  const value = fields[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

const parseSignificance = (value: string | null): number => {
  if (!value) {
    return 0;
  }

  return Array.from(value).filter((char) => char === "⭐").length;
};

const getPatternName = (fields: Record<string, unknown>): string => {
  const name = getString(fields, "name");
  if (name) {
    return name;
  }

  return getString(fields, "pattern") ?? "";
};

// Fetch all patterns for the language
export async function getPatterns(): Promise<Pattern[]> {
  const patternRecords = await base("patterns")
    .select({ view: "Grid view" })
    .all();

  const patternIdToName = new Map<string, string>();
  for (const record of patternRecords) {
    const fields = getFields(record);
    const name = getPatternName(fields);
    if (name) {
      patternIdToName.set(record.id, name);
    }
  }

  const patterns = patternRecords.map((record) => {
    const fields = getFields(record);
    const dependsOnIds = getStringArray(fields, "depends_on");
    const supportsIds = getStringArray(fields, "supports");
    const number = getNumber(fields, "number");

    return {
      id: record.id,
      pattern: getPatternName(fields),
      number,
      problem: getString(fields, "problem"),
      solution: getString(fields, "solution"),
      significance: parseSignificance(getString(fields, "significance")),
      dependsOnIds,
      supportsIds,
      dependsOn: dependsOnIds
        .map((id) => patternIdToName.get(id))
        .filter((name): name is string => name !== undefined)
        .map((pattern) => ({ pattern })),
      supports: supportsIds
        .map((id) => patternIdToName.get(id))
        .filter((name): name is string => name !== undefined)
        .map((pattern) => ({ pattern })),
    };
  });

  return patterns.sort((a, b) => {
    const left = a.number ?? Number.POSITIVE_INFINITY;
    const right = b.number ?? Number.POSITIVE_INFINITY;
    return left - right;
  });
}
