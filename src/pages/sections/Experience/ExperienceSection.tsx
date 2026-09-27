import { crayon, space } from "../../../components/tokens/crayon";
import { experience } from "./Experience";
import { ExperienceCard } from "./ExperienceCard";

/** Blob color per job, cycled in the order the jobs are listed. */
const COMPANY_COLORS = [crayon.yellow, crayon.lavender, crayon.lime];

export const ExperienceSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: space.xlLg }}>
    {experience.map((job, index) => (
      <ExperienceCard key={job.company} experience={job} color={COMPANY_COLORS[index % COMPANY_COLORS.length]} />
    ))}
  </div>
);

export default ExperienceSection;
