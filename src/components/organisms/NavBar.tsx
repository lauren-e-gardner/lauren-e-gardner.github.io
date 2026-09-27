import React from "react";
import { CRAYON_FILTER, crayon, scrollToSection, space } from "../tokens/crayon";

/** The yellow scribble behind the "LG" monogram, and the bar along the base. */
const LOGO_BLOB = { left: -6, top: 4, width: 44, height: 30, radius: "48% 52% 40% 60%" } as const;
const EDGE_BAR = { height: 5, overhang: -3 } as const;

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
        padding: `${space.smLg} clamp(${space.md}, 5vw, ${space["3xl"]}) ${space.sm}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: space.md,
      }}
    >
      <a
        href="#home"
        onClick={go("home")}
        className="headline-h6"
        style={{ color: crayon.maroon, position: "relative", display: "flex" }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: LOGO_BLOB.left,
            top: LOGO_BLOB.top,
            width: LOGO_BLOB.width,
            height: LOGO_BLOB.height,
            background: crayon.yellow,
            borderRadius: LOGO_BLOB.radius,
            filter: CRAYON_FILTER,
            mixBlendMode: "multiply",
          }}
        />
        <span style={{ position: "relative" }}>LG</span>
      </a>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: `clamp(${space.sm}, 2.4vw, ${space.xl})`,
          justifyContent: "flex-end",
        }}
      >
        {links.map((link) => (
          <button key={link.target} className="crayon-nav-link headline-h8" onClick={() => scrollToSection(link.target)}>
            {link.label}
          </button>
        ))}
      </div>

      {/* Red crayon bar along the bottom edge */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: EDGE_BAR.overhang,
          height: EDGE_BAR.height,
          background: crayon.red,
          filter: CRAYON_FILTER,
        }}
      />
    </nav>
  );
};
