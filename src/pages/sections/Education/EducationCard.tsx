import { CRAYON_FILTER, crayon, radius, space } from "../../../components/tokens/crayon";
import { CrayonBorder, CrayonBulletList } from "../../../components/atoms/Crayon";
import { education } from "../../../configs";

/** The whole card sits slightly off-square, with the block peeking out below. */
const CARD_TILT = "-0.4deg";
const BLOCK_OFFSET = "10px";

/**
 * The degree, on paper stock with an orange crayon block offset behind it.
 * The block is a sibling rather than a negative-z child so it stays behind the
 * paper regardless of the card's own stacking context.
 */
export const EducationCard = () => (
  <>
    {education.map((edu) => (
      <div key={edu.school} style={{ position: "relative" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${BLOCK_OFFSET},${BLOCK_OFFSET}) rotate(${CARD_TILT})`,
            background: crayon.orange,
            borderRadius: radius.lg,
            filter: CRAYON_FILTER,
          }}
        />
        <div
          style={{
            position: "relative",
            padding: `clamp(${space.lg}, 4vw, ${space.xlLg})`,
            background: crayon.paper,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: `${space.lg} ${space["2xl"]}`,
            transform: `rotate(${CARD_TILT})`,
          }}
        >
          <CrayonBorder radius={radius.lg} />

          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.sm }}>
            <span className="body-b6 caps-wide crayon-label">{edu.year} · {edu.gpa}</span>
            <h3 className="headline-h4" style={{ color: crayon.red }}>{edu.school}</h3>
            <span className="bodyMedium-b3">{edu.degree}</span>
          </div>

          <CrayonBulletList points={edu.points ?? []} />
        </div>
      </div>
    ))}
  </>
);

export default EducationCard;
