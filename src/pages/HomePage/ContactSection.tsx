import { ContactPanel, FadeInSection } from "../../components";
import { SCROLL_OFFSET, space } from "../../components/tokens/crayon";

/** The contact panel, plus the page footer. */
export const ContactSection = () => (
  <FadeInSection id="contact" style={{ scrollMarginTop: SCROLL_OFFSET }}>
    <div className="crayon-section" style={{ paddingBottom: space["5xl"], gap: 0 }}>
      <ContactPanel />

      <div
        className="mono-m2 crayon-muted"
        style={{
          marginTop: space.xlLg,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: space.smLg,
        }}
      >
        <span>© {new Date().getFullYear()} Lauren Gardner</span>
        <span>built with React + TypeScript</span>
      </div>
    </div>
  </FadeInSection>
);
