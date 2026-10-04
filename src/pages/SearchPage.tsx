import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CONDITIONS, CONDITION_BY_ID } from "../data/conditions";
import { parseQuery, searchConditions } from "../lib/search";
import { SearchBar } from "../components/SearchBar";
import { TonePills } from "../components/TonePills";
import { ConditionImage, imagePath } from "../components/ConditionImage";
import type { SkinTone } from "../types";

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") ?? "";
  const parsed = parseQuery(q);
  const toneFromUrl = (params.get("tone") as SkinTone | null) || parsed.tone;
  const ranked = searchConditions(q);
  const results =
    ranked.length > 0
      ? ranked
          .map((row) => CONDITION_BY_ID[row.id])
          .filter(Boolean)
      : q
        ? []
        : CONDITIONS;

  function updateTone(tone: SkinTone | null) {
    const next = new URLSearchParams(params);
    if (tone) next.set("tone", tone);
    else next.delete("tone");
    setParams(next);
  }

  return (
    <>
      <SearchBar
        initial={q}
        onSubmit={(query) =>
          navigate(`/search?q=${encodeURIComponent(query)}`)
        }
      />
      <TonePills value={toneFromUrl} onChange={updateTone} />
      <h2 className="section-title" style={{ marginTop: 28 }}>
        {q ? `Results for “${q}”` : "All conditions"}
      </h2>
      {results.length === 0 ? (
        <p className="blurb">
          No plate matched that search. Try the condition name, an alias such
          as tinea or welts, or start a visual check.
        </p>
      ) : (
        <div className="grid">
          {results.map((condition) => {
            const tone = toneFromUrl ?? "dark";
            return (
              <Link
                className="condition-card"
                key={condition.id}
                to={`/condition/${condition.id}/${tone}`}
              >
                <ConditionImage
                  src={imagePath(condition.id, tone)}
                  tone={tone}
                  alt={`${condition.name} on ${tone} skin`}
                />
                <div className="meta">
                  <div className="kicker">
                    {condition.name} · {tone} skin
                  </div>
                  <strong>
                    {condition.name} on {tone} skin
                  </strong>
                  <p style={{ color: "var(--ink-soft)", margin: "6px 0 0" }}>
                    {condition.presentations[tone].appearance.slice(0, 110)}…
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
