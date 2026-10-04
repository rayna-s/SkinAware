import { NavLink } from "react-router-dom";

export function PieMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      className={size > 40 ? "logo-mark logo-mark-lg" : "logo-mark"}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="31" fill="#F8F1E8" />
      {/* Light peach — top third */}
      <path d="M32 32 L32 4 A28 28 0 0 1 56.248 46 Z" fill="#E8C2A6" />
      {/* Wheatish / tawny — lower right third */}
      <path d="M32 32 L56.248 46 A28 28 0 0 1 7.752 46 Z" fill="#C49A5A" />
      {/* Deep brown — lower left third */}
      <path d="M32 32 L7.752 46 A28 28 0 0 1 32 4 Z" fill="#5C3317" />
    </svg>
  );
}

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className="logo" aria-label="SkinAware">
      <PieMark size={large ? 72 : 36} />
      <span className="logo-word">SkinAware</span>
    </span>
  );
}

export function BrandLink() {
  return (
    <NavLink to="/" className="logo" aria-label="SkinAware home">
      <Logo />
    </NavLink>
  );
}
