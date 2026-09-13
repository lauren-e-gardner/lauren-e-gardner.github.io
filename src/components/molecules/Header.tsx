import React from "react";
import { Text } from "../atoms/Text";
import { useDeviceType } from "../../hooks/useDeviceType";

interface HeaderProps {
    type?: 'page' | 'section';
    title?: string;
    description?: string | React.ReactNode;
}

export const Header = ({ type = 'page',title, description }: HeaderProps) => {
    const deviceType = useDeviceType()
    const isMobile = deviceType === "mobile"
    const titleClass = {
        "page": isMobile ? "headline-h3" : "headline-h1",
        "section": isMobile ? "headline-h4" : "headline-h2"
    }[type]
    const descriptionClass = {
        "page": isMobile ? "body-b2" : "body-b1",
        "section": isMobile ? "body-b3" : "body-b2"
    }[type]
    return (
        <div>
        <Text className={titleClass} textAlign="center">{title}</Text>
        {description && <Text className={descriptionClass} textAlign="center">{description}</Text>}
        </div>
    );
};