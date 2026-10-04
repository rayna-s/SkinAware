import { SKIN_TONES, type SkinTone } from "../types";

export function TonePills({
  value,
  onChange,
  allowAll = true,
}: {
  value: SkinTone | null;
  onChange: (tone: SkinTone | null) => void;
  allowAll?: boolean;
}) {
  return (
    <div className="tone-row" role="group" aria-label="Skin tone">
      {allowAll ? (
        <button
          type="button"
          className={`tone-pill ${value === null ? "active" : ""}`}
          onClick={() => onChange(null)}
        >
          All tones
        </button>
      ) : null}
      {SKIN_TONES.map((tone) => (
        <button
          type="button"
          key={tone.id}
          className={`tone-pill ${value === tone.id ? "active" : ""}`}
          onClick={() => onChange(tone.id)}
        >
          <span className="swatch" style={{ background: tone.swatch }} />
          {tone.label}
        </button>
      ))}
    </div>
  );
}
