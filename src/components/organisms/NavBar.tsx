import React, { useEffect, useRef, useState } from "react";
import { CRAYON_FILTER, crayon, radius, scrollToSection, space } from "../tokens/crayon";
import { BORDER, CrayonBorder } from "../atoms/Crayon";
import { useDeviceType } from "../../hooks/useDeviceType";
import Icon from "../atoms/Icon/Icon";

/** The yellow scribble behind the "LG" monogram, and the bar along the base. */
const LOGO_BLOB = { left: -6, top: 4, width: 44, height: 30, radius: "48% 52% 40% 60%" } as const;
const EDGE_BAR = { height: 5, overhang: -3 } as const;
/** The hamburger panel hangs off the nav's bottom edge, clear of the crayon bar. */
const MENU_PANEL = { top: "100%", minWidth: 200, offset: space.sm, radius: radius.lg } as const;

export interface NavLink {
  label: string;
  /** Id of the section the link scrolls to. */
  target: string;
}

interface NavBarProps {
  links?: NavLink[];
}

export const NavBar: React.FC<NavBarProps> = ({ links = [] }) => {
  const isMobile = useDeviceType() === "mobile";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(target);
  };

  /** Selecting a link closes the menu; the desktop bar has none to close. */
  const select = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  // A click anywhere outside the menu (button included) dismisses it, as does Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Resizing back up to desktop leaves no hamburger to close the menu with.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

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

      {isMobile ? (
        <div ref={menuRef} style={{ position: "relative", display: "flex" }}>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon name={menuOpen ? "close" : "hamburger"} size={28} color={crayon.maroon} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              style={{
                position: "absolute",
                top: MENU_PANEL.top,
                right: 0,
                zIndex: 1,
                marginTop: MENU_PANEL.offset,
                minWidth: MENU_PANEL.minWidth,
                background: crayon.paper,
                borderRadius: MENU_PANEL.radius,
                padding: `${space.mdLg} ${space.lg}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: space.mdLg,
              }}
            >
              {/* Drawn border rather than a CSS one, so the filter roughens the
                  frame without displacing the labels inside it. */}
              <CrayonBorder color={crayon.blue} width={BORDER.frame} radius={MENU_PANEL.radius} />

              {links.map((link) => (
                <button
                  key={link.target}
                  role="menuitem"
                  className="crayon-nav-link headline-h6"
                  style={{ position: "relative", textAlign: "left", width: "100%" }}
                  onClick={() => select(link.target)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
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
      )}

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
