import { useState, useRef, useEffect } from "react";
import React from "react";
import { Education } from "../types";

interface EducationCardProps {
  isDarkMode: boolean;
}

const education: Education = {
  degree: "Bachelor of Arts Computer Science",
  school: "Princeton University",
  period: "2020 - 2024",
  gpa: "GPA: 3.52/4.00",
  details:
    "Major in Computer Science Focus in Computer Graphics Focus in Visual Arts Thesis project in Computer Graphics",
  logoDark: "/pu_logo.png",
  logoLight: "/pu_logo.png",
};

export const EducationCard: React.FC<EducationCardProps> = ({ isDarkMode }) => {
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
        className={`opacity-0 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100" : ""
        }`}
      >
  
  <article className="grid p-5 rounded-3xl border border-solid grid-cols-[auto_1fr] max-md:p-2.5 max-md:grid-cols-[1fr]">
  <div className="flex justify-center items-center"> {/* Flexbox container for centering */}
    <img
      src={isDarkMode ? education.logoDark : education.logoLight}
      alt={education.school}
      className="object-contain h-[100px] md:h-[150px] lg:h-[292px] max-md:w-full"
    />
  </div>
  <div className="p-5">
    <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-bold">
      {education.degree}
    </h3>
    <p className="mx-0 my-2.5 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
      {education.school}
    </p>
    <p className="mx-0 my-2.5 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
      {education.period}
    </p>
    <p className="mx-0 my-2.5 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
      {education.gpa}
    </p>
    <hr className="mx-0 my-5 h-px bg-black dark:bg-white" />
    <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">
      {education.details}
    </p>
  </div>
</article>

    </div>
  );
};
