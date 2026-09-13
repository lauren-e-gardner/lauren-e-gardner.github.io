"use client";
import { useEffect, useState } from "react";
import { Divider, Header, Card, Container, ProgressBar, Text, Carousel } from "../components"
import AppLayout from "../layouts/AppLayout.tsx";
import { useNavigate } from "react-router-dom";
import { skills, projects, education } from "../configs"

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
      <div className="relative" style={{display: "flex", alignContent: "center", justifyContent: "center", position: "relative"}}>
        <div className="circle aqua"></div>
        <div className="circle blue"></div>
        <div className="circle pink"></div>
        <div className="circle orange"></div>
        <Container className={"pad-top-4xl"}>   
          {/* <ProgressBar /> */}
          <section id="home" style={scrollStyle}>
            <Header 
              type="page"
              title="Code + Creatives" 
              description={(
                <>
                  I'm Lauren Gardner, a software developer with
                  experience in frontend design, 3D graphics, and full-stack development. As a{" "}
                  Princeton University graduate, I approach programming
                  with creativity—whether it's finding innovative solutions or using code
                  to fuel artistic expression. I currently work with:{" "}
                  Python, JavaScript,{" "}
                  TypeScript, and ReactJS
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
                {projects.map((project, index) => (
                  <Card 
                    title={project.title}
                    subTitle={project.role}
                    rightLabel={project.date}
                    description={project.description}      
                    skills={project.skills}  
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
                    onClick={() => handleNavigation(project?.demoLink)}     
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
            <div className="flex align-center justify-center">
                <Carousel 
                items={
                  skills.map((skill) => {
                    return ((
                      <ProgressBar label={skill.name} percentage={skill.progress} icon={skill.icon} showBg={skill?.showBg}/>
                    ))
                  })
                }
              />
            </div>
            {/* <div className="flex-container">
              {skills.map((skill) => {
                return ((
                  <div className="flex-4-item align-center justify-center">
                    <ProgressBar label={skill.name} percentage={skill.progress} icon={skill.icon} showBg={skill?.showBg}/>
                  </div>
                ))
              })}
            </div> */}
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

          <section id="education" className="col align-center justify-center gap-sm" style={scrollStyle}>
            <Header 
              type="section" 
              title="Education"
            />
            {education.map((edu) => {
              return (
                <Card 
                  type="education"
                  title={edu.degree}
                  subTitle={edu.school}
                  rightLabel={edu.year}
                  description={edu.gpa}
                  skills={edu.points}
                  src={edu.logo}
                />
              )
            })}
          </section>

          <Divider />

          <section id="contact" style={scrollStyle}>
            <Header 
              type="section" 
              title="Contact Me"
            />
            {/* <ContactSection /> */}
          </section>
        </Container>
      </div>
    </AppLayout>
  );
}
