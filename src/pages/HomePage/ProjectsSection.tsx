import { Card, FadeInSection, Header } from "../../components";
import { SCROLL_OFFSET, space } from "../../components/tokens/crayon";
import { projects } from "../../configs";

/** Resting tilt of each project card, in the order the projects are listed. */
const PROJECT_TILTS = [-1.2, 0.9, -0.6];

/** "Jan. 2024 - May. 2025" → "2024–2025"; a single year stays as is. */
const yearSpan = (date: string) => [...new Set(date.match(/\d{4}/g) ?? [])].join("–");

export const ProjectsSection = () => (
  <FadeInSection id="projects" style={{ scrollMarginTop: SCROLL_OFFSET }}>
    <div className="crayon-section">
      <Header
        title="Projects"
        variant="section"
        description="A selection of my work, showcasing my skills in software development and design."
        swipeRotate={-2}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
          gap: `clamp(${space.lg}, 3vw, ${space.xlLg})`,
        }}
      >
        {projects.map((project, index) => {
          const hasDemo = project.demoLink && project.demoLink !== "#";
          return (
            <Card
              key={project.title}
              title={project.title}
              date={yearSpan(project.date)}
              description={project.description}
              tech={project.tech}
              src={project.screenshot}
              githubLink={project.githubLink}
              demoHref={hasDemo ? `#${project.demoLink}` : undefined}
              tilt={PROJECT_TILTS[index % PROJECT_TILTS.length]}
            />
          );
        })}
      </div>
    </div>
  </FadeInSection>
);
