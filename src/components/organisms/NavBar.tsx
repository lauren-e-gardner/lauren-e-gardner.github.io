import React from "react";
import { CRAYON_FILTER, crayon, scrollToSection } from "../tokens/crayon";

export interface NavLink {
  label: string;
  /** Id of the section the link scrolls to. */
  target: string;
}

interface NavBarProps {
  links?: NavLink[];
}

export const NavBar: React.FC<NavBarProps> = ({ links = [] }) => {
  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(target);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: crayon.cream,
        padding: "14px clamp(16px,5vw,64px) 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <a
        href="#home"
        onClick={go("home")}
        className="crayon-hand"
        style={{ fontSize: 34, lineHeight: 1, color: crayon.maroon, position: "relative", display: "flex" }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: -6,
            top: 4,
            width: 44,
            height: 30,
            background: crayon.yellow,
            borderRadius: "48% 52% 40% 60%",
            filter: CRAYON_FILTER,
            mixBlendMode: "multiply",
          }}
        />
        <span style={{ position: "relative" }}>LG</span>
      </a>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(10px,2.4vw,32px)", justifyContent: "flex-end" }}>
        {links.map((link) => (
          <button key={link.target} className="crayon-nav-link" onClick={() => scrollToSection(link.target)}>
            {link.label}
          </button>
        ))}
      </div>

      {/* Red crayon bar along the bottom edge */}
      <div
        aria-hidden
        style={{ position: "absolute", left: 0, right: 0, bottom: -3, height: 5, background: crayon.red, filter: CRAYON_FILTER }}
      />
    </nav>
  );
};
