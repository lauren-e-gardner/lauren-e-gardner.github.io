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
          {title && <Text className="headline-h3">{title}</Text>}
          {rightLabel && <Text className="body-b3">{<strong className="body-b3">{rightLabel}</strong>}</Text>}
          {subTitle && <Text className="body-b3">{subTitle}</Text>}
        </div>
        {frameworks && (
          <div className="gap-sm" style={{ display: "flex" }}>
            {frameworks.map((framework, index) => (
              <img 
                key={index} 
                src={framework} 
                alt={`Framework ${index + 1}`} 
                style={{
                  height: '18px',
                  width: '18px',
                }}
              />
            ))}
          </div>
        )}
        {src && ( 
          <div 
            className="br-sm"
            style={{ 
              aspectRatio: "16/9", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              overflow: "hidden" 
            }}
          >
            <img
              src={src}
              alt={`${title} Screenshot`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        {description && <Text className="body-b3">{description}</Text>}
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