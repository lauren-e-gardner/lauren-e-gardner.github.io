import { Card, FadeInSection, Header } from "../../components";
import { SCROLL_OFFSET, space } from "../../components/tokens/crayon";
import { experience } from "../../configs";

export const ExperienceSection = () => (
  <FadeInSection id="work-experience" style={{ scrollMarginTop: SCROLL_OFFSET }}>
    <div className="crayon-section">
      <Header title="Experience" variant="section" swipeRotate={-1} />
      <div style={{ display: "flex", flexDirection: "column", gap: space.xlLg }}>
        {experience.map((job) => (
          <Card
            key={job.company}
            variant="experience"
            title={job.title}
            org={job.company}
            date={job.date}
            subtitle={job.location}
            points={job.points}
          />
        ))}
      </div>
    </div>
  </FadeInSection>
);
