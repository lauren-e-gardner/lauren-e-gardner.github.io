import { CRAYON_FILTER, crayon } from "../../components/tokens/crayon";
import { portrait } from "../../configs";

const PHOTO = { inset: "0%", size: "100%" } as const;
const BLOB = { right: "0", top: "0", width: "100%", radius: "47% 52% 50% 50%", opacity: 0.8 } as const;

const MAX_WIDTH = "350px";

export const ContactPortrait = () => (
  <div
    style={{
      position: "relative",
      justifySelf: "center",
      width: `min(100%, ${MAX_WIDTH})`,
      aspectRatio: "1",
    }}
  >
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

    {/* If the photo is ever missing the disc and rings stand on their own,
        rather than showing a broken-image glyph. */}
    <img
      src={portrait.src}
      alt={portrait.alt}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
      style={{
        position: "absolute",
        inset: PHOTO.inset,
        width: PHOTO.size,
        height: PHOTO.size,
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
  </div>
);
