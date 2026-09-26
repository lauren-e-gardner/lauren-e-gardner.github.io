import { CRAYON_FILTER, crayon } from "../../../components/tokens/crayon";
import { CrayonBorder } from "../../../components/atoms/Crayon";
import { education } from "../../../configs";

/** Crayon dot color per bullet, cycled down the list. */
const BULLET_COLORS = [crayon.red, crayon.blue, crayon.green];

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
            transform: "translate(10px,10px) rotate(-0.4deg)",
            background: crayon.orange,
            borderRadius: 10,
            filter: CRAYON_FILTER,
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "clamp(22px,4vw,40px)",
            background: crayon.paper,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: "28px 48px",
            transform: "rotate(-0.4deg)",
          }}
        >
          <CrayonBorder radius={10} />

          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="crayon-meta" style={{ fontSize: 13 }}>{edu.year} · {edu.gpa}</span>
            <h3
              className="crayon-hand"
              style={{ fontSize: "clamp(40px,4.5vw,56px)", lineHeight: 1, color: crayon.red }}
            >
              {edu.school}
            </h3>
            <span style={{ fontSize: 18, fontWeight: 500 }}>{edu.degree}</span>
          </div>

          <ul
            style={{
              position: "relative",
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {edu.points?.map((point, index) => (
              <li
                key={point}
                style={{ display: "grid", gridTemplateColumns: "18px minmax(0,1fr)", gap: 12, fontSize: 16, lineHeight: 1.55 }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 14,
                    height: 14,
                    marginTop: 5,
                    background: BULLET_COLORS[index % BULLET_COLORS.length],
                    borderRadius: "50% 40% 55% 45%",
                    filter: CRAYON_FILTER,
                  }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </>
);

export default EducationCard;
