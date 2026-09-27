import React, { CSSProperties } from "react";
import { CRAYON_FILTER, crayon, radius as radii, space } from "../tokens/crayon";

/**
 * Decorative primitives for the crayon look. Every one of these renders a
 * shape *behind* its text (never on it) so `filter: url(#crayon)` roughens the
 * artwork while the copy stays crisp.
 */

type Roughness = "clean" | "crayon" | "scribbly";

const ROUGHNESS: Record<Roughness, number> = { clean: 0, crayon: 4, scribbly: 9 };

/**
 * Hand-drawn geometry. These are artwork, not scale values: the uneven corner
 * percentages are what stop a shape reading as a rectangle or a circle.
 */
export const BLOB_RADIUS = {
  organic: "58% 42% 55% 45% / 50% 60% 40% 50%",
  mark: "40% 60% 50% 50% / 60% 40% 60% 40%",
  dot: "50% 40% 55% 45%",
} as const;

/** Crayon stroke weights. Thinner than 2px and the filter eats the line. */
export const BORDER = { card: 3, pill: 2, button: 2.5, frame: 4 } as const;

const DOT = { size: 14, offset: 5, column: "18px" } as const;

/**
 * The single SVG filter every crayon shape points at. Render once, near the
 * root of the page.
 */
export const CrayonDefs = ({ roughness = "crayon" }: { roughness?: Roughness }) => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
    <defs>
      <filter id="crayon" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} result="n" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="n"
          scale={ROUGHNESS[roughness]}
          xChannelSelector="R"
          yChannelSelector="G"
          result="d"
        />
        <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves={1} seed={8} result="g" />
        <feColorMatrix
          in="g"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.25"
          result="gm"
        />
        <feComposite in="d" in2="gm" operator="in" />
      </filter>
    </defs>
  </svg>
);

/** Full-screen paper grain, multiplied over everything. */
export const PaperGrain = () => (
  <div
    aria-hidden
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 60,
      opacity: 0.35,
      mixBlendMode: "multiply",
      backgroundImage: "radial-gradient(rgba(80,40,10,.22) 0.6px, transparent 1px)",
      backgroundSize: "3px 3px",
    }}
  />
);

/**
 * A crayon-drawn border, absolutely positioned over its container so the text
 * inside is never displaced by the filter.
 */
export const CrayonBorder = ({
  color = crayon.ink,
  width = BORDER.card,
  radius = radii.md,
}: {
  color?: string;
  width?: number;
  radius?: string;
}) => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      border: `${width}px solid ${color}`,
      borderRadius: radius,
      filter: CRAYON_FILTER,
      pointerEvents: "none",
    }}
  />
);

/** An organic scribbled blob. Positioned by the caller through `style`. */
export const CrayonBlob = ({
  color,
  radius = BLOB_RADIUS.organic,
  multiply = true,
  style,
}: {
  color: string;
  radius?: string;
  multiply?: boolean;
  style?: CSSProperties;
}) => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      background: color,
      borderRadius: radius,
      filter: CRAYON_FILTER,
      mixBlendMode: multiply ? "multiply" : undefined,
      ...style,
    }}
  />
);

/**
 * Text sitting on a crayon shape: the shape is an absolutely positioned
 * sibling, the text is a relative span above it.
 */
export const CrayonMark = ({
  children,
  color,
  radius = BLOB_RADIUS.mark,
  multiply = true,
  className,
  style,
  markStyle,
}: {
  children: React.ReactNode;
  color: string;
  radius?: string;
  multiply?: boolean;
  className?: string;
  style?: CSSProperties;
  markStyle?: CSSProperties;
}) => (
  <span className={className} style={{ position: "relative", ...style }}>
    <span
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        borderRadius: radius,
        filter: CRAYON_FILTER,
        mixBlendMode: multiply ? "multiply" : undefined,
        ...markStyle,
      }}
    />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

/** Outlined (rather than filled) crayon pill, used for the skill tags. */
export const CrayonPill = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <span className="bodyMedium-b7" style={{ position: "relative", padding: `${space["3xs"]} ${space.sm}` }}>
    <span
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        border: `${BORDER.pill}px solid ${color}`,
        borderRadius: radii.full,
        filter: CRAYON_FILTER,
      }}
    />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

/** Dot colors cycled down a crayon bullet list. */
export const BULLET_COLORS = [crayon.red, crayon.blue, crayon.green];

/**
 * A bulleted list whose markers are crayon dots. Shared by Education and
 * Experience so the two read as the same hand.
 */
export const CrayonBulletList = ({
  points,
  textClass = "body-b5",
  style,
}: {
  points: string[];
  /** Type scale class for the bullet text — see fonts.scss. */
  textClass?: string;
  style?: CSSProperties;
}) => (
  <ul
    style={{
      position: "relative",
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: space.smLg,
      ...style,
    }}
  >
    {points.map((point, index) => (
      <li
        key={point}
        className={textClass}
        style={{ display: "grid", gridTemplateColumns: `${DOT.column} minmax(0,1fr)`, gap: space.smLg }}
      >
        <span
          aria-hidden
          style={{
            width: DOT.size,
            height: DOT.size,
            marginTop: DOT.offset,
            background: BULLET_COLORS[index % BULLET_COLORS.length],
            borderRadius: BLOB_RADIUS.dot,
            filter: CRAYON_FILTER,
          }}
        />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);
