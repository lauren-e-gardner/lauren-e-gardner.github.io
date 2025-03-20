"use client";
import { useEffect, useState } from "react";
import { Hero } from "./components/Hero.tsx";
import { SkillsSection } from "./components/Skills/SkillsSection.tsx";
import ExperienceSection from "./components/Experience/ExperienceSection.tsx";
import { EducationCard } from "./components/Education/EducationCard.tsx";
import { ContactSection } from "./components/ContactSection.tsx";
import { projects } from "./components/Projects/Projects.ts";
import ProjectFadeInDiv from "./components/Projects/ProjectFadeInDiv.tsx";
import AppLayout from "../layouts/AppLayout.tsx";

export default function HomePage() {
  // Declare state for prefersDarkMode
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    // Check the browser's color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateDarkMode = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };

    // Set the initial dark mode preference
    setPrefersDarkMode(mediaQuery.matches);

    // Listen for changes to the color scheme in the browser (if the user manually changes it)
    mediaQuery.addEventListener('change', updateDarkMode);

    // Cleanup the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', updateDarkMode);
    };
  }, []);

  useEffect(() => {
    // Update the class on the document element based on prefersDarkMode state
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [prefersDarkMode]);

  return (
    <AppLayout>
      <div className="relative overflow-hidden">
        {/* Main Content */}
        <main className="relative z-10 py-20 px-20 sm:px-10 md:px-20 lg:px-30 xl:px-60 mx-auto my-0 max-w-[2000px] max-md:p-2.5">

          {/* Circles */}
          <div className="circle aqua"></div>
          <div className="circle blue"></div>
          <div className="circle pink"></div>
          <div className="circle orange"></div>
          
          <Hero />

          {/* Sections */}
          <section id="projects" className="px-0 py-20 border-t border-solid">
            <h2 className="mb-20 text-5xl 2xl:text-6xl text-center">Projects</h2>
            <div className="mx-auto my-0 max-w-[2000px] max-md:p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {projects.map((project, index) => (
                <ProjectFadeInDiv key={index} children={project}/>
              ))}
            </div>
          </section>

          <section id="skills" className="px-0 py-20 border-t border-solid">
            <h2 className="mb-20 text-5xl 2xl:text-6xl text-center">Skills</h2>
            <SkillsSection />
          </section>

          <section id="work-experience" className="px-0 py-20 border-t border-solid">
            <h2 className="mb-20 text-5xl 2xl:text-6xl text-center">Experience</h2>
            <ExperienceSection/>
          </section>

          <section id="education" className="px-0 py-20 border-t border-solid">
            <h2 className="mb-20 text-5xl 2xl:text-6xl text-center">Education</h2>
            <EducationCard isDarkMode={prefersDarkMode} />
          </section>

          <section id="contact" className="px-0 py-20 border-t border-solid">
            <h2 className="mb-20 text-5xl 2xl:text-6xl text-center">Contact Me</h2>
            <ContactSection />
          </section>
        </main>
      </div>
    </AppLayout>
  );
}
