import { useState, useRef, useEffect } from "react";

export const ContactSection = () => {
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
      <section className="grid gap-10 p-5 grid-cols-[auto_1fr] max-md:grid-cols-[1fr]">
        <img
          src="/LinkedIn1.png"
          alt="Profile"
          className="object-cover rounded-3xl h-[360px] w-[359px] max-sm:w-full max-sm:h-auto"
        />
        <div className="flex flex-col gap-10">
        <div className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">
  <strong>Email</strong>
  <p>
    <a href="mailto:laurenator1784@gmail.com" className="text-blue-500 hover:underline">
      laurenator1784@gmail.com
    </a>
  </p>
</div>

<div className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">
  <strong>LinkedIn</strong>
  <p>
    <a 
      href="https://www.linkedin.com/in/lauren-e-gardner02/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:underline"
    >
      https://www.linkedin.com/in/lauren-e-gardner02/
    </a>
  </p>
</div>

<div className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">
  <strong>GitHub</strong>
  <p>
    <a 
      href="https://github.com/lauren-e-gardner" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:underline"
    >
      https://github.com/lauren-e-gardner
    </a>
  </p>
</div>

        </div>
      </section>
      </div>
    );
  };
  