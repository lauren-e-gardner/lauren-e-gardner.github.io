import { CRAYON_FILTER, crayon } from "../../../components/tokens/crayon";

interface SkillBarProps {
  name: string;
  icon: string;
  percentage: number;
  color: string;
}

/**
 * One full-width skill row: icon on a washed crayon blob, name in MyHand, a
 * hatched crayon fill inside a dashed track, and the percentage in mono.
 */
export const SkillBar = ({ name, icon, percentage, color }: SkillBarProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px minmax(110px,170px) minmax(0,1fr) 48px",
        gap: 16,
        alignItems: "center",
      }}
    >
      <span style={{ position: "relative", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: color,
            opacity: 0.35,
            borderRadius: "46% 54% 50% 50% / 55% 45% 55% 45%",
            filter: CRAYON_FILTER,
          }}
        />
        <img src={icon} alt="" style={{ position: "relative", width: 28, height: 28, objectFit: "contain" }} />
      </span>

      <span className="crayon-hand" style={{ fontSize: 28, lineHeight: 1 }}>{name}</span>

      <div style={{ position: "relative", height: 28 }}>
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, border: `2px dashed ${crayon.ink}`, borderRadius: 12, opacity: 0.45 }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 2,
            top: 2,
            bottom: 2,
            width: `calc(${percentage}% - 4px)`,
            background: `repeating-linear-gradient(-58deg, ${color} 0 5px, transparent 5px 7px), ${color}80`,
            borderRadius: "10px 14px 9px 12px",
            filter: CRAYON_FILTER,
          }}
        />
      </div>

      <span style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 13, textAlign: "right" }}>
        {percentage}%
      </span>
    </div>
  );
};
