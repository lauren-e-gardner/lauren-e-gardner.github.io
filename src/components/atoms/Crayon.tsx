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
  round: "50% 45% 55% 50%",
  mark: "40% 60% 50% 50% / 60% 40% 60% 40%",
  dot: "50% 40% 55% 45%",
} as const;

/** Deliberately uneven corners, so filled shapes look hand-cut. */
export const HAND_RADIUS = {
  card: "12px 16px 10px 18px",
  panel: "14px 20px 12px 24px",
} as const;

/** Crayon stroke weights. Thinner than 2px and the filter eats the line. */
export const BORDER = { card: 3, pill: 2, button: 2.5, frame: 4 } as const;

const DOT = { size: 12, column: "18px" } as const;

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

/**
 * A crayon-filled panel, absolutely positioned behind its container's content.
 * The content must be `position: relative` to sit above it.
 */
export const CrayonFill = ({
  color,
  radius = HAND_RADIUS.card,
  style,
}: {
  color: string;
  radius?: string;
  style?: CSSProperties;
}) => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      background: color,
      borderRadius: radius,
      filter: CRAYON_FILTER,
      pointerEvents: "none",
      ...style,
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

const PILL_PADDING = "5px 12px";

/** Outlined (rather than filled) crayon pill, used for the hero's language tags. */
export const CrayonPill = ({ children, color = crayon.ink }: { children: React.ReactNode; color?: string }) => (
  <span className="mono-m2" style={{ position: "relative", padding: PILL_PADDING }}>
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
export const BULLET_COLORS = [crayon.accentBlue, crayon.blue];

/**
 * A bulleted list whose markers are crayon dots. Shared by Education and
 * Experience so the two read as the same hand.
 */
export const CrayonBulletList = ({
  points,
  textClass = "body-b4 lh-relaxed",
  colors = BULLET_COLORS,
  gap = space.smLg,
  dotOffset = 5,
  style,
}: {
  points: string[];
  /** Type scale class for the bullet text — see fonts.scss. */
  textClass?: string;
  /** Dot colors, cycled down the list. */
  colors?: readonly string[];
  /** Space between bullets. */
  gap?: string | number;
  /** Nudges the dot down onto the first line of text, in px. */
  dotOffset?: number;
  style?: CSSProperties;
}) => (
  <ul
    style={{
      position: "relative",
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap,
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
            marginTop: dotOffset,
            background: colors[index % colors.length],
            borderRadius: BLOB_RADIUS.dot,
            filter: CRAYON_FILTER,
          }}
        />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);
