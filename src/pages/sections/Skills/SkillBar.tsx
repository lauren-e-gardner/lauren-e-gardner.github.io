import { CRAYON_FILTER, crayon, space } from "../../../components/tokens/crayon";
import { CrayonFill } from "../../../components/atoms/Crayon";
import { useDeviceType } from "../../../hooks/useDeviceType";

/** Row geometry: icon well, name column, bar, percentage. */
const ROW = { icon: 48, glyph: 28, bar: 28, stat: 48 } as const;
/** Narrower wells and a shorter bar once the row wraps onto two lines. */
const ROW_MOBILE = { icon: 38, glyph: 22, bar: 22, stat: 44 } as const;
/** How far the lantern fill stops short of its percentage, so the rail shows at the end. */
const FILL_TRIM = 4;
const FILL_RADIUS = "16px 12px 12px 16px";
const WELL_RADIUS = "46% 54% 50% 50% / 55% 45% 55% 45%";

interface SkillBarProps {
  name: string;
  icon: string;
  percentage: number;
}

/**
 * One full-width skill row: logo on a washed blue blob, name in MyHand, a lantern
 * crayon fill along a blue crayon rail, and the percentage in mono.
 *
 * Below the mobile breakpoint there isn't room for all four side by side, so the
 * bar drops onto its own line under the icon, name and percentage.
 */
export const SkillBar = ({ name, icon, percentage }: SkillBarProps) => {
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
        <CrayonFill color={crayon.navy} radius={WELL_RADIUS} style={{ opacity: 0.8 }} />
        <img
          src={icon}
          alt=""
          style={{ position: "relative", width: row.glyph, height: row.glyph, objectFit: "contain" }}
        />
      </span>

      <span className="headline-h8" style={{ minWidth: 0, overflowWrap: "anywhere" }}>{name}</span>

      {/* On mobile the percentage sits beside the name and the bar spans the row. */}
      {isMobile && (
        <span className="mono-m2" style={{ textAlign: "right" }}>{percentage}%</span>
      )}

      <div
        style={{
          position: "relative",
          height: row.bar,
          ...(isMobile ? { gridColumn: "1 / -1" } : null),
        }}
      >
        {/* <CrayonFill color={crayon.onNavyMuted} radius={RAIL_RADIUS} style={{ opacity: 0.8 }} /> */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `calc(${percentage}% - ${FILL_TRIM}px)`,
            background: crayon.accentBlue,
            borderRadius: FILL_RADIUS,
            filter: CRAYON_FILTER,
            opacity: 1
          }}
        />
      </div>

      {!isMobile && (
        <span className="mono-m2" style={{ textAlign: "right" }}>{percentage}%</span>
      )}
    </div>
  );
};
