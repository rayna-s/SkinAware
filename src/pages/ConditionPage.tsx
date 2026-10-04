import { Link, Navigate, useParams } from "react-router-dom";
import { CONDITION_BY_ID } from "../data/conditions";
import { SKIN_TONES, type SkinTone } from "../types";
import { ConditionImage, imagePath } from "../components/ConditionImage";

const TONES = new Set(["light", "medium", "dark"]);

export function ConditionPage() {
  const { id = "", tone = "dark" } = useParams();
  const condition = CONDITION_BY_ID[id];
  if (!condition) return <Navigate to="/" replace />;
  const selected = (TONES.has(tone) ? tone : "dark") as SkinTone;
  const presentation = condition.presentations[selected];
  const toneMeta = SKIN_TONES.find((entry) => entry.id === selected)!;

  return (
    <article>
      <p className="kicker">
        {condition.category} · {toneMeta.fitzpatrick}
      </p>
      <h1 className="section-title" style={{ fontSize: "2.4rem" }}>
        {condition.name} on {selected} skin
      </h1>
      <p className="blurb" style={{ marginLeft: 0 }}>
        {condition.summary}
      </p>
      <span className={`urgency ${condition.urgency}`}>
        {condition.urgency} review
      </span>

      <div className="detail-layout" style={{ marginTop: 22 }}>
        <div className="detail-image-wrap">
          <ConditionImage
            className="detail-image"
            src={imagePath(condition.id, selected)}
            tone={selected}
            alt={`${condition.name} on ${selected} skin, AI-generated clinical reference`}
          />
        </div>
        <div className="detail-copy">
          <h2>How it presents</h2>
          <p>{presentation.appearance}</p>
          <h3>Look for</h3>
          <ul className="list">
            {presentation.lookFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Easy to miss</h3>
          <p>{presentation.easyToMiss}</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 18, padding: 18 }}>
        <h2>Compare tones</h2>
        <div className="compare">
          {SKIN_TONES.map((entry) => (
            <Link key={entry.id} to={`/condition/${condition.id}/${entry.id}`}>
              <ConditionImage
                src={imagePath(condition.id, entry.id)}
                tone={entry.id}
                alt={`${condition.name} on ${entry.id} skin`}
              />
              <div className="kicker" style={{ marginTop: 8 }}>
                {entry.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="detail-layout" style={{ marginTop: 18 }}>
        <div className="panel" style={{ padding: 18 }}>
          <h2>In the school clinic</h2>
          <ul className="list">
            {condition.schoolNurseNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <h2>Red flags</h2>
          <ul className="list">
            {condition.redFlags.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
