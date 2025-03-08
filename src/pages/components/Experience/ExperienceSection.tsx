import { experience } from "./Experience";
import { ExperienceCard } from "./ExperienceCard";

const ExperienceSection = () => {
  return (
    <>
      <div className="px-0 sm:px-5 md:px-10 lg:px-20 xl:px-40 mx-auto my-0 max-w-[2000px] max-md:p-2.5 flex flex-col gap-10">
        {experience.map((e, index) => (
            <ExperienceCard key={index} experience={e} />
          ))}
      </div>
    </>
  );
};

export default ExperienceSection;
