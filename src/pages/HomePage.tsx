"use client";
import { Card, CrayonPill, Divider, FadeInSection, Header } from "../components";
import AppLayout from "../layouts/AppLayout.tsx";
import { education, experience, projects } from "../configs";
import { CRAYON_FILTER, crayon, SCROLL_OFFSET, space } from "../components/tokens/crayon";
import { PixelHero } from "./sections/PixelHero.tsx";
import { SkillsSection } from "./sections/Skills/SkillsSection.tsx";
import { ContactSection } from "./sections/ContactSection.tsx";

/** Languages called out under the hero, each in a crayon-outlined pill. */
const CURRENTLY_USING = ["JavaScript", "TypeScript", "ReactJS"];

/** Resting tilt of each project card, in the order the projects are listed. */
const PROJECT_TILTS = [-1.2, 0.9, -0.6];

/** Divider tilt, in page order. The first sits further below the hero. */
const DIVIDERS = {
  hero: { rotate: -0.3, margin: `${space["2xl"]} 0 ${space.lg}` },
  projects: { rotate: 0.3 },
  skills: { rotate: -0.25 },
  experience: { rotate: 0.35 },
  education: { rotate: -0.3 },
};

/** Hero layout, and the handwritten note under the title. */
const HERO = { minHeight: "88vh", minColumn: "420px", titleGap: 14 };
const NOTE = { tilt: "-2deg", indent: 6, textTop: 10, maxWidth: "22em" };

/** "Jan. 2024 - May. 2025" → "2024–2025"; a single year stays as is. */
const yearSpan = (date: string) => [...new Set(date.match(/\d{4}/g) ?? [])].join("–");

export default function HomePage() {
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

        <Divider {...DIVIDERS.hero} />

        <FadeInSection id="projects" style={scrollStyle}>
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

        <Divider {...DIVIDERS.projects} />

        <FadeInSection id="skills" style={scrollStyle}>
          <div className="crayon-section" style={{ gap: space["2xl"] }}>
            <Header title="Skills" variant="section" swipeRotate={1.5} />
            <SkillsSection />
          </div>
        </FadeInSection>

        <Divider {...DIVIDERS.skills} />

        <FadeInSection id="work-experience" style={scrollStyle}>
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

        <Divider {...DIVIDERS.experience} />

        <FadeInSection id="education" style={scrollStyle}>
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

        <Divider {...DIVIDERS.education} />

        <FadeInSection id="contact" style={scrollStyle}>
          <div className="crayon-section" style={{ paddingBottom: space["5xl"], gap: 0 }}>
            <ContactSection />
          </div>
        </FadeInSection>
      </main>
    </AppLayout>
  );
}
