"use client";
import { useEffect } from "react";
import { Hero } from "./components/Hero.tsx";
import { SkillsSection } from "./components/Skills/SkillsSection.tsx";
import ExperienceSection from "./components/Experience/ExperienceSection.tsx";
import { EducationCard } from "./components/Education/EducationCard.tsx";
import { ContactSection } from "./components/ContactSection.tsx";
import type { Education } from "./components/types.ts";
import { projects } from "./components/Projects/Projects.ts";
import ProjectFadeInDiv from "./components/Projects/ProjectFadeInDiv.tsx";
import AppLayout from "../layouts/AppLayout.tsx";


const education: Education = {
  degree: "Bachelor of Arts Computer Science",
  school: "Princeton University",
  period: "2020 - 2024",
  gpa: "GPA: 3.52/4.00",
  details:
    "Major in Computer Science Focus in Computer Graphics Focus in Visual Arts Thesis project in Computer Graphics",
  logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/6a6df7d0e8553f914b2f27d3a8fe719d4c900a2e",
};

export default function HomePage() {
  useEffect(() => {
    // Check the browser's color scheme preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Add or remove the 'dark' class based on the browser's color scheme
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for changes to the color scheme in the browser (if the user manually changes it)
    const mediaQueryListener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Add the event listener for color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', mediaQueryListener);

    // Cleanup the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', mediaQueryListener);
    };
  }, []);

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
          <h2 className="mb-20 text-5xl text-center max-sm:text-4xl">Projects</h2>
          <div className="mx-auto my-0 max-w-[2000px] max-md:p-2.5 grid grid-cols-1 md:grid-cols-2 gap-15">
            {projects.map((project, index) => (
              <ProjectFadeInDiv key={index} children={project}/>

            ))}
          </div>
        </section>


          <section id="skills" className="px-0 py-20 border-t border-solid">
            <h2 className="mb-20 text-5xl text-center max-sm:text-4xl">Skills</h2>
            <SkillsSection />
          </section>

          <section id="work-experience" className="px-0 py-20 border-t border-solid border-t-black">
            <h2 className="mb-20 text-5xl text-center max-sm:text-4xl">Experience</h2>
            <ExperienceSection/>
          </section>

          <section id="education" className="px-0 py-20 border-t border-solid border-t-black">
            <h2 className="mb-20 text-5xl text-center max-sm:text-4xl">Education</h2>
            <EducationCard education={education} />
          </section>

          <section id="contact" className="px-0 py-20 border-t border-solid border-t-black">
            <h2 className="mb-20 text-5xl text-center max-sm:text-4xl">Contact Me</h2>
            <ContactSection />
          </section>
        </main>
      </div>
    </AppLayout>
  );
}