interface Project {
  title: string;
  date: string;
  role: string;
  description: string;
  skills: string[];
  techIcons: string[];
  /** Mono line of frameworks shown on the card. */
  tech: string;
  demoLink?: string;
  githubLink?: string;
  screenshot: string;
}

export const projects: Project[] = [
  {
    title: "Space Otterssey",
    date: "Jan. 2024 - May. 2025",
    role: "Thesis Project",
    techIcons: [
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Opengl-logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    ],
    tech: "Three.js · JavaScript · OpenGL",
    description:
      "This 3D game uses procedural generation to create unique environments and objects in real-time, without relying on imported mesh files. Each play through offers a completely different experience, with dynamic visuals generated as you play.",
    skills: [
      "Video Game Development",
      "3D Graphics",
      "Procedural Generation",
    ],
    demoLink: "/spaceotterssey",
    githubLink: "https://github.com/lauren-e-gardner/Space-Otterssey-Thesis",
    screenshot:
      "/images/Otterssey.png",
  },
  {
    title: "Nostalgia",
    date: "Jan. 2023 - Apr. 2023",
    role: "Designer",
    techIcons: [
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    ],
    tech: "Three.js · JavaScript · Python",
    description:
      "A design project inspired by Windows operating system versions and the nostalgic feeling they have. Custom-coded tools, including an image pixelizer, and a dithering program that can create new colors with a limited palette.",
    skills: [ 
      "Image Processing",
    ],
    demoLink: "/nostalgia",
    githubLink: "https://github.com/lauren-e-gardner/Image_Processor",
    screenshot:
      "/images/Pixel.png"
  },
  {
    title: "Fabric Simulator",
    date: "Apr. 2023 - Dec. 2023",
    role: "Designer",
    techIcons: [
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    ],
    tech: "Three.js · JavaScript",
    description:
      "A fabric simulator that realistically models the behavior of cloth in various environments. It accounts for factors like gravity, collisions with objects, and dynamic elements such as wind and weather patterns.",
    skills: [ 
      "3D Graphics",
      "Procedural Generation",
    ],
    demoLink: "#",
    githubLink: "https://github.com/lauren-e-gardner/Fabric_Simulator",
    screenshot:
      "/images/Fabric.png",  
    },
];