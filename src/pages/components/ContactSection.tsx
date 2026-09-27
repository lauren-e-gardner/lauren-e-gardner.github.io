import { CRAYON_FILTER, crayon, space } from "../../components/tokens/crayon";
import { contacts } from "../../configs";
import { ContactPortrait } from "./ContactPortrait";

/** Hand-drawn panel corners, and the yellow blob spilling off its top right. */
const PANEL_RADIUS = "14px 20px 12px 24px";
const BLOB = { right: "-2%", top: "-9%", width: "20%", radius: "50% 45% 55% 50%", opacity: 0.8 } as const;

/** Maroon crayon panel with the contact links, plus the page footer. */
export const ContactSection = () => (
  <>
    <div
      style={{
        position: "relative",
        padding: `clamp(${space.lg}, 5vw, ${space["3xl"]})`,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
        gap: space.xlLg,
        alignItems: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: crayon.maroon,
          borderRadius: PANEL_RADIUS,
          filter: CRAYON_FILTER,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: BLOB.right,
          top: BLOB.top,
          width: BLOB.width,
          aspectRatio: "1",
          background: crayon.yellow,
          borderRadius: BLOB.radius,
          filter: CRAYON_FILTER,
          mixBlendMode: "multiply",
          opacity: BLOB.opacity,
        }}
      />

      <div style={{ position: "relative" }}>
        <ContactPortrait />
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.lg }}>
        <h2
          className="headline-h2"
          style={{ color: crayon.cream, textShadow: `var(--mis) var(--mis) 0 ${crayon.red}` }}
        >
          Contact Me
        </h2>

        {contacts.map((contact) => (
          <div key={contact.label} style={{ display: "flex", flexDirection: "column", gap: space["3xs"] }}>
            <span className="headline-h8" style={{ color: crayon.yellow }}>{contact.label}</span>
            <a className="crayon-contact-link bodyMedium-b2" href={contact.href} target="_blank" rel="noopener noreferrer">
              {contact.text}
            </a>
          </div>
        ))}
      </div>
    </div>

    <div
      className="body-b6 crayon-muted"
      style={{
        marginTop: space.xlLg,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: space.smLg,
      }}
    >
      <span>© {new Date().getFullYear()} Lauren Gardner</span>
    </div>
  </>
);

export default ContactSection;
