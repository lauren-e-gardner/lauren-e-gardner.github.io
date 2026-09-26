import React from "react";
import { CRAYON_FILTER, crayon } from "../tokens/crayon";

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
                gap: 16,
            }}
        >
            <h2
                className="crayon-hand"
                style={{
                    position: "relative",
                    alignSelf: "flex-start",
                    fontSize: "clamp(52px,6.5vw,88px)",
                    lineHeight: 1,
                    color: crayon.ink,
                }}
            >
                <span
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: -14,
                        right: -18,
                        top: "30%",
                        bottom: "4%",
                        background: highlight,
                        filter: CRAYON_FILTER,
                        mixBlendMode: "multiply",
                        transform: `rotate(${swipeRotate}deg)`,
                        borderRadius: 30,
                        opacity: swipeOpacity,
                    }}
                />
                <span style={{ position: "relative", textShadow: `var(--mis) 0 0 ${shadow}` }}>{title}</span>
            </h2>
            {description && (
                <p style={{ maxWidth: "26em", fontSize: 17, lineHeight: 1.55 }}>{description}</p>
            )}
        </div>
    );
};
