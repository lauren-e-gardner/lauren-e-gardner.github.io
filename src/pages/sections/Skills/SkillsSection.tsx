import { skills } from "../../../configs";
import { crayon, space } from "../../../components/tokens/crayon";
import { CrayonFill, HAND_RADIUS, CrayonBlob, BLOB_RADIUS } from "../../../components/atoms/Crayon";
import { useDeviceType } from "../../../hooks/useDeviceType";
import { SkillBar } from "./SkillBar";

const NAVY_PANEL = { inset: "4% -3% -4% 6%", tilt: "2.5deg" } as const;
const LANTERN_BLOB = { left: "-16%", top: "-12%", width: "60%", aspectRatio: "1.2", opacity: 0.85 } as const;
const MINT_BLOB = { left: "5%", top: "50%", width: "40%", aspectRatio: "1.2", opacity: 0.85 } as const;

/** Skill rows on a deep navy crayon panel. */
export const SkillsSection = () => {
  // Each row is two lines tall on mobile, so they need less air between them.
  const isMobile = useDeviceType() === "mobile";

  return (
    <div style={{ position: "relative" }}>
      <CrayonBlob
          color={crayon.lantern}
          radius={BLOB_RADIUS.organic}
          style={{
            left: LANTERN_BLOB.left,
            top: LANTERN_BLOB.top,
            width: LANTERN_BLOB.width,
            aspectRatio: LANTERN_BLOB.aspectRatio,
            opacity: LANTERN_BLOB.opacity,
          }}
        />
        <CrayonBlob
          color={crayon.mint}
          radius={BLOB_RADIUS.organic}
          style={{
            left: MINT_BLOB.left,
            top: MINT_BLOB.top,
            width: MINT_BLOB.width,
            aspectRatio: MINT_BLOB.aspectRatio,
            opacity: MINT_BLOB.opacity,
          }}
        />
        <CrayonFill color={crayon.navy} radius={HAND_RADIUS.panel} style={{ inset: NAVY_PANEL.inset, transform: `rotate(${NAVY_PANEL.tilt})` }}/>
      <div
      className="br-sm"
        style={{
          position: "relative",
          padding: `clamp(${space.lg}, 4vw, ${space["3xl"]})`,
          color: crayon.navyDeep,
          background: crayon.paperRaised
        }}
      >
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: isMobile ? space.mdLg : space.lg }}>
          {skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} icon={skill.icon} percentage={skill.progress} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsSection;
