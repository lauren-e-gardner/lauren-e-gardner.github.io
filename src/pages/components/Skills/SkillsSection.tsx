import { useRef, useEffect, useState } from "react";
import { SkillBar } from "./SkillBar.tsx";
import { language_skills, framework_skills } from "./Skills.ts";


export const SkillsSection = () => {
  const [showFrameworks, setShowFrameworks] = useState(false);
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
      <div className="ml-15 flex gap-2">
        {/* Languages Button */}
        <button
          onClick={() => setShowFrameworks(false)}
          className={`h-12 px-10 py-2.5 text-lg xl:text-xl 2xl:text-2xl w-fit transition-all duration-300 hover:text-[#F04F78] rounded-t-lg border-t border-l border-r
            ${
              showFrameworks
                ? "text-[#1C1E25] dark:text-[#E3E1DA]"
                : "bg-[#1C1E25] text-[#E3E1DA] dark:bg-[#E3E1DA] dark:text-[#1C1E25]"
            }`}
        >
          Languages
        </button>

        {/* Frameworks Button */}
        <button
          onClick={() => setShowFrameworks(true)}
          className={`h-12 px-10 py-2.5 text-lg xl:text-xl 2xl:text-2xl w-fit transition-all duration-300 hover:text-[#F04F78] rounded-t-lg border-t border-l border-r
            ${
              showFrameworks
                ? "bg-[#1C1E25] text-[#E3E1DA] dark:bg-[#E3E1DA] dark:text-[#1C1E25]"
                : "text-[#1C1E25] dark:text-[#E3E1DA]"
            }`}
        >
          Frameworks
        </button>
      </div>

      {/* Skills Section with Flexbox */}
      <section className="p-5 rounded-xl border flex flex-col">
        {/* The container that holds the skill bars */}
        <div
          ref={ref}
          className={`opacity-0 transition-all duration-700 ease-in-out ${
            isVisible ? "opacity-100" : ""
          }`}
        >
          <div
            key={showFrameworks ? "frameworks" : "languages"} // Forces re-render for animation
            className="m-10 flex-1 flex flex-col gap-10 max-md:p-2.5 opacity-0 animate-fade-in"
          >
                  {(showFrameworks ? framework_skills : language_skills).map((skill, index) => (
              <SkillBar
                key={index}
                name={skill.name}
                icon={skill.icon}
                percentage={skill.percentage}
              />
            ))}
          </div>  
        </div>
      </section>
    </>
  );
};
