import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { colors } from "../tokens/colors";
import Icon from "../atoms/Icon/Icon";
import { useDeviceType } from '../../hooks/useDeviceType';


interface CarouselProps {
    items: ReactNode[]
}

const ITEM_GAP = 32;
const STEP_TRANSITION_MS = 600;
const STEP_PAUSE_MS = 1800;

export const Carousel = ({
    items,
}: CarouselProps) => {
    const count = items.length;
    const viewportRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);

    const deviceType = useDeviceType()
    const isMobile = deviceType === "mobile"

    const [viewportWidth, setViewportWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const itemStep = itemWidth + ITEM_GAP;

    // How many item steps fit between the center and either edge of the viewport.
    // Items fade from fully opaque at the center to transparent at this distance.
    const halfVisibleSteps = itemStep > 0 ? viewportWidth / 2 / itemStep : 1;

    // Pad each side with enough copies of the items that the visible area never runs
    // out, even mid-transition past either end, before snapping back to the middle copy.
    const padCopies = count > 0 ? Math.ceil((Math.ceil(halfVisibleSteps) + 1) / count) : 0;
    const base = padCopies * count;
    const extended = count > 0
        ? Array.from({ length: padCopies * 2 + 1 }, () => items).flat()
        : [];

    const [stepIndex, setStepIndex] = useState(base);
    const [animate, setAnimate] = useState(true);

    // Track the viewport and item sizes so centering works for any parent width.
    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const firstItem = firstItemRef.current;
        if (!viewport) return;
        const measure = () => {
            setViewportWidth(viewport.getBoundingClientRect().width);
            if (firstItem) setItemWidth(firstItem.getBoundingClientRect().width);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        if (firstItem) observer.observe(firstItem);
        return () => observer.disconnect();
    }, [count]);

    const normalize = useCallback((index: number) => {
        if (count === 0) return 0;
        return base + (((index - base) % count) + count) % count;
    }, [count, base]);

    // Re-anchor to the middle copy when the item count or padding changes,
    // keeping the same active item.
    const prevBase = useRef(base);
    useEffect(() => {
        const oldBase = prevBase.current;
        prevBase.current = base;
        setAnimate(false);
        setStepIndex((i) => count === 0 ? 0 : base + ((((i - oldBase) % count) + count) % count));
    }, [base, count]);

    function goNext() {
        setAnimate(true);
        setStepIndex((i) => i + 1);
    }

    function goPrev() {
        setAnimate(true);
        setStepIndex((i) => i - 1);
    }

    function goTo(index: number) {
        setAnimate(true);
        setStepIndex(base + index);
    }

    function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
        // Ignore opacity transitions bubbling up from the items.
        if (e.target !== e.currentTarget) return;
        const normalized = normalize(stepIndex);
        if (normalized !== stepIndex) {
            setAnimate(false);
            setStepIndex(normalized);
        }
    }

    // After an instant (non-animated) snap, re-enable the transition on the next frame
    // so the following step animates again.
    useEffect(() => {
        if (!animate) {
            const id = requestAnimationFrame(() => setAnimate(true));
            return () => cancelAnimationFrame(id);
        }
    }, [animate, stepIndex]);

    // Auto-advance one step at a time, pausing on each item before moving to the next.
    useEffect(() => {
        if (count === 0) return;
        const id = setTimeout(goNext, STEP_TRANSITION_MS + STEP_PAUSE_MS);
        return () => clearTimeout(id);
    }, [stepIndex, count]);

    if (count === 0) return null;

    const activeDot = normalize(stepIndex) - base;
    // Shift the track so the active item's center lines up with the viewport's center.
    const offset = viewportWidth / 2 - itemWidth / 2 - stepIndex * itemStep;
    const transition = animate
        ? `${STEP_TRANSITION_MS}ms ease`
        : "0ms";

    const navButtonStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div className="col align-center gap-md" style={{ width: "100%" }}>
            <div style={{ position: "relative", width: "100%" }}>
                {!isMobile && <div
                    onClick={goPrev}
                    aria-label="Previous item"
                    className="border-dark br-xl pad-xs transition-transform duration-200 hover:scale-105"
                    style={{ ...navButtonStyle, left: "-64px" }}
                >
                    <Icon name="left-caret" size={32}/>
                </div>}
                <div ref={viewportRef} style={{ width: "100%", overflow: "hidden" }}>
                    <div
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            display: "flex",
                            gap: `${ITEM_GAP}px`,
                            transform: `translateX(${offset}px)`,
                            transition: `transform ${transition}`,
                            // Avoid a flash of mis-positioned items before the first measurement.
                            visibility: itemWidth > 0 ? "visible" : "hidden",
                        }}
                    >
                        {extended.map((item, index) => {
                            const distance = Math.abs(index - stepIndex);
                            const opacity = Math.max(0, 1 - distance / halfVisibleSteps);
                            return (
                                <div
                                    key={index}
                                    ref={index === 0 ? firstItemRef : undefined}
                                    aria-hidden={distance !== 0}
                                    style={{
                                        flex: "0 0 auto",
                                        opacity,
                                        pointerEvents: opacity === 0 ? "none" : undefined,
                                        transition: `opacity ${transition}`,
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {!isMobile && <div
                    onClick={goNext}
                    aria-label="Next item"
                    className="border-dark br-xl pad-xs transition-transform duration-200 hover:scale-105"
                    style={{ ...navButtonStyle, right: "-64px" }}
                >
                    <Icon name="right-caret" size={32}/>
                </div>}
            </div>
            <nav className="flex align-center justify-center gap-sm">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        aria-label={`Go to item ${index + 1}`}
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            padding: 0,
                            cursor: "pointer",
                            borderWidth: 1,
                            borderColor: colors.dark,
                            background: index === activeDot ? colors.dark : undefined,
                        }}
                    />
                ))}
            </nav>
        </div>
    );
};
