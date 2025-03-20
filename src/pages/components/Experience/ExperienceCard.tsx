import { Experience } from "../types";
import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();
  const handleNavigation = (link: string) => {
    navigate(link);
  };
  const isLinkDisabled = (link: string) => link === '#';

  return (
    <article className="p-5 mb-10 rounded-3xl border border-solid max-md:p-2.5">
      <div className="p-5">
    
      <div className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-2xl flex w-full gap-5 ">
      <h3 className="w-3/4 text-lg xl:text-xl 2xl:text-3xl font-bold">{experience.title}</h3>

        {experience.demo && (
          <button
            onClick={() => experience.demo && handleNavigation(experience.demo)}
            className={`w-1/4 flex justify-center gap-2.5 px-8 py-2.5 transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer ${isLinkDisabled(experience.demo) ? 'bg-gray-400 opacity-20 text-black hover:text-black' : ''}`}
            disabled={isLinkDisabled(experience.demo)}
          >
            Demo
          </button>
        )}
      </div>
        <div className="flex justify-between items-center">
          <p className="mx-0 my-2.5 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{experience.company}</p>
          <span className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{experience.date}</span>
        </div>
        <hr className="mx-0 my-5 h-px bg-black" />
        <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">{experience.description}</p>
      </div>
    </article>


  );
};
