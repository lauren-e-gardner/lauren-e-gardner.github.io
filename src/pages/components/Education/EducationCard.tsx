import { Education } from "../types";

interface EducationCardProps {
  education: Education;
}

export const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <article className="grid gap-10 p-5 rounded-3xl border border-black border-solid grid-cols-[auto_1fr] max-md:p-2.5 max-md:grid-cols-[1fr]">
      <img
        src={education.logo}
        alt={education.school}
        className="object-contain h-[292px] w-[519px] max-md:w-full max-md:h-auto"
      />
      <div className="p-5">
        <h3 className="text-lg font-bold">{education.degree}</h3>
        <p className="mx-0 my-2.5 text-lg">{education.school}</p>
        <p className="mx-0 my-2.5 text-lg">{education.period}</p>
        <p className="mx-0 my-2.5 text-lg">{education.gpa}</p>
        <hr className="mx-0 my-5 h-px bg-black" />
        <p className="text-lg leading-relaxed">{education.details}</p>
      </div>
    </article>
  );
};
