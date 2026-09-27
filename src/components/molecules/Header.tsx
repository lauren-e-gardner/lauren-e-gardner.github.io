import React from "react";
import { CRAYON_FILTER, crayon, radius, space } from "../tokens/crayon";

/** The highlighter swipe overshoots the text, the way a marker would. */
const SWIPE = { left: -14, right: -18, top: "30%", bottom: "4%" } as const;

interface HeaderProps {
    title: string;
    /** Optional lede shown beside the heading (Projects only, in the design). */
    description?: string | React.ReactNode;
    /** Crayon highlighter swipe behind the heading. */
    highlight?: string;
    /** Offset color of the misregistered heading shadow. */
    shadow?: string;
    /** Tilt of the highlighter swipe, in degrees. */
    swipeRotate?: number;
    /** Opacity of the swipe, for the lighter orange one. */
    swipeOpacity?: number;
}

/**
 * Section heading: MyHand type sitting on a multiply crayon highlighter swipe,
 * with an offset colored shadow for the misregistered-print effect.
 */
export const Header = ({
    title,
    description,
    highlight = crayon.yellow,
    shadow = "rgba(236,30,140,.55)",
    swipeRotate = -2,
    swipeOpacity,
}: HeaderProps) => {
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
                <span
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: SWIPE.left,
                        right: SWIPE.right,
                        top: SWIPE.top,
                        bottom: SWIPE.bottom,
                        background: highlight,
                        filter: CRAYON_FILTER,
                        mixBlendMode: "multiply",
                        transform: `rotate(${swipeRotate}deg)`,
                        borderRadius: radius["3xl"],
                        opacity: swipeOpacity,
                    }}
                />
                <span style={{ position: "relative", textShadow: `var(--mis) 0 0 ${shadow}` }}>{title}</span>
            </h2>
            {description && <p className="body-b4" style={{ maxWidth: "26em" }}>{description}</p>}
        </div>
    );
};
