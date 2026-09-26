import React from 'react'
import { CRAYON_FILTER, crayon } from '../tokens/crayon'
import { CrayonBorder, CrayonPill } from '../atoms/Crayon'

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
                gap: 16,
                padding: "16px 16px 22px",
                background: crayon.paper,
                transform: `rotate(${tilt}deg)`,
            }}
        >
            <CrayonBorder />

            {src && (
                <div style={{ position: "relative", aspectRatio: "4/3" }}>
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            inset: 0,
                            transform: "translate(9px,9px)",
                            background: color,
                            borderRadius: 4,
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
                            border: `3px solid ${crayon.ink}`,
                            borderRadius: 4,
                            background: "#e9e1c8",
                        }}
                    />
                </div>
            )}

            {(role || date) && (
                <div
                    className="crayon-meta"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}
                >
                    <span>{role}</span>
                    <span>{date}</span>
                </div>
            )}

            <h3 className="crayon-hand" style={{ fontSize: 40, lineHeight: 1, color: ink }}>{title}</h3>

            {description && <p style={{ fontSize: 15.5, lineHeight: 1.55 }}>{description}</p>}

            {skills && skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.map((skill) => (
                        <CrayonPill key={skill} color={ink}>{skill}</CrayonPill>
                    ))}
                </div>
            )}

            {tech && (
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12.5, color: crayon.mutedInk }}>
                    {tech}
                </div>
            )}

            {(onDemo || githubLink) && (
                <div style={{ display: "flex", gap: 12, marginTop: "auto", paddingTop: 6 }}>
                    {onDemo && (
                        <button className="crayon-btn crayon-btn-filled" onClick={onDemo}>
                            <span
                                aria-hidden
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: color,
                                    borderRadius: "10px 14px 9px 16px",
                                    filter: CRAYON_FILTER,
                                }}
                            />
                            <span style={{ position: "relative" }}>Demo</span>
                        </button>
                    )}
                    {githubLink && (
                        <a
                            className="crayon-btn crayon-btn-outlined"
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
                                    border: `2.5px solid ${crayon.ink}`,
                                    borderRadius: "12px 9px 15px 10px",
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
