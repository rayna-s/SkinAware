import { Link, useNavigate } from "react-router-dom";
import { CONDITIONS } from "../data/conditions";
import { SearchBar } from "../components/SearchBar";
import { Logo } from "../components/Logo";
import { ConditionImage, imagePath } from "../components/ConditionImage";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <Logo large />
        <h1>See the condition on the skin in front of you.</h1>
        <p className="blurb">
          Search a condition and a skin tone — for example, eczema on dark
          skin. SkinAware is a field reference for school nurses and health
          professionals when presentation does not match the textbook photo
          taken on white skin.
        </p>
        <SearchBar
          onSubmit={(query) =>
            navigate(`/search?q=${encodeURIComponent(query)}`)
          }
        />
      </section>

      <div className="home-actions">
        <Link className="assess-card" to="/assess">
          <p className="kicker">Not sure what you are seeing?</p>
          <h2>Start a visual check</h2>
          <p>
            Answer a few questions about color, texture, and symptoms. We will
            point you to the closest reference plates — and flag emergencies.
          </p>
        </Link>
        <div className="note-card">
          <p className="kicker">How to search</p>
          <h2>Condition + tone</h2>
          <p>
            Use light, medium, or dark. Each bucket covers two Fitzpatrick
            types: I–II, III–IV, and V–VI.
          </p>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: 36 }}>
        Browse the library
      </h2>
      <div className="grid">
        {CONDITIONS.map((condition) => (
          <Link
            className="condition-card"
            key={condition.id}
            to={`/condition/${condition.id}/dark`}
          >
            <ConditionImage
              src={imagePath(condition.id, "dark")}
              tone="dark"
              alt={`${condition.name} on dark skin`}
            />
            <div className="meta">
              <div className="kicker">{condition.category}</div>
              <strong>{condition.name}</strong>
              <p style={{ color: "var(--ink-soft)", margin: "6px 0 0" }}>
                {condition.summary.slice(0, 90)}…
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
