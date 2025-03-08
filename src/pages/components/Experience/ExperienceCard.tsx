import { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <article className="p-5 rounded-3xl border border-black border-solid max-md:p-2.5">
      <div className="px-5 py-2.5 -mt-10 text-lg text-white bg-zinc-900 rounded-[10px_10px_0_0] w-fit">
        {experience.date}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{experience.title}</h3>
        <p className="mx-0 my-2.5 text-lg">{experience.company}</p>
        <hr className="mx-0 my-5 h-px bg-black" />
        <p className="text-lg leading-relaxed">{experience.description}</p>
      </div>
    </article>
  );
};
