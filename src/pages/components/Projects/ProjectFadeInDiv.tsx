import { useRef, useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Project } from "../types";

type ProjectFadeInDivProps = {
  children: Project;
};

const ProjectFadeInDiv: React.FC<ProjectFadeInDivProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When the element comes into view, trigger fade-in
          setIsVisible(true);
        } else {
          // When the element exits view, reset the fade effect
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-10 transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : ""
      }`}
    >

        <ProjectCard project={children} />
    </div>
  );
};

export default ProjectFadeInDiv;
