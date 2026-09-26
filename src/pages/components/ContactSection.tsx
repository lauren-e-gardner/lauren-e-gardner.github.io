import { CRAYON_FILTER, crayon } from "../../components/tokens/crayon";
import { contacts } from "../../configs";

/** Maroon crayon panel with the contact links, plus the page footer. */
export const ContactSection = () => (
  <>
    <div
      style={{
        position: "relative",
        padding: "clamp(28px,5vw,64px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
        gap: 36,
        alignItems: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: crayon.maroon,
          borderRadius: "14px 20px 12px 24px",
          filter: CRAYON_FILTER,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-3%",
          top: "-8%",
          width: "34%",
          aspectRatio: "1",
          background: crayon.yellow,
          borderRadius: "50% 45% 55% 50%",
          filter: CRAYON_FILTER,
          mixBlendMode: "multiply",
          opacity: 0.8,
        }}
      />

      <h2
        className="crayon-hand"
        style={{
          position: "relative",
          fontSize: "clamp(56px,7vw,100px)",
          lineHeight: 0.95,
          color: crayon.cream,
          textShadow: `var(--mis) var(--mis) 0 ${crayon.red}`,
        }}
      >
        Contact Me
      </h2>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22 }}>
        {contacts.map((contact) => (
          <div key={contact.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="crayon-hand" style={{ fontSize: 24, color: crayon.yellow }}>{contact.label}</span>
            <a className="crayon-contact-link" href={contact.href} target="_blank" rel="noopener noreferrer">
              {contact.text}
            </a>
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        marginTop: 40,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        fontFamily: "'Space Mono', ui-monospace, monospace",
        fontSize: 12,
        color: crayon.mutedInk,
      }}
    >
      <span>© {new Date().getFullYear()} Lauren Gardner</span>
      <span>drawn, pixelized &amp; coded by hand</span>
    </div>
  </>
);

export default ContactSection;
