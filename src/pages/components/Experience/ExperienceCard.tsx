import { crayon } from "../../../components/tokens/crayon";
import { CrayonBorder, CrayonMark } from "../../../components/atoms/Crayon";
import type { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
  /** Crayon blob behind the company name. */
  color: string;
}

/** A job: date + company on the left, the role card spanning the rest. */
export const ExperienceCard = ({ experience, color }: ExperienceCardProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
        gap: "12px 40px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="crayon-meta" style={{ fontSize: 13 }}>{experience.date}</span>
        <CrayonMark
          className="crayon-hand"
          color={color}
          radius="14px"
          style={{ alignSelf: "flex-start", fontSize: 30, lineHeight: 1.05, padding: "2px 6px" }}
          markStyle={{ opacity: 0.9 }}
        >
          {experience.company}
        </CrayonMark>
      </div>

      <div
        style={{
          gridColumn: "span 2",
          minWidth: 0,
          position: "relative",
          padding: "22px 24px",
          background: crayon.paper,
        }}
      >
        <CrayonBorder />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700 }}>{experience.title}</h3>
          <p style={{ fontSize: 15.5, lineHeight: 1.6 }}>{experience.description}</p>
        </div>
      </div>
    </div>
  );
};
