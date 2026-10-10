import { FadeInSection, Header, SkillsPanel } from "../../components";
import { SCROLL_OFFSET, space } from "../../components/tokens/crayon";

export const SkillsSection = () => (
  <FadeInSection id="skills" style={{ scrollMarginTop: SCROLL_OFFSET }}>
    <div className="crayon-section" style={{ gap: space["2xl"] }}>
      <Header title="Skills" variant="section" swipeRotate={1.5} />
      <SkillsPanel />
    </div>
  </FadeInSection>
);
