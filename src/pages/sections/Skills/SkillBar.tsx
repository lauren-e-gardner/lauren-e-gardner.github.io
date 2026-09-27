import { CRAYON_FILTER, crayon, radius, space } from "../../../components/tokens/crayon";
import { BORDER } from "../../../components/atoms/Crayon";
import { useDeviceType } from "../../../hooks/useDeviceType";

/** Row geometry: icon well, name column, bar, percentage. */
const ROW = { icon: 48, glyph: 28, bar: 28, stat: 48, inset: 2 } as const;
/** Narrower wells and a shorter bar once the row wraps onto two lines. */
const ROW_MOBILE = { icon: 38, glyph: 22, bar: 22, stat: 44, inset: 2 } as const;
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
 *
 * Below the mobile breakpoint there isn't room for all four side by side, so the
 * bar drops onto its own line under the icon, name and percentage.
 */
export const SkillBar = ({ name, icon, percentage, color }: SkillBarProps) => {
  const isMobile = useDeviceType() === "mobile";
  const row = isMobile ? ROW_MOBILE : ROW;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? `${row.icon}px minmax(0,1fr) ${row.stat}px`
          : `${row.icon}px minmax(110px,170px) minmax(0,1fr) ${row.stat}px`,
        columnGap: space.md,
        rowGap: space.xs,
        alignItems: "center",
      }}
    >
      <span
        style={{
          position: "relative",
          width: row.icon,
          height: row.icon,
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
          style={{ position: "relative", width: row.glyph, height: row.glyph, objectFit: "contain" }}
        />
      </span>

      <span className="headline-h8" style={{ minWidth: 0, overflowWrap: "anywhere" }}>{name}</span>

      {/* On mobile the percentage sits beside the name and the bar spans the row. */}
      {isMobile && (
        <span className="body-b6" style={{ textAlign: "right" }}>{percentage}%</span>
      )}

      <div
        style={{
          position: "relative",
          height: row.bar,
          ...(isMobile ? { gridColumn: "1 / -1" } : null),
        }}
      >
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
            left: row.inset,
            top: row.inset,
            bottom: row.inset,
            width: `calc(${percentage}% - ${row.inset * 2}px)`,
            background: `repeating-linear-gradient(${HATCH_ANGLE}, ${color} 0 5px, transparent 5px 7px), ${color}${FILL_ALPHA}`,
            borderRadius: FILL_RADIUS,
            filter: CRAYON_FILTER,
          }}
        />
      </div>

      {!isMobile && (
        <span className="body-b6" style={{ textAlign: "right" }}>{percentage}%</span>
      )}
    </div>
  );
};
