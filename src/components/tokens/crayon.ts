/**
 * Palette for the crayon / primary-color home page.
 * See design_handoff_crayon_homepage/README.md ("Design Tokens").
 */
export const crayon = {
    cream: "#f5eedb",
    paper: "#fbf7ea",
    /** Slightly deeper paper, behind images while they load. */
    paperShade: "#e9e1c8",
    ink: "#2a1a14",
    mutedInk: "#5a4336",
    red: "#e3261b",
    maroon: "#8b0a17",
    yellow: "#ffc414",
    orange: "#ff7f11",
    lime: "#b5e02b",
    green: "#1fa84f",
    lavender: "#c9c5ee",
    blue: "#2350d8",
    magenta: "#ec1e8c",
} as const;

export type CrayonColor = (typeof crayon)[keyof typeof crayon];

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

/** Applied to decorative shapes only — never to text. */
export const CRAYON_FILTER = "url(#crayon)";

/**
 * Offset of the colored heading shadows (misregistration), as a fraction of the
 * heading's own font size. `em` so the shadow stays the same visual distance
 * from the strokes when the headline scales down at the mobile breakpoint —
 * floored so it never disappears on the smallest type.
 */
export const MISREGISTER = "clamp(1.5px, 0.042em, 5px)";

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
