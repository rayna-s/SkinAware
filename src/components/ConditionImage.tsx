import { useState, type CSSProperties } from "react";
import type { SkinTone } from "../types";

const TONE_PLATES: Record<SkinTone, string> = {
  light: "#e8c2a6",
  medium: "#c49a5a",
  dark: "#5c3317",
};

export function ConditionImage({
  src,
  alt,
  tone,
  className,
}: {
  src: string;
  alt: string;
  tone: SkinTone;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-fallback ${className ?? ""}`}
        style={{ "--plate": TONE_PLATES[tone] } as CSSProperties}
      >
        Reference photo unavailable. {alt}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

export function imagePath(conditionId: string, tone: SkinTone): string {
  return `./images/${conditionId}-${tone}.jpg`;
}
