import React from 'react'
import { CRAYON_FILTER, crayon } from '../../tokens/crayon'
import { BORDER } from '../Crayon'
import { Icon, IconProps } from '../Icon/Icon';

/**
 * `primary`   — filled crayon block, recolorable per card.
 * `secondary` — outlined, for the quieter action beside a primary.
 * `link`      — bare clickable text: nav links, and any inline text action.
 */
export type ButtonVariant = "primary" | "secondary" | "link";

/** Buttons are hand-drawn, so no two corners share a radius. */
const BUTTON_RADIUS = { primary: "10px 14px 9px 16px", secondary: "12px 9px 15px 10px" } as const;

/** Icon sizing, and the space it keeps from the label. */
const ICON_SIZE = 16;
const ICON_GAP = 6;

/** Type scale each variant defaults to — see fonts.scss. */
const TEXT_CLASS: Record<ButtonVariant, string> = {
    primary: "bodyMedium-b6",
    secondary: "bodyMedium-b6",
    link: "headline-h8",
};

/** Hover and transition live in crayon.scss, keyed off these classes. */
const VARIANT_CLASS: Record<ButtonVariant, string> = {
    primary: "crayon-btn crayon-btn-filled",
    secondary: "crayon-btn crayon-btn-outlined",
    link: "crayon-nav-link",
};

export interface ButtonProps {
    id?: string;
    accessibilityLabel?: string;
    variant?: ButtonVariant;
    /** Optional so an icon can stand alone — label it with accessibilityLabel. */
    children?: React.ReactNode | string;
    onClick?: () => void;
    /** Renders an anchor instead of a button. External links get noopener. */
    href?: string;
    /** Opens `href` in a new tab. Ignored without an href. */
    external?: boolean;
    /** Fill for `primary`, stroke for `secondary`, text color for `link`. */
    color?: string;
    /** Overrides the variant's default type scale class. */
    textClass?: string;
    /** Stretches to the container instead of hugging its label. */
    fullWidth?: boolean;
    /** Label alignment, which only matters once fullWidth is set. */
    textAlign?: "left" | "center";
    disabled?: boolean;
    icon?: IconProps;
    /** Which side of the label the icon sits on. */
    iconPosition?: "leading" | "trailing";
    /** ARIA pass-throughs, for buttons that sit in a menu or open one. */
    role?: string;
    ariaExpanded?: boolean;
    ariaHasPopup?: boolean;
}

/**
 * The one button in the crayon system. Filled and outlined variants draw their
 * shape as an absolutely positioned sibling behind the label, so `url(#crayon)`
 * roughens the artwork while the text stays crisp.
 *
 * Its layout comes from the `.crayon .crayon-btn` / `.crayon-nav-link` rules,
 * which are scoped to `.crayon` — so use it inside that scope, not on the
 * Nostalgia / Thesis / SkillsHub pages, which keep their own look.
 */
export const Button: React.FC<ButtonProps> = ({
    id,
    accessibilityLabel,
    variant = "primary",
    children,
    onClick,
    href,
    external,
    color,
    textClass,
    fullWidth,
    textAlign,
    disabled,
    icon,
    iconPosition = "leading",
    role,
    ariaExpanded,
    ariaHasPopup,
}) => {
    const shapeColor = color ?? (variant === "primary" ? crayon.yellow : crayon.ink);
    const renderedIcon = icon && <Icon {...icon} size={icon.size ?? ICON_SIZE} color={icon.color ?? crayon.ink} />;

    const content = (
        <>
            {variant !== "link" && (
                <span
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: variant === "primary" ? shapeColor : undefined,
                        border: variant === "secondary" ? `${BORDER.button}px solid ${shapeColor}` : undefined,
                        borderRadius: BUTTON_RADIUS[variant],
                        filter: CRAYON_FILTER,
                    }}
                />
            )}
            <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: ICON_GAP }}>
                {icon && iconPosition === "leading" && renderedIcon}
                {children}
                {icon && iconPosition === "trailing" && renderedIcon}
            </span>
        </>
    );

    const className = `${VARIANT_CLASS[variant]} ${textClass ?? TEXT_CLASS[variant]}`;
    const style: React.CSSProperties = {
        width: fullWidth ? "100%" : "fit-content",
        textAlign,
        color: variant === "link" ? color : undefined,
        opacity: disabled ? 0.5 : undefined,
        cursor: disabled ? "not-allowed" : "pointer",
    };

    const aria = {
        role,
        "aria-label": accessibilityLabel,
        "aria-expanded": ariaExpanded,
        "aria-haspopup": ariaHasPopup,
    };

    if (href) {
        return (
            <a
                id={id}
                className={className}
                style={style}
                href={href}
                {...aria}
                onClick={disabled ? undefined : onClick}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            id={id}
            type="button"
            className={className}
            style={style}
            {...aria}
            disabled={disabled}
            onClick={disabled ? undefined : onClick}
        >
            {content}
        </button>
    );
}

export default Button
