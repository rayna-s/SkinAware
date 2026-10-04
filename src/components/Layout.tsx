import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { BrandLink } from "./Logo";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <BrandLink />
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/assess">Visual check</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="page">{children}</main>
      <footer className="footer">
        SkinAware is a visual reference for trained health professionals. It is
        not a diagnosis, not a substitute for clinical judgment, and not a
        child-protection determination. Reference plates are licensed
        AI-generated studies (Shutterstock), not photographs of real patients.
      </footer>
    </div>
  );
}
