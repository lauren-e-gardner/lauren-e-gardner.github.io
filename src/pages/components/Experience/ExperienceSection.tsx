import { useState, useRef, useEffect } from "react";
import { experience } from "./Experience";
import { ExperienceCard } from "./ExperienceCard";

const ExperienceSection = () => {
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
    <>
      <div
        ref={ref}
        className={`opacity-0 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100" : ""
        }`}
      >
        <div className="px-0 sm:px-5 md:px-10 lg:px-20 xl:px-40 mx-auto my-0 max-w-[2000px] max-md:p-2.5 flex flex-col gap-10">
          {experience.map((e, index) => (
              <ExperienceCard key={index} experience={e} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ExperienceSection;
