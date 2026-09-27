import React from 'react'
import { CRAYON_FILTER, crayon, radius, space } from '../tokens/crayon'
import { BORDER, CrayonBorder, CrayonBulletList, CrayonPill } from '../atoms/Crayon'
import { Button } from '../atoms/Button/Button'

/** Screenshot proportions, and how far the color block sits behind it. */
const SCREENSHOT = { ratio: "4/3", blockOffset: "9px" } as const;

/** The education variant's block offset, and the width its columns split at. */
const DEGREE = { blockOffset: "10px", minColumn: "280px" } as const;

export interface CardProps {
    /**
     * `project` is the default portrait card: screenshot, blurb, pills, buttons.
     * `education` is the wide degree card: label, school, degree, bullet points.
     */
    variant?: "project" | "education";
    title: string;
    role?: string;
    date?: string;
    /** Secondary line under the title. Used by the education variant. */
    subtitle?: string;
    description?: string;
    skills?: string[];
    /** Bulleted highlights. Used by the education variant. */
    points?: string[];
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
 * Paper stock, crayon border, a color block peeking out from behind, and a
 * resting tilt that straightens on hover — as a project card or a degree card.
 */
export const Card: React.FC<CardProps> = ({
    variant = "project",
    title,
    role,
    date,
    subtitle,
    description,
    skills,
    points,
    tech,
    src,
    color = crayon.yellow,
    ink = crayon.ink,
    tilt = 0,
    onDemo,
    githubLink,
}) => {
    if (variant === "education") {
        /* The block is a sibling rather than a negative-z child so it stays
           behind the paper regardless of the card's own stacking context. The
           tilt lives on the wrapper so block and paper move as one. */
        const label = [role, date].filter(Boolean).join(" · ");

        return (
            <div
                className="crayon-card"
                style={{ position: "relative", ["--tilt" as string]: `${tilt}deg` }}
            >
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        transform: `translate(${DEGREE.blockOffset},${DEGREE.blockOffset})`,
                        background: color,
                        borderRadius: radius.lg,
                        filter: CRAYON_FILTER,
                    }}
                />
                <article
                    style={{
                        position: "relative",
                        padding: `clamp(${space.lg}, 4vw, ${space.xlLg})`,
                        background: crayon.paper,
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${DEGREE.minColumn}),1fr))`,
                        gap: `${space.lg} ${space["2xl"]}`,
                    }}
                >
                    <CrayonBorder radius={radius.lg} />

                    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.sm }}>
                        {label && <span className="body-b6 caps-wide crayon-label">{label}</span>}
                        <h3 className="headline-h4" style={{ color: ink }}>{title}</h3>
                        {subtitle && <span className="bodyMedium-b3">{subtitle}</span>}
                    </div>

                    {points && points.length > 0 && <CrayonBulletList points={points} />}
                </article>
            </div>
        )
    }

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
                        <Button variant="primary" color={color} onClick={onDemo}>
                            Demo
                        </Button>
                    )}
                    {githubLink && (
                        <Button
                            variant="secondary"
                            href={githubLink}
                            external
                            icon={{ name: "external-link" }}
                            iconPosition="trailing"
                        >
                            GitHub
                        </Button>
                    )}
                </div>
            )}
        </article>
    )
}
