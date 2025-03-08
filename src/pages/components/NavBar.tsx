export const NavBar = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full shadow-md z-50 flex gap-10 px-20 sm:px-10 md:px-20 lg:px-30 xl:px-60 py-5 text-lg justify-between items-center max-sm:flex-col max-sm:items-center backdrop-blur-md">
      <button onClick={() => handleScroll("projects")} className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300">
        projects
      </button>
      <button onClick={() => handleScroll("skills")} className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300">
        skills
      </button>
      <button onClick={() => handleScroll("work-experience")} className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300">
        work experience
      </button>
      <button onClick={() => handleScroll("education")} className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300">
        education
      </button>
      <button onClick={() => handleScroll("contact")} className="cursor-pointer hover:text-[#F04F78] transition-colors duration-300">
        contact me
      </button>
    </nav>
  );
};
