"use client";
import { Card, CrayonBlob, CrayonMark, Divider, FadeInSection, Header } from "../components";
import AppLayout from "../layouts/AppLayout.tsx";
import { useNavigate } from "react-router-dom";
import { education, experience, projects } from "../configs";
import { CRAYON_FILTER, crayon, radius, SCROLL_OFFSET, space } from "../components/tokens/crayon";
import { PixelHero } from "./sections/PixelHero.tsx";
import { SkillsSection } from "./sections/Skills/SkillsSection.tsx";
import { ContactSection } from "./sections/ContactSection.tsx";

/** Languages called out under the hero, each on its own crayon blob. */
const CURRENTLY_USING = [
  { name: "Python", color: crayon.lime },
  { name: "JavaScript", color: crayon.yellow },
  { name: "TypeScript", color: crayon.lavender },
  { name: "ReactJS", color: crayon.orange },
];

/**
 * Per-card crayon treatment, applied in the order the projects are listed:
 * the block behind the screenshot, the title color, and the resting tilt.
 */
const PROJECT_STYLES = [
  { color: crayon.blue, ink: crayon.blue, tilt: -1.2 },
  { color: crayon.yellow, ink: crayon.red, tilt: 0.9 },
  { color: crayon.green, ink: crayon.green, tilt: -0.6 },
];

/** Blob color behind each company name, cycled in the order the jobs are listed. */
const COMPANY_COLORS = [crayon.yellow, crayon.lavender, crayon.lime];

/** Divider bar color and tilt, in page order. */
const DIVIDERS = {
  hero: { color: crayon.yellow, rotate: -0.6 },
  projects: { color: crayon.blue, rotate: 0.5 },
  skills: { color: crayon.magenta, rotate: -0.4 },
  experience: { color: crayon.green, rotate: 0.6 },
  education: { color: crayon.red, rotate: -0.5 },
};

/** Misregistered shadow colors, one per section heading. */
const HEADING_SHADOW = {
  magenta: "rgba(236,30,140,.55)",
  magentaSoft: "rgba(236,30,140,.5)",
  blue: "rgba(35,80,216,.5)",
  yellow: "rgba(255,196,20,.9)",
};

/** Hero artwork: the two background blobs and the underline stroke. */
const HERO = {
  minHeight: "88vh",
  lavenderBlob: { left: "-12%", top: "14%", width: 260, height: 230, opacity: 0.9 },
  limeBlob: { right: "-8%", bottom: "6%", width: 200, height: 200, opacity: 0.8, radius: "45% 55% 60% 40%" },
  underline: { width: "min(340px,70%)", height: 10, tilt: "-1.5deg" },
};

export default function HomePage() {
  const navigate = useNavigate();
  const scrollStyle = { scrollMarginTop: SCROLL_OFFSET };

  return (
    <AppLayout>
      <main className="crayon-main">
        <FadeInSection id="home" style={scrollStyle} placeholderHeight={HERO.minHeight}>
          <div
            style={{
              position: "relative",
              minHeight: HERO.minHeight,
              paddingTop: space["6xl"],
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
              gap: `clamp(${space.xl}, 6vw, ${space["5xl"]})`,
              alignItems: "center",
            }}
          >
            <CrayonBlob color={crayon.lavender} style={HERO.lavenderBlob} />
            <CrayonBlob color={crayon.lime} radius={HERO.limeBlob.radius} style={HERO.limeBlob} />

            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.lg }}>
              <div className="body-b6 caps-wider crayon-label">software developer · princeton ’24</div>
              <Header title="Hi, I’m Lauren Gardner!" variant="page" />
              <div
                aria-hidden
                style={{
                  width: HERO.underline.width,
                  height: HERO.underline.height,
                  background: crayon.blue,
                  borderRadius: radius.sm,
                  transform: `rotate(${HERO.underline.tilt})`,
                  filter: CRAYON_FILTER,
                }}
              />
              <p className="body-b2" style={{ maxWidth: "34em" }}>
                I’m a software developer with experience in frontend design, 3D graphics, and full-stack
                development. As a Princeton University graduate, I approach programming with creativity —
                whether it’s finding innovative solutions or using code to fuel artistic expression.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: space.sm, alignItems: "center" }}>
                {CURRENTLY_USING.map((item) => (
                  <CrayonMark
                    key={item.name}
                    className="bodyMedium-b6"
                    color={item.color}
                    style={{ padding: `${space.xs} ${space.smLg}` }}
                  >
                    {item.name}
                  </CrayonMark>
                ))}
              </div>
            </div>

            <PixelHero />
          </div>
        </FadeInSection>

        <Divider {...DIVIDERS.hero} />

        <FadeInSection id="projects" style={scrollStyle}>
          <div className="crayon-section">
            <Header
              title="Projects"
              variant="section"
              description="A selection of my work, showcasing my skills in software development and design."
              highlight={crayon.yellow}
              shadow={HEADING_SHADOW.magenta}
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
                const treatment = PROJECT_STYLES[index % PROJECT_STYLES.length];
                const hasDemo = project.demoLink && project.demoLink !== "#";
                return (
                  <Card
                    key={project.title}
                    title={project.title}
                    role={project.role}
                    date={project.date}
                    description={project.description}
                    skills={project.skills}
                    tech={project.tech}
                    src={project.screenshot}
                    githubLink={project.githubLink}
                    onDemo={hasDemo ? () => navigate(project.demoLink as string) : undefined}
                    {...treatment}
                  />
                );
              })}
            </div>
          </div>
        </FadeInSection>

        <Divider {...DIVIDERS.projects} />

        <FadeInSection id="skills" style={scrollStyle}>
          <div className="crayon-section" style={{ gap: space["2xl"] }}>
            <Header title="Skills" variant="section" highlight={crayon.lime} shadow={HEADING_SHADOW.blue} swipeRotate={1.5} />
            <SkillsSection />
          </div>
        </FadeInSection>

        <Divider {...DIVIDERS.skills} />

        <FadeInSection id="work-experience" style={scrollStyle}>
          <div className="crayon-section">
            <Header
              title="Experience"
              variant="section"
              highlight={crayon.orange}
              shadow={HEADING_SHADOW.magentaSoft}
              swipeRotate={-1}
              swipeOpacity={0.85}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: space.xlLg }}>
              {experience.map((job, index) => (
                <Card
                  key={job.company}
                  variant="experience"
                  title={job.title}
                  org={job.company}
                  date={job.date}
                  subtitle={job.location}
                  points={job.points}
                  color={COMPANY_COLORS[index % COMPANY_COLORS.length]}
                />
              ))}
            </div>
          </div>
        </FadeInSection>

        <Divider {...DIVIDERS.experience} />

        <FadeInSection id="education" style={scrollStyle}>
          <div className="crayon-section">
            <Header title="Education" variant="section" highlight={crayon.lavender} shadow={HEADING_SHADOW.yellow} swipeRotate={1.5} />
            {education.map((edu) => (
              <Card
                key={edu.school}
                variant="education"
                title={edu.school}
                subtitle={edu.degree}
                role={edu.year}
                date={edu.gpa}
                points={edu.points}
                color={crayon.orange}
                ink={crayon.red}
                tilt={-0.4}
              />
            ))}
          </div>
        </FadeInSection>

        <Divider {...DIVIDERS.education} />

        <FadeInSection id="contact" style={scrollStyle}>
          <div className="crayon-section" style={{ paddingBottom: space["5xl"] }}>
            <ContactSection />
          </div>
        </FadeInSection>
      </main>
    </AppLayout>
  );
}
