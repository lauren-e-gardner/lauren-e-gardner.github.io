/**
 * Palette for the "Lanterns" home page, taken from the painting
 * public/images/Lanterns.jpg.
 * See design_handoff_lantern_redesign/README.md ("Design tokens").
 */
export const crayon = {
    /** Page and nav background; light text on dark panels. */
    paper: "#f5eedb",
    /** Pixelizer card surface, mobile menu. */
    paperRaised: "#fbf7ea",
    /** Experience cards, Education panel. */
    paperCard: "#ebdfbf",
    /** Slightly deeper paper, behind screenshots while they load. */
    paperShade: "#e9e1c8",
    ink: "#13283a",
    inkMuted: "#4a6274",
    /** Project cards, Contact panel, code block. */
    navy: "#12324a",
    /** Behind the hero canvas while the painting loads; Skills panel. */
    navyDeep: "#0b1d2b",
    /** Section-title highlights, skill rail, logo wells, company highlights. */
    blue: "#2b74b0",
    /** Links, dates, the "LG" logo, nav hover, bullets. */
    accentBlue: "#1d5a8c",
    /** The lantern yellow: blobs, Contact labels, card links, skill bar fill. */
    lantern: "#e8e36a",
    /** Hero H1 offset shadow. */
    mint: "#5fc8b0",
    /** Tech line on project cards. */
    onNavyMuted: "#a9c3d1",
} as const;

export type CrayonColor = (typeof crayon)[keyof typeof crayon];

/** Syntax colors for the navy code block under the pixelizer. */
export const codeColors = {
    keyword: "#eef08c",
    string: "#8fd8f0",
    comment: "#7fa2b4",
    text: "#e6efe8",
    fn: "#9fe3c4",
    lineNumber: "#5d8296",
} as const;

export type CodeToken = Exclude<keyof typeof codeColors, "lineNumber">;

/**
 * Spacing and radius scales, as declared in spacing.scss. These resolve to the
 * same custom properties the `.pad-*` / `.gap-*` utility classes use, so a
 * value set from an inline style stays in step with one set from a class.
 */
export const space = {
    "3xs": "var(--space-3xs)",
    xs: "var(--space-xs)",
    sm: "var(--space-sm)",
    smLg: "var(--space-sm-lg)",
    md: "var(--space-md)",
    mdLg: "var(--space-md-lg)",
    lg: "var(--space-lg)",
    xl: "var(--space-xl)",
    xlLg: "var(--space-xl-lg)",
    "2xl": "var(--space-2xl)",
    "3xl": "var(--space-3xl)",
    "4xl": "var(--space-4xl)",
    "5xl": "var(--space-5xl)",
    "6xl": "var(--space-6xl)",
} as const;

export const radius = {
    xs: "var(--radius-xs)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    "3xl": "var(--radius-3xl)",
    full: "var(--radius-full)",
} as const;

/** Applied to decorative shapes only — never to text or photos. */
export const CRAYON_FILTER = "url(#crayon)";

/** Offset a nav anchor scroll needs to clear the fixed nav. */
export const SCROLL_OFFSET = 70;

/**
 * Smooth-scrolls a section under the fixed nav.
 *
 * Sections mount their content lazily (see FadeInSection), so the page grows
 * while the scroll is in flight and a single jump lands short. Re-target until
 * the section settles at the offset, or until we run out of patience.
 */
export const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const deadline = performance.now() + 2000;
    let lastY = NaN;
    let raf = 0;

    const stop = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("wheel", stop);
        window.removeEventListener("touchstart", stop);
        window.removeEventListener("keydown", stop);
    };

    const aim = () => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - SCROLL_OFFSET, behavior: "smooth" });

    const step = () => {
        const stalled = window.scrollY === lastY;
        lastY = window.scrollY;
        const off = Math.abs(el.getBoundingClientRect().top - SCROLL_OFFSET);

        // Only re-aim once the previous glide has come to rest, so we don't
        // fight the browser's own animation.
        if (stalled && off < 2) return stop();
        if (stalled) aim();

        if (performance.now() < deadline) raf = requestAnimationFrame(step);
        else stop();
    };

    // The user taking over wins; we stop chasing.
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    aim();
    raf = requestAnimationFrame(step);
};
