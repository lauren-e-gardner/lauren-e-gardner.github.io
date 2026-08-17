import React from 'react'
import { Text } from '../atoms/Text';
import { Button, ButtonProps } from '../atoms/Button/Button';

interface CardProps {
    type?: "project";
    title: string;
    subTitle?: string;
    rightLabel?: string;
    description?: string;
    frameworks?: string[];
    src?: string;
    demoButton?: ButtonProps;
    codeButton?: ButtonProps;
}

export const Card: React.FC<CardProps> = ({ type = "project", title, subTitle, rightLabel, description, frameworks, src, demoButton, codeButton }) => {
  const containerStyle = {
    "project": {
      className: "border-light pad-md br-md gap-md",
    }
  }[type]
  return (
    <div {...containerStyle} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div className="gap-md" style={{ display: "flex", flexDirection: "column"}}>
        <div style={{ display: "flex", flexDirection: "column"}}>
          {(title || rightLabel) && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {title && <Text className="headline-h2">{title}</Text>}
            {rightLabel && <Text className="body-b1">{rightLabel}</Text>}
          </div>}
          {subTitle && <Text className="body-b3">{subTitle}</Text>}
        </div>
        {frameworks && (
          <div className="gap-sm" style={{ display: "flex" }}>
            {frameworks.map((framework, index) => (
              <img key={index} src={framework} alt={`Framework ${index + 1}`} className="h-[20px] lg:h-[34px] xl:h-[34px] 2xl:h-[50px]" />
            ))}
          </div>
        )}
        {src && ( 
          <div 
            className="br-sm"
            style={{ aspectRatio: "16/9", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}
          >
            <img
              src={src}
              alt={`${title} Screenshot`}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {description && <Text className="body-b2">{description}</Text>}
      </div>
      
      {(demoButton || codeButton) && (
        <div className="gap-sm" style={{ display: "flex", flexDirection: "row" }}>
          <Button {...demoButton} type="primary"/>
          <Button {...codeButton} type="primary"/>
        </div>
      )}
    </div>
  )
}