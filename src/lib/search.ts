import { CONDITIONS } from "../data/conditions";
import { SKIN_TONES, type SkinTone } from "../types";

export interface ParsedQuery {
  raw: string;
  conditionText: string;
  tone: SkinTone | null;
}

export interface RankedCondition {
  id: string;
  name: string;
  score: number;
  matchedOn: string;
}

const TONE_WORDS: Record<SkinTone, string[]> = {
  light: [
    "light",
    "fair",
    "pale",
    "white",
    "fitzpatrick i",
    "fitzpatrick 1",
    "fitzpatrick ii",
    "fitzpatrick 2",
  ],
  medium: [
    "medium",
    "olive",
    "tan",
    "brown",
    "fitzpatrick iii",
    "fitzpatrick 3",
    "fitzpatrick iv",
    "fitzpatrick 4",
  ],
  dark: [
    "dark",
    "deep",
    "black",
    "richly pigmented",
    "fitzpatrick v",
    "fitzpatrick 5",
    "fitzpatrick vi",
    "fitzpatrick 6",
  ],
};

const STOP_WORDS = new Set([
  "on",
  "in",
  "the",
  "a",
  "an",
  "of",
  "for",
  "with",
  "and",
  "skin",
  "tone",
  "patient",
  "child",
  "kid",
  "student",
]);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesPhrase(haystack: string, needle: string): boolean {
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\s)${escaped}(?=\\s|$)`).test(haystack);
}

export function detectTone(text: string): SkinTone | null {
  const normalized = normalize(text);
  const ranked = SKIN_TONES.map((tone) => {
    const hit = TONE_WORDS[tone.id].some((word) =>
      includesPhrase(normalized, word),
    );
    return { id: tone.id, hit };
  }).filter((entry) => entry.hit);

  if (ranked.length === 0) return null;
  if (includesPhrase(normalized, "dark")) return "dark";
  if (includesPhrase(normalized, "medium") || includesPhrase(normalized, "olive")) {
    return "medium";
  }
  if (includesPhrase(normalized, "light") || includesPhrase(normalized, "fair")) {
    return "light";
  }
  return ranked[0].id;
}

export function parseQuery(raw: string): ParsedQuery {
  const normalized = normalize(raw);
  const tone = detectTone(normalized);
  const toneWords = tone
    ? [...TONE_WORDS[tone]].sort((a, b) => b.length - a.length)
    : [];
  let conditionText = ` ${normalized} `;
  for (const word of toneWords) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    conditionText = conditionText.replace(
      new RegExp(`\\s${escaped}(?=\\s)`, "g"),
      " ",
    );
  }
  conditionText = conditionText
    .split(" ")
    .filter((token) => token && !STOP_WORDS.has(token))
    .join(" ")
    .trim();

  return { raw, conditionText, tone };
}

function scoreMatch(haystack: string, needle: string): number {
  const h = normalize(haystack);
  const n = normalize(needle);
  if (!n) return 0;
  if (h === n) return 100;
  if (h.startsWith(n)) return 80;
  if (h.includes(n)) return 64;
  const hTokens = h.split(" ");
  const nTokens = n.split(" ");
  const overlap = nTokens.filter((token) => hTokens.some((part) => part.startsWith(token) || token.startsWith(part))).length;
  if (overlap === 0) return 0;
  return Math.round((overlap / nTokens.length) * 48);
}

export function searchConditions(raw: string): RankedCondition[] {
  const { conditionText } = parseQuery(raw);
  if (!conditionText) {
    return CONDITIONS.map((condition) => ({
      id: condition.id,
      name: condition.name,
      score: 0,
      matchedOn: "",
    }));
  }

  return CONDITIONS.map((condition) => {
    const nameScore = scoreMatch(condition.name, conditionText);
    const aliasScores = condition.aliases.map((alias) => ({
      alias,
      score: scoreMatch(alias, conditionText),
    }));
    aliasScores.sort((a, b) => b.score - a.score);
    const bestAlias = aliasScores[0];
    const score = Math.max(nameScore, bestAlias?.score ?? 0);
    const matchedOn =
      nameScore >= (bestAlias?.score ?? 0) ? condition.name : bestAlias.alias;
    return { id: condition.id, name: condition.name, score, matchedOn };
  })
    .filter((result) => result.score >= 24)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

export function suggestionsFor(raw: string, limit = 6): string[] {
  const { conditionText, tone } = parseQuery(raw);
  const matches = searchConditions(raw).slice(0, limit);
  const toneLabel = tone ? ` on ${tone} skin` : "";
  if (matches.length > 0) {
    return matches.map((match) => `${match.name.toLowerCase()}${toneLabel}`);
  }
  if (!conditionText) {
    return [
      "bruise on dark skin",
      "eczema on medium skin",
      "hypoxia on dark skin",
      "meningococcal rash on medium skin",
    ];
  }
  return [];
}
