import type { Project } from "../types.ts";

export const projects: Project[] = [
  {
    title: "SkillsHub",
    date: "Nov. 2024 - Jan. 2025",
    role: "Full Stack Dev.",
    techIcons: [
      "/Logos/Django.png",
      "/Logos/React.png",
      "/Logos/Python.png",
      "/Logos/JavaScript.png",
    ],
    description:
      "A job board platform developed in my free time for Planet Networks to track employee skills and positions. Video-game inspired design to encourage personal growth and engagement.",
    demoLink: "#",
    githubLink: "#",
    screenshot:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/40144fd395aa7019e660a3b709ab658a1cc21323",
  },
  {
    title: "Space Otterssey",
    date: "Jan. 2024 - May. 2025",
    role: "Thesis Project",
    techIcons: [
      "/Logos/Three.png",
      "/Logos/JavaScript.png",
      "/Logos/OpenGL.png",
    ],
    description:
      "This 3D game uses procedural generation to create unique environments and objects in real-time, without relying on imported mesh files. Each play through offers a completely different experience, with dynamic visuals generated as you play.",
    demoLink: "#",
    githubLink: "https://github.com/lauren-e-gardner/Space-Otterssey-Thesis",
    screenshot:
      "/images/Otterssey.png",
  },
  {
    title: "Fabric Simulator",
    date: "Apr. 2023 - Dec. 2023",
    role: "Designer",
    techIcons: [
      "/Logos/Three.png",
      "/Logos/JavaScript.png",
    ],
    description:
      "A fabric simulator that realistically models the behavior of cloth in various environments. It accounts for factors like gravity, collisions with objects, and dynamic elements such as wind and weather patterns.",
    demoLink: "#",
    githubLink: "https://github.com/lauren-e-gardner/Fabric_Simulator",
    screenshot:
      "/images/Fabric.png",  
    },
  {
    title: "Nostalgia",
    date: "Jan. 2023 - Apr. 2023",
    role: "Designer",
    techIcons: [
      "/Logos/Three.png",
      "/Logos/JavaScript.png",
      "/Logos/Python.png",
    ],
    description:
      "A design project inspired by Windows operating system versions and the nostalgic feeling they have. Custom-coded tools, including an image pixelizer, and a dithering program that can create new colors with a limited palette.",
    demoLink: "/nostalgia",
    githubLink: "https://github.com/lauren-e-gardner/Image_Processor",
    screenshot:
      "/images/Pixel.png"
  },
];