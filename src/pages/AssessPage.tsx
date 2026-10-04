import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TonePills } from "../components/TonePills";
import { scoreAssessment, type AssessmentAnswers } from "../lib/assess";
import type { SkinTone } from "../types";

const FINDINGS = [
  { id: "patch", label: "A patch or area of color change" },
  { id: "spots", label: "Spots, bumps, or a rash" },
  { id: "swelling", label: "Swelling or welts" },
  { id: "color-change", label: "Lips, nails, or eyes look different" },
];

const COLORS = [
  { id: "darker", label: "Darker than nearby skin" },
  { id: "lighter", label: "Lighter than nearby skin" },
  { id: "purple", label: "Purple, violaceous, or brown-purple" },
  { id: "grey", label: "Grey, ashen, or dusky" },
  { id: "yellow", label: "Yellow" },
  { id: "pink", label: "Pink or red (if visible)" },
];

const TEXTURES = [
  { id: "flat", label: "Flat" },
  { id: "raised", label: "Raised" },
  { id: "scaly", label: "Dry or scaly" },
  { id: "blistered", label: "Blistered" },
  { id: "crusted", label: "Crusted or weeping" },
];

const SYMPTOMS = [
  { id: "itch", label: "Itch" },
  { id: "pain", label: "Pain or tenderness" },
  { id: "heat", label: "The area feels hot" },
  { id: "fever", label: "Fever or looking very unwell" },
  { id: "breathing", label: "Trouble breathing or throat tightness" },
];

export function AssessPage() {
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    tone: null,
    finding: null,
    color: null,
    texture: null,
    symptoms: [],
    blanching: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const result = useMemo(() => scoreAssessment(answers), [answers]);

  function toggleSymptom(id: string) {
    setAnswers((current) => ({
      ...current,
      symptoms: current.symptoms.includes(id)
        ? current.symptoms.filter((item) => item !== id)
        : [...current.symptoms, id],
    }));
  }

  return (
    <section>
      <p className="kicker">Condition self-check</p>
      <h1 className="section-title" style={{ fontSize: "2.3rem" }}>
        Visual check
      </h1>
      <p className="blurb" style={{ marginLeft: 0 }}>
        This does not diagnose. It routes you to the closest SkinAware plates
        and tells you when to stop and call for emergency care.
      </p>

      <div className="stepper">
        <div className="panel" style={{ padding: 18 }}>
          <h2>1. Skin tone of the child</h2>
          <TonePills
            allowAll={false}
            value={answers.tone}
            onChange={(tone: SkinTone | null) =>
              setAnswers((current) => ({ ...current, tone }))
            }
          />
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <h2>2. What are you seeing?</h2>
          <div className="choice-grid">
            {FINDINGS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`choice ${answers.finding === item.id ? "selected" : ""}`}
                onClick={() =>
                  setAnswers((current) => ({ ...current, finding: item.id }))
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <h2>3. Color compared with surrounding skin</h2>
          <div className="choice-grid">
            {COLORS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`choice ${answers.color === item.id ? "selected" : ""}`}
                onClick={() =>
                  setAnswers((current) => ({ ...current, color: item.id }))
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <h2>4. Texture</h2>
          <div className="choice-grid">
            {TEXTURES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`choice ${answers.texture === item.id ? "selected" : ""}`}
                onClick={() =>
                  setAnswers((current) => ({ ...current, texture: item.id }))
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <h2>5. Press test (glass / tumbler)</h2>
          <div className="choice-grid">
            {[
              ["yes", "Fades under pressure"],
              ["no", "Does not fade"],
              ["unsure", "Not sure / could not test"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`choice ${answers.blanching === id ? "selected" : ""}`}
                onClick={() =>
                  setAnswers((current) => ({ ...current, blanching: id }))
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <h2>6. Symptoms</h2>
          <div className="choice-grid">
            {SYMPTOMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`choice ${answers.symptoms.includes(item.id) ? "selected" : ""}`}
                onClick={() => toggleSymptom(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <button
          className="primary"
          type="button"
          onClick={() => setSubmitted(true)}
        >
          Show closest plates
        </button>
      </div>

      {submitted ? (
        <div style={{ marginTop: 22 }}>
          {result.emergency ? (
            <div className="banner">
              <strong>Emergency pathway. </strong>
              {result.emergencyWhy}
            </div>
          ) : null}
          <h2 className="section-title" style={{ marginTop: 18 }}>
            Closest reference plates
          </h2>
          {result.matches.length === 0 ? (
            <p>
              Nothing scored high enough to suggest. Search by name or browse
              the library.
            </p>
          ) : (
            <div className="grid">
              {result.matches.map((match) => {
                const tone = answers.tone ?? "dark";
                return (
                  <Link
                    className="condition-card"
                    key={match.condition.id}
                    to={`/condition/${match.condition.id}/${tone}`}
                  >
                    <div className="meta">
                      <div className="kicker">{match.reason}</div>
                      <strong>{match.condition.name}</strong>
                      <p style={{ color: "var(--ink-soft)" }}>
                        {match.condition.summary.slice(0, 120)}…
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
