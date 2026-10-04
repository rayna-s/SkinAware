export type SkinTone = "light" | "medium" | "dark";

export type Urgency = "routine" | "prompt" | "urgent" | "emergency";

export type Category =
  | "injury"
  | "rash"
  | "infection"
  | "systemic"
  | "allergic";

export interface TonePresentation {
  appearance: string;
  lookFor: string[];
  easyToMiss: string;
}

export interface Condition {
  id: string;
  name: string;
  aliases: string[];
  category: Category;
  summary: string;
  urgency: Urgency;
  schoolNurseNotes: string[];
  redFlags: string[];
  presentations: Record<SkinTone, TonePresentation>;
}

export const SKIN_TONES: {
  id: SkinTone;
  label: string;
  fitzpatrick: string;
  swatch: string;
  hint: string;
}[] = [
  {
    id: "light",
    label: "Light",
    fitzpatrick: "Fitzpatrick I–II",
    swatch: "#E8C2A6",
    hint: "Light peach — pale to fair skin that burns easily",
  },
  {
    id: "medium",
    label: "Medium",
    fitzpatrick: "Fitzpatrick III–IV",
    swatch: "#C49A5A",
    hint: "Wheatish / tawny — olive to moderate brown skin",
  },
  {
    id: "dark",
    label: "Dark",
    fitzpatrick: "Fitzpatrick V–VI",
    swatch: "#5C3317",
    hint: "Deep brown — richly pigmented skin",
  },
];
