import React from 'react'
import { crayon, radius, space } from '../tokens/crayon'
import { CrayonBulletList, CrayonFill, CrayonMark, HAND_RADIUS } from '../atoms/Crayon'
import Button from '../atoms/Button/Button';
import { Text } from '../atoms/Text';

/** Screenshot proportions and corners, and the lantern blob glowing behind it. */
const SCREENSHOT = { ratio: "16/10", radius: "6px" } as const;
const PROJECT = { padding: "14px 14px 18px", titleTop: 6, arrowGap: 6 } as const;
const SOURCE_ICON = 13;

/** The education variant's panel and text opacity, and the width its columns split at. */
const DEGREE = { opacity: 0.8, minColumn: "280px" } as const;

/** The experience variant's left column width and spacing, and its company highlight. */
const JOB = { minColumn: "220px", columnGap: 6, markPadding: "2px 4px", markOpacity: 0.28, bulletGap: 10 } as const;

export interface CardProps {
    /**
     * `project` is the default navy card: screenshot, blurb, tech line, links.
     * `education` is the wide degree panel: label, school, degree, bullet points.
     * `experience` is the job row: date and company beside a card of bullets.
     */
    variant?: "project" | "education" | "experience";
    /** Project title, school, or job title. */
    title: string;
    /** Year label for `education`. */
    role?: string;
    /** Year span for `project`; date range for `experience`; GPA for `education`. */
    date?: string;
    /** Degree, for `education`; location, for `experience`. */
    subtitle?: string;
    /** Company name, marked with a crayon highlight. Used by `experience`. */
    org?: string;
    description?: string;
    /** Bulleted highlights. Used by `education` and `experience`. */
    points?: string[];
    /** Mono line of frameworks, e.g. "Three.js · JavaScript · OpenGL". */
    tech?: string;
    src?: string;
    /** Resting tilt, in degrees. The card straightens on hover. */
    tilt?: number;
    /** In-site demo, opened in the same tab. Without one the card links to its code. */
    demoHref?: string;
    githubLink?: string;
}

/** Inner links handle their own navigation; the card's click is for the rest of it. */
const stop = (e: React.MouseEvent) => e.stopPropagation();

/**
 * Crayon-filled cards with a resting tilt that straightens on hover — as a
 * project card, a degree panel, or a job row.
 */
export const Card: React.FC<CardProps> = ({
    variant = "project",
    title,
    role,
    date,
    subtitle,
    org,
    description,
    points,
    tech,
    src,
    tilt = 0,
    demoHref,
    githubLink,
}) => {
    if (variant === "experience") {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${JOB.minColumn}),1fr))`,
                    gap: `${space.smLg} ${space.xlLg}`,
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: JOB.columnGap }}>
                    {date && <Text className="mono-m3 caps-wide crayon-label">{date}</Text>}
                    {org && (
                        <CrayonMark
                            className="headline-h8"
                            color={crayon.blue}
                            radius={radius["2xl"]}
                            style={{ alignSelf: "flex-start", padding: JOB.markPadding }}
                            markStyle={{ opacity: JOB.markOpacity }}
                        >
                            {org}
                        </CrayonMark>
                    )}
                    {subtitle && <Text className="body-b6 crayon-muted">{subtitle}</Text>}
                </div>

                <article style={{ gridColumn: "span 2", minWidth: 0, position: "relative", padding: space.lg }}>
                    <CrayonFill color={crayon.paperCard} />
                    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.smLg }}>
                        <Text className="bodyMedium-b1">{title}</Text>
                        {points && points.length > 0 && (
                            <CrayonBulletList
                                points={points}
                                textClass="body-b5 lh-relaxed"
                                gap={JOB.bulletGap}
                                dotOffset={4}
                            />
                        )}
                    </div>
                </article>
            </div>
        )
    }

    if (variant === "education") {
        const label = [role, date].filter(Boolean).join(" · ");

        return (
            <div className="crayon-card" style={{ position: "relative", ["--tilt" as string]: `${tilt}deg` }}>
                <CrayonFill color={crayon.paperCard} radius={HAND_RADIUS.panel} style={{ opacity: DEGREE.opacity }} />
                <article
                    style={{
                        position: "relative",
                        padding: `clamp(${space.lg}, 4vw, ${space.xlLg})`,
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${DEGREE.minColumn}),1fr))`,
                        gap: `${space.lg} ${space["2xl"]}`,
                        opacity: DEGREE.opacity,
                    }}
                >
                    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: space.sm }}>
                        {label && <Text className="mono-m3 caps-wide crayon-label">{label}</Text>}
                        <Text className="headline-h4" style={{ color: crayon.accentBlue }}>{title}</Text>
                        {subtitle && <Text className="bodyMedium-b3">{subtitle}</Text>}
                    </div>

                    {points && points.length > 0 && (
                        <CrayonBulletList points={points} colors={[crayon.accentBlue, crayon.ink]} />
                    )}
                </article>
            </div>
        )
    }

    const primaryHref = demoHref ?? githubLink;
    const open = () => {
        if (demoHref) window.location.href = demoHref;
        else if (githubLink) window.open(githubLink, "_blank", "noopener");
    };

    return (
        <article
            className="crayon-project"
            onClick={open}
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: space.smLg,
                padding: PROJECT.padding,
                ["--tilt" as string]: `${tilt}deg`,
            }}
        >
            <CrayonFill color={crayon.paperCard} />
            {src && (
                <div style={{ position: "relative", aspectRatio: SCREENSHOT.ratio }}>
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: SCREENSHOT.radius,
                            overflow: "hidden",
                            background: crayon.paperShade,
                        }}
                    >
                        <img
                            className="crayon-project-img"
                            src={src}
                            alt={`${title} screenshot`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                    </div>
                </div>
            )}
            <Text className="headline-h5" style={{color: crayon.navyDeep, zIndex: 2}}>{title}</Text>

            <div
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: space.smLg,
                    paddingTop: PROJECT.titleTop,
                }}
            >
                {date && <Text className="mono-m4" style={{ flex: "none" }}>{date}</Text>}
            </div>

            {description && (
                <Text className="body-b5" style={{ position: "relative" }}>{description}</Text>
            )}

            {tech && <Text className="mono-m2" style={{ position: "relative" }}>{tech}</Text>}

            {primaryHref && (
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: space.smLg,
                        marginTop: "auto",
                        paddingTop: space.xs,
                    }}
                >
                    <Button fullWidth textClass="headline-h8 text-crayon-ink" onClick={stop} href={primaryHref} external={!demoHref} color={crayon.blue}>
                        {demoHref ? "View demo" : "View code"}
                    </Button>
                    {demoHref && githubLink && <a className="body-b6" href={githubLink} onClick={stop} style={{ alignSelf: 'flex-start', display: "inline-flex", alignItems: "center", gap: space.xs }}>
                        GitHub 
                        <svg width={SOURCE_ICON} height={SOURCE_ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M13.5 3.5h7v7h-2.1V7.06l-8.2 8.2-1.48-1.49 8.2-8.2H13.5V3.5z" />
                            <path d="M5 5.9h5.4V8H7.1v8.9H16v-3.3h2.1V19H5V5.9z" />
                        </svg>
                    </a>}
                </div>
            )}
        </article>
    )
}
