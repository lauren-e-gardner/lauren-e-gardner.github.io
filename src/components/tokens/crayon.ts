/**
 * Palette for the crayon / primary-color home page.
 * See design_handoff_crayon_homepage/README.md ("Design Tokens").
 */
export const crayon = {
    cream: "#f5eedb",
    paper: "#fbf7ea",
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

/** Applied to decorative shapes only — never to text. */
export const CRAYON_FILTER = "url(#crayon)";

/** Offset of the colored heading shadows (misregistration), in px. */
export const MISREGISTER = 4;

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
