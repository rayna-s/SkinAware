import { describe, expect, it } from "vitest";
import { detectTone, parseQuery, searchConditions } from "./search";

describe("detectTone", () => {
  it("reads dark, medium, and light from natural queries", () => {
    expect(detectTone("bruise on dark skin")).toBe("dark");
    expect(detectTone("hypoxia on medium skin")).toBe("medium");
    expect(detectTone("eczema light")).toBe("light");
  });

  it("understands Fitzpatrick language", () => {
    expect(detectTone("petechiae fitzpatrick v")).toBe("dark");
    expect(detectTone("jaundice fitzpatrick iii")).toBe("medium");
  });
});

describe("parseQuery", () => {
  it("splits a nurse-style inquiry into condition and tone", () => {
    expect(parseQuery("bruise on dark skin")).toMatchObject({
      conditionText: "bruise",
      tone: "dark",
    });
    expect(parseQuery("hypoxia on medium skin")).toMatchObject({
      conditionText: "hypoxia",
      tone: "medium",
    });
  });
});

describe("searchConditions", () => {
  it("finds eczema from a common alias", () => {
    const results = searchConditions("atopic dermatitis on dark skin");
    expect(results[0]?.id).toBe("eczema");
  });

  it("finds meningococcal rash from glass-test language", () => {
    const results = searchConditions("non blanching rash on dark skin");
    expect(results[0]?.id).toBe("meningococcal");
  });

  it("finds hypoxia from cyanosis language", () => {
    const results = searchConditions("cyanosis on dark skin");
    expect(results[0]?.id).toBe("hypoxia");
  });

  it("finds ringworm from tinea", () => {
    const results = searchConditions("tinea corporis medium");
    expect(results[0]?.id).toBe("ringworm");
  });
});
