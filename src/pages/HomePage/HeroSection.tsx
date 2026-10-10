import { CrayonPill, FadeInSection, Header, PixelHero } from "../../components";
import { CRAYON_FILTER, crayon, SCROLL_OFFSET, space } from "../../components/tokens/crayon";

/** Languages called out under the hero, each in a crayon-outlined pill. */
const CURRENTLY_USING = ["JavaScript", "TypeScript", "ReactJS"];

/** Hero layout, and the handwritten note under the title. */
const HERO = { minHeight: "88vh", minColumn: "420px", titleGap: 14 };
const NOTE = { tilt: "-2deg", indent: 6, textTop: 10, maxWidth: "22em" };

export const HeroSection = () => (
  <FadeInSection id="home" style={{ scrollMarginTop: SCROLL_OFFSET }} placeholderHeight={HERO.minHeight}>
    <div
      style={{
        position: "relative",
        minHeight: HERO.minHeight,
        paddingTop: space["6xl"],
        paddingBottom: space["2xl"],
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${HERO.minColumn}),1fr))`,
        gap: `clamp(${space.xlLg}, 5vw, ${space["4xl"]})`,
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.lg }}>
        <div className="mono-m2 caps-wider crayon-label">software engineer · princeton ’24</div>
        <div style={{ display: "flex", flexDirection: "column", gap: HERO.titleGap }}>
          <Header title="Hi, I’m Lauren Gardner" variant="page" />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: space.sm,
              transform: `rotate(${NOTE.tilt})`,
              transformOrigin: "left",
              marginLeft: NOTE.indent,
            }}
          >
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden style={{ flex: "none", filter: CRAYON_FILTER }}>
              <path d="M30 26 C 22 24, 10 20, 6 5" stroke={crayon.accentBlue} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M1 10 L 6 3 L 12 8" stroke={crayon.accentBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p
              className="headline-h10 lh-tight crayon-label"
              style={{ maxWidth: NOTE.maxWidth, paddingTop: NOTE.textTop }}
            >
              this font is my actual handwriting!
            </p>
          </div>
        </div>
        <p className="body-b2 lh-snug" style={{ maxWidth: "32em" }}>
          I’m a software developer with experience in frontend design, 3D graphics, and full-stack
          development. As a Princeton University graduate, I approach programming with creativity —
          whether it’s finding innovative solutions or using code to fuel artistic expression.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: space.sm, alignItems: "center" }}>
          {CURRENTLY_USING.map((name) => (
            <CrayonPill key={name}>{name}</CrayonPill>
          ))}
        </div>
      </div>

      <PixelHero />
    </div>
  </FadeInSection>
);
