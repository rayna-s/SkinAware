import { CONDITIONS } from "../data/conditions";
import type { Condition, SkinTone } from "../types";

export interface AssessmentAnswers {
  tone: SkinTone | null;
  finding: string | null;
  color: string | null;
  texture: string | null;
  symptoms: string[];
  blanching: string | null;
}

export interface AssessmentResult {
  emergency: boolean;
  emergencyWhy: string | null;
  matches: { condition: Condition; reason: string; score: number }[];
}

const inGroup = (id: string, group: string[]) => group.includes(id);

export function scoreAssessment(answers: AssessmentAnswers): AssessmentResult {
  const emergencyWhy =
    answers.symptoms.includes("breathing")
      ? "Trouble breathing, throat tightness, or collapse is an emergency. Follow anaphylaxis / EMS protocol now."
      : answers.blanching === "no" && answers.symptoms.includes("fever")
        ? "A non-blanching rash with fever is treated as meningococcal disease until a clinician says otherwise. Call EMS."
        : answers.finding === "color-change" && answers.color === "grey"
          ? "Dusky or grey lips can be hypoxia. Check breathing and mucous membranes now."
          : null;

  const scored = CONDITIONS.map((condition) => {
    let score = 0;
    const reasons: string[] = [];
    const bump = (points: number, reason: string) => {
      score += points;
      reasons.push(reason);
    };
    const id = condition.id;

    if (
      answers.finding === "spots" &&
      inGroup(id, [
        "meningococcal",
        "measles",
        "hfmd",
        "impetigo",
        "insect-bite",
        "ringworm",
        "molluscum",
        "warts",
        "scabies",
        "heat-rash",
        "acne",
        "fifth-disease",
      ])
    ) {
      bump(8, "spot or rash pattern");
    }
    if (
      answers.finding === "patch" &&
      inGroup(id, [
        "eczema",
        "cellulitis",
        "bruise",
        "hematoma",
        "hives",
        "poison-ivy",
        "vitiligo",
        "fifth-disease",
      ])
    ) {
      bump(8, "patch or area of color change");
    }
    if (
      answers.finding === "swelling" &&
      inGroup(id, ["hives", "insect-bite", "cellulitis", "hematoma"])
    ) {
      bump(10, "swelling");
    }
    if (answers.finding === "color-change" && inGroup(id, ["hypoxia", "dark-circles"])) {
      bump(12, "lips, nails, or eye-area color");
    }
    if (
      answers.color === "purple" &&
      inGroup(id, ["bruise", "hematoma", "meningococcal", "hypoxia", "cellulitis"])
    ) {
      bump(10, "purple or violaceous color");
    }
    if (answers.color === "grey" && inGroup(id, ["hypoxia", "eczema", "frostbite"])) {
      bump(10, "grey or ashen change");
    }
    if (answers.color === "yellow" && id === "impetigo") bump(6, "honey-yellow crust");
    if (answers.color === "lighter" && inGroup(id, ["vitiligo", "ringworm", "molluscum"])) {
      bump(12, "lighter than surrounding skin");
    }
    if (
      answers.color === "darker" &&
      inGroup(id, ["bruise", "hematoma", "eczema", "cellulitis", "dark-circles", "acne"])
    ) {
      bump(6, "darker than surrounding skin");
    }
    if (answers.texture === "scaly" && inGroup(id, ["eczema", "ringworm", "athletes-foot"])) {
      bump(12, "scale");
    }
    if (
      answers.texture === "blistered" &&
      inGroup(id, ["hfmd", "poison-ivy", "impetigo", "cold-sores", "frostbite"])
    ) {
      bump(12, "blisters");
    }
    if (answers.texture === "crusted" && inGroup(id, ["impetigo", "cold-sores"])) {
      bump(14, "crust");
    }
    if (
      answers.texture === "raised" &&
      inGroup(id, ["hives", "insect-bite", "molluscum", "warts", "heat-rash", "acne"])
    ) {
      bump(8, "raised lesions");
    }
    if (
      answers.symptoms.includes("itch") &&
      inGroup(id, [
        "eczema",
        "hives",
        "insect-bite",
        "ringworm",
        "scabies",
        "poison-ivy",
        "heat-rash",
        "athletes-foot",
      ])
    ) {
      bump(8, "itch");
    }
    if (
      answers.symptoms.includes("pain") &&
      inGroup(id, ["bruise", "hematoma", "cellulitis", "frostbite", "cold-sores"])
    ) {
      bump(8, "pain");
    }
    if (answers.symptoms.includes("heat") && inGroup(id, ["cellulitis", "heat-rash"])) {
      bump(10, "heat");
    }
    if (
      answers.symptoms.includes("fever") &&
      inGroup(id, ["meningococcal", "measles", "cellulitis", "hfmd", "fifth-disease"])
    ) {
      bump(10, "fever");
    }
    if (answers.blanching === "no" && id === "meningococcal") bump(22, "does not blanch");
    if (answers.blanching === "yes" && id === "hives") bump(6, "blanches");

    return {
      condition,
      reason: reasons.slice(0, 3).join(", ") || "partial match",
      score,
    };
  })
    .filter((row) => row.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return {
    emergency: Boolean(emergencyWhy),
    emergencyWhy,
    matches: scored,
  };
}
