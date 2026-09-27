import { skills } from "../../../configs";
import { crayon, space } from "../../../components/tokens/crayon";
import { useDeviceType } from "../../../hooks/useDeviceType";
import { SkillBar } from "./SkillBar";

/** One crayon color per skill, per the handoff. Falls back to red. */
const SKILL_COLORS: Record<string, string> = {
  React: crayon.red,
  "React-Native": crayon.orange,
  TypeScript: crayon.blue,
  JavaScript: crayon.yellow,
  Python: crayon.green,
  ThreeJS: crayon.magenta,
  Java: crayon.maroon,
};

export const SkillsSection = () => {
  // Each row is two lines tall on mobile, so they need less air between them.
  const isMobile = useDeviceType() === "mobile";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? space.mdLg : space.lg }}>
      {skills.map((skill) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          icon={skill.icon}
          percentage={skill.progress}
          color={SKILL_COLORS[skill.name] ?? crayon.red}
        />
      ))}
    </div>
  );
};

export default SkillsSection;
