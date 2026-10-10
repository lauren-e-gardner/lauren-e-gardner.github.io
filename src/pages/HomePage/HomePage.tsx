"use client";
import { Divider } from "../../components/index.ts";
import AppLayout from "../../layouts/AppLayout.tsx";
import { space } from "../../components/tokens/crayon.ts";
import { HeroSection } from "./HeroSection.tsx";
import { ProjectsSection } from "./ProjectsSection.tsx";
import { SkillsSection } from "./SkillsSection.tsx";
import { ExperienceSection } from "./ExperienceSection.tsx";
import { EducationSection } from "./EducationSection.tsx";
import { ContactSection } from "./ContactSection.tsx";

/** Divider tilt, in page order. The first sits further below the hero. */
const DIVIDERS = {
  hero: { rotate: -0.3, margin: `${space["2xl"]} 0 ${space.lg}` },
  projects: { rotate: 0.3 },
  skills: { rotate: -0.25 },
  experience: { rotate: 0.35 },
  education: { rotate: -0.3 },
};

export default function HomePage() {
  return (
    <AppLayout>
      <main className="crayon-main">
        <HeroSection />
        <Divider {...DIVIDERS.hero} />
        <ProjectsSection />
        <Divider {...DIVIDERS.projects} />
        <SkillsSection />
        <Divider {...DIVIDERS.skills} />
        <ExperienceSection />
        <Divider {...DIVIDERS.experience} />
        <EducationSection />
        <Divider {...DIVIDERS.education} />
        <ContactSection />
      </main>
    </AppLayout>
  );
}
