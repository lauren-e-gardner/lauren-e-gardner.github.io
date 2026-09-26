"use client";
import { Card, CrayonBlob, CrayonMark, Divider, FadeInSection, Header } from "../components";
import AppLayout from "../layouts/AppLayout.tsx";
import { useNavigate } from "react-router-dom";
import { projects } from "../configs";
import { crayon } from "../components/tokens/crayon";
import { PixelHero } from "./components/PixelHero.tsx";
import { SkillsSection } from "./components/Skills/SkillsSection.tsx";
import { ExperienceSection } from "./components/Experience/ExperienceSection.tsx";
import { EducationCard } from "./components/Education/EducationCard.tsx";
import { ContactSection } from "./components/ContactSection.tsx";

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

export default function HomePage() {
  const navigate = useNavigate();
  const scrollStyle = { scrollMarginTop: 70 };

  return (
    <AppLayout>
      <main className="crayon-main">
        <FadeInSection id="home" style={scrollStyle} placeholderHeight="88vh">
          <div
            style={{
              position: "relative",
              minHeight: "88vh",
              paddingTop: 120,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
              gap: "clamp(32px,6vw,80px)",
              alignItems: "center",
            }}
          >
            <CrayonBlob color={crayon.lavender} style={{ left: "-12%", top: "14%", width: 260, height: 230, opacity: 0.9 }} />
            <CrayonBlob
              color={crayon.lime}
              radius="45% 55% 60% 40%"
              style={{ right: "-8%", bottom: "6%", width: 200, height: 200, opacity: 0.8 }}
            />

            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="crayon-mono">software developer · princeton ’24</div>
              <h1
                className="crayon-hand"
                style={{
                  fontSize: "clamp(56px,8vw,112px)",
                  lineHeight: 0.92,
                  color: crayon.red,
                  textShadow: `var(--mis) var(--mis) 0 ${crayon.yellow}, calc(var(--mis) * -0.8) calc(var(--mis) * 0.3) 0 rgba(35,80,216,.55)`,
                  textWrap: "balance",
                }}
              >
                Hi, I’m Lauren Gardner!
              </h1>
              <div
                aria-hidden
                style={{
                  width: "min(340px,70%)",
                  height: 10,
                  background: crayon.blue,
                  borderRadius: 6,
                  transform: "rotate(-1.5deg)",
                  filter: "url(#crayon)",
                }}
              />
              <p style={{ fontSize: "clamp(17px,1.6vw,20px)", lineHeight: 1.6, maxWidth: "34em" }}>
                I’m a software developer with experience in frontend design, 3D graphics, and full-stack
                development. As a Princeton University graduate, I approach programming with creativity —
                whether it’s finding innovative solutions or using code to fuel artistic expression.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <span className="crayon-hand" style={{ fontSize: 22, color: crayon.maroon }}>
                  currently working with
                </span>
                {CURRENTLY_USING.map((item) => (
                  <CrayonMark
                    key={item.name}
                    color={item.color}
                    style={{ padding: "4px 12px", fontWeight: 700, fontSize: 15 }}
                  >
                    {item.name}
                  </CrayonMark>
                ))}
              </div>
            </div>

            <PixelHero />
          </div>
        </FadeInSection>

        <Divider color={crayon.yellow} rotate={-0.6} />

        <FadeInSection id="projects" style={scrollStyle}>
          <div className="crayon-section">
            <Header
              title="Projects"
              description="A selection of my work, showcasing my skills in software development and design."
              highlight={crayon.yellow}
              shadow="rgba(236,30,140,.55)"
              swipeRotate={-2}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
                gap: "clamp(28px,3vw,40px)",
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

        <Divider color={crayon.blue} rotate={0.5} />

        <FadeInSection id="skills" style={scrollStyle}>
          <div className="crayon-section" style={{ gap: 44 }}>
            <Header title="Skills" highlight={crayon.lime} shadow="rgba(35,80,216,.5)" swipeRotate={1.5} />
            <SkillsSection />
          </div>
        </FadeInSection>

        <Divider color={crayon.magenta} rotate={-0.4} />

        <FadeInSection id="work-experience" style={scrollStyle}>
          <div className="crayon-section">
            <Header
              title="Experience"
              highlight={crayon.orange}
              shadow="rgba(236,30,140,.5)"
              swipeRotate={-1}
              swipeOpacity={0.85}
            />
            <ExperienceSection />
          </div>
        </FadeInSection>

        <Divider color={crayon.green} rotate={0.6} />

        <FadeInSection id="education" style={scrollStyle}>
          <div className="crayon-section">
            <Header title="Education" highlight={crayon.lavender} shadow="rgba(255,196,20,.9)" swipeRotate={1.5} />
            <EducationCard />
          </div>
        </FadeInSection>

        <Divider color={crayon.red} rotate={-0.5} />

        <FadeInSection id="contact" style={scrollStyle}>
          <div className="crayon-section" style={{ padding: "72px 0 96px" }}>
            <ContactSection />
          </div>
        </FadeInSection>
      </main>
    </AppLayout>
  );
}
