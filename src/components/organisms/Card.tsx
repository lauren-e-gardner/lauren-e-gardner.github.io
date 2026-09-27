import React from 'react'
import { CRAYON_FILTER, crayon, radius, space } from '../tokens/crayon'
import { BORDER, CrayonBorder, CrayonPill } from '../atoms/Crayon'

/** Screenshot proportions, and how far the color block sits behind it. */
const SCREENSHOT = { ratio: "4/3", blockOffset: "9px" } as const;
/** Buttons are hand-drawn, so no two corners share a radius. */
const BUTTON_RADIUS = { filled: "10px 14px 9px 16px", outlined: "12px 9px 15px 10px" } as const;

export interface CardProps {
    title: string;
    role?: string;
    date?: string;
    description?: string;
    skills?: string[];
    /** Mono line of frameworks, e.g. "Three.js · JavaScript · OpenGL". */
    tech?: string;
    src?: string;
    /** Crayon block offset behind the screenshot, and the Demo button fill. */
    color?: string;
    /** Color of the card's title and skill pills. */
    ink?: string;
    /** Resting tilt, in degrees. The card straightens on hover. */
    tilt?: number;
    onDemo?: () => void;
    githubLink?: string;
}

/**
 * Project card: paper stock, crayon border, a color block peeking out from
 * behind the screenshot, and a resting tilt that straightens on hover.
 */
export const Card: React.FC<CardProps> = ({
    title,
    role,
    date,
    description,
    skills,
    tech,
    src,
    color = crayon.yellow,
    ink = crayon.ink,
    tilt = 0,
    onDemo,
    githubLink,
}) => {
    return (
        <article
            className="crayon-card"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: space.md,
                padding: `${space.md} ${space.md} ${space.lg}`,
                background: crayon.paper,
                ["--tilt" as string]: `${tilt}deg`,
            }}
        >
            <CrayonBorder />

            {src && (
                <div style={{ position: "relative", aspectRatio: SCREENSHOT.ratio }}>
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            inset: 0,
                            transform: `translate(${SCREENSHOT.blockOffset},${SCREENSHOT.blockOffset})`,
                            background: color,
                            borderRadius: radius.xs,
                            filter: CRAYON_FILTER,
                        }}
                    />
                    <img
                        src={src}
                        alt={`${title} screenshot`}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            border: `${BORDER.card}px solid ${crayon.ink}`,
                            borderRadius: radius.xs,
                            background: crayon.paperShade,
                        }}
                    />
                </div>
            )}

            {(role || date) && (
                <div
                    className="body-b6 caps-wide crayon-label"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: space.sm }}
                >
                    <span>{role}</span>
                    <span>{date}</span>
                </div>
            )}

            <h3 className="headline-h5" style={{ color: ink }}>{title}</h3>

            {description && <p className="body-b6">{description}</p>}

            {skills && skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: space.sm }}>
                    {skills.map((skill) => (
                        <CrayonPill key={skill} color={ink}>{skill}</CrayonPill>
                    ))}
                </div>
            )}

            {tech && <div className="body-b6 crayon-muted">{tech}</div>}

            {(onDemo || githubLink) && (
                <div style={{ display: "flex", gap: space.smLg, marginTop: "auto", paddingTop: space.xs }}>
                    {onDemo && (
                        <button className="crayon-btn crayon-btn-filled bodyMedium-b6" onClick={onDemo}>
                            <span
                                aria-hidden
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: color,
                                    borderRadius: BUTTON_RADIUS.filled,
                                    filter: CRAYON_FILTER,
                                }}
                            />
                            <span style={{ position: "relative" }}>Demo</span>
                        </button>
                    )}
                    {githubLink && (
                        <a
                            className="crayon-btn crayon-btn-outlined bodyMedium-b6"
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: crayon.ink }}
                        >
                            <span
                                aria-hidden
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    border: `${BORDER.button}px solid ${crayon.ink}`,
                                    borderRadius: BUTTON_RADIUS.outlined,
                                    filter: CRAYON_FILTER,
                                }}
                            />
                            <span style={{ position: "relative" }}>GitHub ↗</span>
                        </a>
                    )}
                </div>
            )}
        </article>
    )
}
