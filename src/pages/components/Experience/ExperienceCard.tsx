import { crayon, radius, space } from "../../../components/tokens/crayon";
import { CrayonBorder, CrayonBulletList, CrayonMark } from "../../../components/atoms/Crayon";
import type { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
  /** Crayon blob behind the company name. */
  color: string;
}

const BLOB_OPACITY = 0.9;

/** A job: date + company on the left, the role card spanning the rest. */
export const ExperienceCard = ({ experience, color }: ExperienceCardProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
        gap: `${space.smLg} ${space.xlLg}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: space.xs }}>
        <span className="body-b7 caps-wide crayon-label">{experience.date}</span>
        <CrayonMark
          className="headline-h7"
          color={color}
          radius={radius["2xl"]}
          style={{ alignSelf: "flex-start", padding: `${space["3xs"]} ${space.xs}` }}
          markStyle={{ opacity: BLOB_OPACITY }}
        >
          {experience.company}
        </CrayonMark>
        {experience.location && (
          <span className="body-b6" style={{ color: crayon.mutedInk }}>{experience.location}</span>
        )}
      </div>

      <div
        style={{
          gridColumn: "span 2",
          minWidth: 0,
          position: "relative",
          padding: `${space.lg} ${space.lg}`,
          background: crayon.paper,
        }}
      >
        <CrayonBorder />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.sm }}>
          <h3 className="bodyMedium-b1">{experience.title}</h3>
          <CrayonBulletList points={experience.points} textClass="body-b6" />
        </div>
      </div>
    </div>
  );
};
