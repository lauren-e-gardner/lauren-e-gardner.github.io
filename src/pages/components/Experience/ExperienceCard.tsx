import { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <article className="p-5 mb-10 rounded-3xl border border-solid max-md:p-2.5">
      <div className="p-5">
        <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold">{experience.title}</h3>
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
