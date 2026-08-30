import React, { useState } from 'react'
import styles from './Button.module.scss'
import { Icon, IconProps } from '../Icon/Icon';
import {colors} from '../../tokens/colors'

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
    const [hovered, setHovered] = useState(false)
    const containerStyle = {
        "primary": {
            className: `${styles.button} border-dark body-b1 text-dark pad-sm br-sm`,
        },
        "link": {
            className: `bg-transparent ${styles.button} body-b1 text-dark`,
        }
    }[type]
    return (
        <button
            {...containerStyle}
            style={{ width: size === "small" ? "fit-content" : "100%", cursor: "pointer" }}
            aria-label={accessibilityLabel}
            onClick={disabled ? undefined : onClick}
            onMouseEnter={() => {setHovered(true)}}
            onMouseLeave={() => {setHovered(false)}}
        >
            <div className="gap-sm" style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Icon {...icon} size={16} color={hovered ? colors.pink : colors.dark}/>
                {children}
            </div>
        </button>
    )
}