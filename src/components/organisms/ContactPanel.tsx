import { crayon, space } from "../tokens/crayon";
import { BLOB_RADIUS, CrayonBlob, CrayonFill, HAND_RADIUS } from "../atoms/Crayon";
import { contacts } from "../../configs";
import { ContactPortrait } from "../molecules/ContactPortrait";

/** The lantern blob spilling off the panel's top right. */
const BLOB = { right: "-2%", top: "-9%", width: "20%", opacity: 0.8 } as const;

/** Navy crayon panel with the portrait and contact links. */
export const ContactPanel = () => (
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
    <CrayonFill color={crayon.navy} radius={HAND_RADIUS.panel} />
    <CrayonBlob
      color={crayon.lantern}
      radius={BLOB_RADIUS.round}
      style={{ right: BLOB.right, top: BLOB.top, width: BLOB.width, aspectRatio: "1", opacity: BLOB.opacity }}
    />

    <div style={{ position: "relative" }}>
      <ContactPortrait />
    </div>

    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.lg }}>
      <h2
        className="headline-h2"
        style={{ color: crayon.paper, textShadow: `var(--mis) var(--mis) 0 ${crayon.ink}` }}
      >
        Contact Me
      </h2>

      {contacts.map((contact) => (
        <div key={contact.label} style={{ display: "flex", flexDirection: "column", gap: space["3xs"] }}>
          <span className="headline-h7" style={{ color: crayon.lantern }}>{contact.label}</span>
          <a className="crayon-contact-link bodyMedium-b2" href={contact.href} target="_blank" rel="noopener noreferrer">
            {contact.text}
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default ContactPanel;
