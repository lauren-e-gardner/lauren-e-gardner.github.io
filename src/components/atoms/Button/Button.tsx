import React from 'react'
import styles from './Button.module.scss'

export interface ButtonProps {
    id?: string;
    accessibilityLabel?: string;
    type?: "primary" | "link";
    size?: "small" | "large";
    children: React.ReactNode | string;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ accessibilityLabel, type = "primary", size = "large", children, onClick, disabled }) => {
    const containerStyle = {
        "primary": {
            className: `${styles.button} border-light body-b1 text-light pad-sm br-sm`,
        },
        "link": {
            className: `bg-transparent ${styles.button} body-b1 text-light`,
        }
    }[type]
    return (
        <button
            {...containerStyle}
            style={{ width: size === "small" ? "fit-content" : "100%", cursor: "pointer" }}
            aria-label={accessibilityLabel}
            onClick={disabled ? undefined : onClick}
        >
            {children}
        </button>
    )
}