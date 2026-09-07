interface Skill {
  name: string;
  icon: string;
  progress: number;
  showBg?: boolean;
}

export const skills: Skill[] = [
    {   
        name: "React",
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        progress: 95,
        showBg: true,
    },
    {   
        name: "React-Native",
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        progress: 95,
        showBg: true,
    },
    {   
        name: "TypeScript",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        progress: 95,
    },
    {   
        name: "JavaScript",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        progress: 95,
    },
    {   
        name: "Python",
        icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        progress: 80,
    },
    {   
        name: "ThreeJS",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        progress: 75,
    },
    {   
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/java.svg",
        progress: 50,
        showBg: true,
    },
]