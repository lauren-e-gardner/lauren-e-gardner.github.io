import React from "react";
import { Text } from "../atoms/Text";

interface HeaderProps {
    type?: 'page' | 'section';
    title?: string;
    description?: string | React.ReactNode;
}

export const Header = ({ type = 'page',title, description }: HeaderProps) => {
    const titleClass = {
        "page": "headline-h1",
        "section": "headline-h2"
    }[type]
    const descriptionClass = {
        "page": "body-b1",
        "section": "body-b2"
    }[type]
    return (
        <div>
        <Text className={titleClass} textAlign="center">{title}</Text>
        {description && <Text className={descriptionClass} textAlign="center">{description}</Text>}
        </div>
    );
};