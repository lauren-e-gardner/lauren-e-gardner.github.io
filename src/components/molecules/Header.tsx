import React from "react";
import { CRAYON_FILTER, crayon, radius, space } from "../tokens/crayon";

/** The highlighter swipe overshoots the text, the way a marker would. */
const SWIPE = { left: -14, right: -18, top: "30%", bottom: "4%" } as const;

interface HeaderProps {
    title: string;
    /** Page title or section heading. Existing usages default to section. */
    variant?: "page" | "section";
    /** Optional lede shown beside the heading (Projects only, in the design). */
    description?: string | React.ReactNode;
    /** Crayon highlighter swipe behind the heading. */
    highlight?: string;
    /** Offset color of the misregistered heading shadow. */
    shadow?: string;
    /** Tilt of the highlighter swipe, in degrees. */
    swipeRotate?: number;
    /** Opacity of the swipe. */
    swipeOpacity?: number;
}

/**
 * Section heading: MyHand type sitting on a multiply crayon highlighter swipe,
 * with an offset colored shadow for the misregistered-print effect.
 */
export const Header = ({
    title,
    variant = "section",
    description,
    highlight = crayon.blue,
    shadow = `color-mix(in srgb, ${crayon.blue} 50%, transparent)`,
    swipeRotate = -2,
    swipeOpacity = 0.35,
}: HeaderProps) => {
    if (variant === "page") {
        return (
            <h1
                className="headline-h1"
                style={{
                    color: crayon.ink,
                    textShadow: `calc(var(--mis) * -0.8) calc(var(--mis) * 0.3) 0 color-mix(in srgb, ${crayon.blue} 45%, transparent)`,
                    textWrap: "balance",
                }}
            >
                {title}
            </h1>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: space.md,
            }}
        >
            <h2 className="headline-h3" style={{ position: "relative", alignSelf: "flex-start", color: crayon.ink }}>
                <span style={{ position: "relative"}}>{title}</span>
            </h2>
            {description && <p className="body-b4 lh-snug" style={{ maxWidth: "26em" }}>{description}</p>}
        </div>
    );
};
