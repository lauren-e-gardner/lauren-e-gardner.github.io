interface Experience {
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

// Most recent first.
export const experience: Experience[] = [
  {
    date: "Apr. 2025 - Present",
    title: "Software Engineer II",
    company: "Western Union",
    location: "Austin, TX",
    points: [
      "Built a React, React Native, TypeScript, and SCSS atomic design system to modernize and replace Western Union’s existing website and send-money experience.",
      "Implemented and deployed an internal React Storybook for web and mobile components for efficient creation, debugging, and documentation of the design system.",
      "Operated as the engineering lead for an improved tokenized design system.",
      "Led a four person team to deliver ~50 React Native components in a month and a half.",
      "Reduced gaps between React and React Native design systems by implementing a monorepo with a three-tier token structure.",
      "Led daily design, product, and engineering meetings to drive alignment and progress, while independently auditing the platform to identify and coordinate the resolution of 20+ issues within three days.",
    ],
  },
  {
    date: "Jun. 2024 - Present",
    demo: "/importclubdemo",
    title: "Frontend Software Developer",
    company: "Import Club Direct",
    points: [
      "Coded in Typescript to build a React-based e-commerce website.",
      "Developed a reusable React layout with a consistent header and navigation menus across multiple pages.",
      "Designed and implemented a dynamic settings page using React components, enabling seamless tab navigation and user interaction.",
      "Helped with transfer from an AWS and React framework to a Laravel, PHP, and React framework.",
    ],
  },
  {
    date: "Oct. 2024 - Feb. 2025",
    title: "Marketing Data Engineer",
    company: "Planet Networks",
    points: [
      "Managed, analyzed, and designed digital and physical marketing campaigns.",
      "Used SQL and Python to analyze marketing and sales strategies, which enhanced door-to-door sales efficiency by locating 23,633 untouched properties and 1,651 unvisited roads, optimizing routes for higher conversions.",
      "Monitored daily marketing performance, providing data-driven insights to improve ROI: A/B testing on Meta Ads, boosting website visits sevenfold and reducing cost per click by $3.00.",
    ],
  },
];
