import React, { useEffect, useRef, useState } from "react";
import { CRAYON_FILTER, crayon, radius, scrollToSection, space } from "../tokens/crayon";
import { BORDER, CrayonBorder } from "../atoms/Crayon";
import { Button } from "../atoms/Button/Button";
import { useDeviceType } from "../../hooks/useDeviceType";

/** The ink rule along the nav's base. */
const EDGE_RULE = { height: 2, overhang: -2, opacity: 0.55 } as const;
/** The hamburger panel hangs off the nav's bottom edge, clear of the crayon bar. */
const MENU_PANEL = { top: "100%", minWidth: 200, offset: space.sm, radius: radius.lg } as const;
const TOGGLE_ICON = 28;
/** Desktop tabs are spread evenly across this width, centered in the bar. */
const DESKTOP_NAV_WIDTH = 1032;

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
        background: crayon.paper,
        padding: `${space.smLg} clamp(${space.md}, 5vw, ${space["3xl"]}) ${space.sm}`,
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "flex-end" : "center",
        gap: space.md,
      }}
    >
      {isMobile ? (
        <div ref={menuRef} style={{ position: "relative", display: "flex" }}>
          <Button
            variant="link"
            accessibilityLabel={menuOpen ? "Close menu" : "Open menu"}
            ariaExpanded={menuOpen}
            ariaHasPopup
            icon={{ name: menuOpen ? "close" : "hamburger", size: TOGGLE_ICON, color: crayon.accentBlue }}
            onClick={() => setMenuOpen((open) => !open)}
          />

          {menuOpen && (
            <div
              role="menu"
              style={{
                position: "absolute",
                top: MENU_PANEL.top,
                right: 0,
                zIndex: 1,
                marginTop: MENU_PANEL.offset,
                // The links get the full min-width; the padding sits outside it.
                boxSizing: "content-box",
                minWidth: MENU_PANEL.minWidth,
                background: crayon.paperRaised,
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
              <CrayonBorder color={crayon.ink} width={BORDER.card} radius={MENU_PANEL.radius} />

              {links.map((link) => (
                <Button
                  key={link.target}
                  variant="link"
                  role="menuitem"
                  textClass="headline-h6"
                  fullWidth
                  textAlign="left"
                  onClick={() => select(link.target)}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: DESKTOP_NAV_WIDTH,
            justifyContent: "space-between",
          }}
        >
          {links.map((link) => (
            <Button key={link.target} variant="link" onClick={() => scrollToSection(link.target)}>
              {link.label}
            </Button>
          ))}
        </div>
      )}

      {/* Ink crayon rule along the bottom edge */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: EDGE_RULE.overhang,
          height: EDGE_RULE.height,
          background: crayon.ink,
          opacity: EDGE_RULE.opacity,
          filter: CRAYON_FILTER,
        }}
      />
    </nav>
  );
};
