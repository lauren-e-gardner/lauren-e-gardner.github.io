import React from 'react'
import styles from './Button.module.scss'
import { Icon, IconProps } from '../Icon/Icon';

export interface ButtonProps {
    id?: string;
    accessibilityLabel?: string;
    type?: "primary" | "link";
    size?: "small" | "large";
    children: React.ReactNode | string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: IconProps;
}

export const Button: React.FC<ButtonProps> = ({ accessibilityLabel, type = "primary", size = "large", children, onClick, disabled, icon }) => {
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
            <div className="gap-sm" style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Icon {...icon} size={16} color={"#fff"}/>
                {children}
            </div>
        </button>
    )
}