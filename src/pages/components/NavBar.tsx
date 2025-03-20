import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // import hamburger icon and close icon

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state for toggling menu

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    setIsMenuOpen(!isMenuOpen)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <nav className="fixed top-0 w-full shadow-md z-50 flex gap-1 md:gap-5 lg:gap-10 px-5 sm:px-10 md:px-20 lg:px-30 xl:px-60 py-5 text-lg justify-between items-center backdrop-blur-md">
      {/* Hamburger icon (visible on small screens) */}
      <div className="md:hidden relative z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu
          className="text-2xl z-50"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Show either hamburger or close icon */}
        </button>
      </div>

      {/* Regular desktop menu */}
      <button
        onClick={() => handleScroll("projects")}
        className="hidden md:flex text-[10px] sm:text-xs md:text-sm xl:text-lg 2xl:text-2xl cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
      >
        projects
      </button>
      <button
        onClick={() => handleScroll("skills")}
        className="hidden md:flex text-[10px] sm:text-xs md:text-sm xl:text-lg 2xl:text-2xl cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
      >
        skills
      </button>
      <button
        onClick={() => handleScroll("work-experience")}
        className="hidden md:flex text-[10px] sm:text-xs md:text-sm 2xl:text-2xl xl:text-lg cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
      >
        work experience
      </button>
      <button
        onClick={() => handleScroll("education")}
        className="hidden md:flex text-[10px] sm:text-xs md:text-sm xl:text-lg 2xl:text-2xl cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
      >
        education
      </button>
      <button
        onClick={() => handleScroll("contact")}
        className="hidden md:flex text-[10px] sm:text-xs md:text-sm xl:text-lg 2xl:text-2xl cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
      >
        contact me
      </button>

      {/* Mobile Navbar (visible on small screens) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } navbar absolute top-0 left-0 right-0 shadow-md z-40 flex flex-col items-center gap-5 py-5 md:hidden`}
      >
        <button
          onClick={() => handleScroll("projects")}
          className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("skills")}
          className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
        >
          Skills
        </button>
        <button
          onClick={() => handleScroll("work-experience")}
          className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
        >
          Work Experience
        </button>
        <button
          onClick={() => handleScroll("education")}
          className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
        >
          Education
        </button>
        <button
          onClick={() => handleScroll("contact")}
          className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300"
        >
          Contact Me
        </button>
      </div>
    </nav>
  );
};
