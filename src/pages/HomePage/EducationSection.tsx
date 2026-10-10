import { Card, FadeInSection, Header } from "../../components";
import { SCROLL_OFFSET } from "../../components/tokens/crayon";
import { education } from "../../configs";

export const EducationSection = () => (
  <FadeInSection id="education" style={{ scrollMarginTop: SCROLL_OFFSET }}>
    <div className="crayon-section">
      <Header title="Education" variant="section" swipeRotate={1.5} />
      {education.map((edu) => (
        <Card
          key={edu.school}
          variant="education"
          title={edu.school}
          subtitle={edu.degree}
          role={edu.year}
          date={edu.gpa}
          points={edu.points}
          tilt={-0.4}
        />
      ))}
    </div>
  </FadeInSection>
);
