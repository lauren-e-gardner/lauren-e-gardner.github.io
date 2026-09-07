interface Education {
    logo: string;
    degree: string;
    school: string;
    year: string;
    gpa: string;
    points?: string[];
}

export const education: Education[] = [
    {   
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        degree: "Bachelor of Arts Computer Science",
        school: "Princeton University",
        year: "2020-2024",
        gpa: "GPA: 3.52/4.00",
        points: [
            "Majored in Computer Science with a focus in Computer Graphics and Visual Arts.",
            "Computer Graphics thesis project.",
            "Taught a Princeton Wintersession course in Blender, Python, and generative graphics to ~20 students."
        ]
    }
]