import { CRAYON_FILTER, crayon, radius, space } from "../../../components/tokens/crayon";
import { BORDER } from "../../../components/atoms/Crayon";

/** Row geometry: icon well, name column, bar, percentage. */
const ROW = { icon: 48, glyph: 28, bar: 28, stat: 48, inset: 2 } as const;
/** The bar reads as crayon hatching rather than a solid fill. */
const HATCH_ANGLE = "-58deg";
const TRACK_OPACITY = 0.45;
const WELL_OPACITY = 0.35;
const FILL_ALPHA = "80";
const FILL_RADIUS = "10px 14px 9px 12px";
const WELL_RADIUS = "46% 54% 50% 50% / 55% 45% 55% 45%";

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
        gridTemplateColumns: `${ROW.icon}px minmax(110px,170px) minmax(0,1fr) ${ROW.stat}px`,
        gap: space.md,
        alignItems: "center",
      }}
    >
      <span
        style={{
          position: "relative",
          width: ROW.icon,
          height: ROW.icon,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: color,
            opacity: WELL_OPACITY,
            borderRadius: WELL_RADIUS,
            filter: CRAYON_FILTER,
          }}
        />
        <img
          src={icon}
          alt=""
          style={{ position: "relative", width: ROW.glyph, height: ROW.glyph, objectFit: "contain" }}
        />
      </span>

      <span className="headline-h8">{name}</span>

      <div style={{ position: "relative", height: ROW.bar }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            border: `${BORDER.pill}px dashed ${crayon.ink}`,
            borderRadius: radius.xl,
            opacity: TRACK_OPACITY,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: ROW.inset,
            top: ROW.inset,
            bottom: ROW.inset,
            width: `calc(${percentage}% - ${ROW.inset * 2}px)`,
            background: `repeating-linear-gradient(${HATCH_ANGLE}, ${color} 0 5px, transparent 5px 7px), ${color}${FILL_ALPHA}`,
            borderRadius: FILL_RADIUS,
            filter: CRAYON_FILTER,
          }}
        />
      </div>

      <span className="body-b6" style={{ textAlign: "right" }}>{percentage}%</span>
    </div>
  );
};
