import React from 'react'
import { Text } from '../atoms/Text';

interface CardProps {
    type?: "project";
    title: string;
    subTitle?: string;
    rightLabel?: string;
    description?: string;
    frameworks?: string[];
    src?: string;
    link: string;
}

export const Card: React.FC<CardProps> = ({ type = "project", title, subTitle, rightLabel, description, frameworks, src, link }) => {
  const containerStyle = {
    "project": {
      className: "border-light pad-md br-md gap-sm",
    }
  }[type]
  return (
    <div {...containerStyle} style={{ display: "flex", flexDirection: "column"}}>
      {(title || rightLabel) && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {title && <Text className="headline-h2">{title}</Text>}
        {rightLabel && <Text className="body-b1">{rightLabel}</Text>}
      </div>}
      {subTitle && <Text className="body-b3">{subTitle}</Text>}
    </div>
  )
}