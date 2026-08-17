"use client";
import { useEffect, useState } from "react";
import { Divider, Header, Card } from "../components"
// import { SkillsSection } from "./components/Skills/SkillsSection.tsx";
// import ExperienceSection from "./components/Experience/ExperienceSection.tsx";
// import { EducationCard } from "./components/Education/EducationCard.tsx";
// import { ContactSection } from "./components/ContactSection.tsx";
import { projects } from "./components/Projects/Projects.ts";
import AppLayout from "../layouts/AppLayout.tsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

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

  const scrollStyle = {scrollMarginTop: "70px"}

  return (
    <AppLayout>
      <div className="relative">
        {/* Main Content */}
        <main className="relative z-10 py-20 px-20 sm:px-10 md:px-20 lg:px-30 xl:px-60 mx-auto my-0 max-w-[2000px] max-md:p-2.5">

          {/* Circles */}
          <div className="circle aqua"></div>
          <div className="circle blue"></div>
          <div className="circle pink"></div>
          <div className="circle orange"></div>
          
          <section id="home" style={scrollStyle}>
            <Header 
              type="page"
              title="Code + Creatives" 
              description={(
                <>
                  I'm <strong>Lauren Gardner</strong>, a software developer with
                  experience in frontend design, 3D graphics, and full-stack development. As a{" "}
                  <strong>Princeton University</strong> graduate, I approach programming
                  with creativity—whether it's finding innovative solutions or using code
                  to fuel artistic expression. I currently work with:{" "}
                  <strong>Python</strong>, <strong>JavaScript</strong>,{" "}
                  <strong>TypeScript</strong>, and <strong>ReactJS</strong>
                </>
              )} 
            />
          </section>

          <Divider />

          {/* Sections */}
          <section id="projects" style={scrollStyle}>
            <div className="gap-md" style={{display: "flex", flexDirection: "column"}}>
              <Header 
                type="section" 
                title="Projects"
                description="A selection of my work, showcasing my skills in software development and design."
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                {projects.map((project, index) => (
                  <Card 
                    title={project.title}
                    subTitle={project.role}
                    rightLabel={project.date}
                    description={project.description}        
                    frameworks={project.techIcons}
                    src={project.screenshot}   
                    demoButton={{
                      onClick: () => handleNavigation(project?.demoLink),
                      children: "Demo",
                    }} 
                    codeButton={{
                      onClick: () => handleNavigation(project?.codeLink),
                      children: "GitHub",
                      icon: {
                        name: "github",
                        size: 20,}
                    }}        
                  />
                ))}
              </div>
            </div>
          </section>

          <Divider />

          <section id="skills" style={scrollStyle}>
            <Header 
              type="section" 
              title="Skills"
            />
            {/* <SkillsSection /> */}
          </section>

          <Divider />

          <section id="work-experience" style={scrollStyle}>
            <Header 
              type="section" 
              title="Experience"
            />
            {/* <ExperienceSection/> */}
          </section>

          <Divider />

          <section id="education" style={scrollStyle}>
            <Header 
              type="section" 
              title="Education"
            />
            {/* <EducationCard isDarkMode={prefersDarkMode} /> */}
          </section>

          <Divider />

          <section id="contact" style={scrollStyle}>
            <Header 
              type="section" 
              title="Contact Me"
            />
            {/* <ContactSection /> */}
          </section>
        </main>
      </div>
    </AppLayout>
  );
}
