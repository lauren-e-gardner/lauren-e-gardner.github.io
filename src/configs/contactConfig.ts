interface Contact {
    label: string;
    text: string;
    href: string;
}

/**
 * Portrait shown beside the contact links. A square, background-free cut-out,
 * so the crayon disc shows around the subject. To swap it, replace the file
 * under `public/` keeping those two properties.
 */
export const portrait = {
    src: "/images/Portrait.webp",
    alt: "Lauren Gardner, holding a cat mug",
};

export const contacts: Contact[] = [
    {
        label: "email",
        text: "laurenator1784@gmail.com",
        href: "mailto:laurenator1784@gmail.com",
    },
    {
        label: "linkedin",
        text: "linkedin.com/in/lauren-e-gardner02",
        href: "https://www.linkedin.com/in/lauren-e-gardner02/",
    },
    {
        label: "github",
        text: "github.com/lauren-e-gardner",
        href: "https://github.com/lauren-e-gardner",
    },
]
