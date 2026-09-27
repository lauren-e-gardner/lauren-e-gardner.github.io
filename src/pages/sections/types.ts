import React, { ReactNode } from 'react';

export type DraggableProps = {
  children: ReactNode;
  className?: string;
  startX: number;
  startY: number;
};

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type Palette = RGB[];

export type ImageDataType = ImageData;

export type HTMLCanvas = HTMLCanvasElement | null;

export type HTMLInputEvent = React.ChangeEvent<HTMLInputElement>;

export type HTMLImage = HTMLImageElement;

export interface Project {
    title: string;
    date: string;
    role: string;
    description: string;
    skills: string[];
    techIcons: string[];
    demoLink?: string;
    githubLink?: string;
    screenshot: string;
  }
  
  export interface Skill {
    name: string;
    icon: string;
    percentage: number;
  }
  
  export interface Experience {
    date: string;
    /** Route to an in-site demo of the work, where one exists. */
    demo?: string;
    title: string;
    company: string;
    /** Optional location, e.g. "Remote" or "Princeton, NJ". */
    location?: string;
    /** Responsibilities and results, one bullet each. */
    points: string[];
  }
  
  export interface Education {
    degree: string;
    school: string;
    period: string;
    gpa: string;
    details: string;
    logoDark: string;
    logoLight: string;
  }
  