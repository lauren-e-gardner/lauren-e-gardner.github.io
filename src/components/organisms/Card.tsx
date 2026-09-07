import React from 'react'
import { Text } from '../atoms/Text';
import { Button, ButtonProps } from '../atoms/Button/Button';
import { Divider } from '../atoms/Divider';

interface CardProps {
    type?: "project" | "education";
    title: string; // degree
    subTitle?: string; // school
    rightLabel?: string; // year
    description?: string; // gpa
    skills?: string[]; // points
    frameworks?: string[];
    src?: string; // url for logo
    demoButton?: ButtonProps;
    codeButton?: ButtonProps;
}

const ProjectCard: React.FC<CardProps> = ({ title, rightLabel, skills, frameworks, src, demoButton, codeButton }) => {
  return (
    <>
      <div className="gap-md" style={{ display: "flex", flexDirection: "column"}}>
        <div style={{ display: "flex", flexDirection: "column"}}>
          {title && <Text className="headline-h3">{title}</Text>}
          {rightLabel && <Text className="body-b3">{rightLabel}</Text>}
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
        {skills && <ul className="mr-left-md" style={{listStyleType: "disc"}}>
            {skills.map((skill) => (
              <li className="body-b2">{skill}</li>
            ))}
          </ul>}
      </div>
      
      {(demoButton || codeButton) && (
        <div className="gap-sm" style={{ display: "flex", flexDirection: "row" }}>
          <Button {...demoButton} type="primary"/>
          <Button {...codeButton} type="primary"/>
        </div>
      )}
    </>
  )
}

const EducationCard: React.FC<CardProps> = ({ title, subTitle, description, rightLabel, skills, src }) => {
  return (
    <>
      <div className="row gap-2xl justify-between">
        <img src={src} style={{ height: '120px' }}/>
        <div className="col gap-sm" style={{textAlign: "right"}}>
          <Text className="bodyMedium-b1">{title}</Text>
          <Text className="body-b1">{subTitle}</Text>
          <Text className="body-b1">{rightLabel}</Text>
          <Text className="body-b1">{description}</Text>
        </div>
      </div>
      <Divider />
      <div>
        <ul className="mr-left-md" style={{listStyleType: "disc"}}>
          {skills?.map((skill) => {
            return <li className="body-b2">{skill}</li>
          })}
        </ul>
      </div>
    </>
  )
}

export const Card: React.FC<CardProps> = ({ type = "project", title, subTitle, rightLabel, skills, frameworks, src, demoButton, codeButton, description }) => {
  const containerStyle = {
    "project": {
      className: "col justify-between border-dark pad-md br-md gap-md",
      style: { height: "100%" }
    },
    "education": {
      className: "col br-lg border-dark pad-lg align-center",
      style: {width: 500, alignSelf: "center"}
    }
  }[type]

  const content = {
    "project": <ProjectCard title={title} rightLabel={rightLabel} skills={skills} frameworks={frameworks} src={src} demoButton={demoButton} codeButton={codeButton} />,
    "education": <EducationCard title={title} subTitle={subTitle} rightLabel={rightLabel} description={description} src={src} skills={skills}/>,
  }[type]

  return (
    <div {...containerStyle}>
      {content}
    </div>
  )
}