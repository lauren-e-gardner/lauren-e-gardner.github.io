import { useEffect, useRef } from "react";
import { CRAYON_FILTER, crayon } from "../../components/tokens/crayon";

const ORIGINAL = "/images/ex.jpg";
const PIXELIZED = "/images/Pixel.png";

const W = 1000;
const H = 750;
/** Size of a dissolve cell, in canvas pixels. */
const CELL = 20;
/** Quantized dissolve steps — redrawing only when the step changes. */
const STEPS = 24;
/** hold original · dissolve in · hold pixelized · dissolve back (seconds) */
const TIMELINE = [2.2, 1.4, 2.2, 1.4];

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/** Draws `img` into an offscreen W×H canvas with `object-fit: cover` framing. */
const cover = (img: HTMLImageElement) => {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const scale = Math.max(W / img.width, H / img.height);
  const cw = W / scale;
  const ch = H / scale;
  c.getContext("2d")?.drawImage(img, (img.width - cw) / 2, (img.height - ch) / 2, cw, ch, 0, 0, W, H);
  return c;
};

/**
 * The self-portrait, looping between Lauren's original drawing and the version
 * run through her pixelizer: each 20px cell flips once the dissolve progress
 * passes that cell's fixed random threshold.
 */
export const PixelHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cancelled = false;

    Promise.all([loadImage(ORIGINAL), loadImage(PIXELIZED)])
      .then(([orig, pix]) => {
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const from = cover(orig);
        const to = cover(pix);
        const cols = Math.ceil(W / CELL);
        const rows = Math.ceil(H / CELL);
        // One fixed threshold per cell, so the dissolve is stable across loops.
        const thresholds = Array.from({ length: cols * rows }, () => Math.random());

        const dissolve = (progress: number) => {
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(from, 0, 0);
          ctx.imageSmoothingEnabled = false;
          for (let i = 0; i < thresholds.length; i++) {
            if (thresholds[i] >= progress) continue;
            const x = (i % cols) * CELL;
            const y = Math.floor(i / cols) * CELL;
            ctx.drawImage(to, x, y, CELL, CELL, x, y, CELL, CELL);
          }
        };

        const total = TIMELINE.reduce((a, b) => a + b, 0);
        const start = performance.now();
        let lastFrame = NaN;

        const tick = (now: number) => {
          let t = ((now - start) / 1000) % total;
          const [holdOrig, fadeIn, holdPixel, fadeOut] = TIMELINE;

          let progress: number;
          if (t < holdOrig) progress = 0;
          else if ((t -= holdOrig) < fadeIn) progress = t / fadeIn;
          else if ((t -= fadeIn) < holdPixel) progress = 1;
          else progress = 1 - (t - holdPixel) / fadeOut;

          const frame = Math.round(progress * STEPS) / STEPS;
          if (frame !== lastFrame) {
            lastFrame = frame;
            dissolve(frame);
          }
          raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        /* Without the images the canvas keeps its static Pixel.png background. */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ position: "relative", justifySelf: "center", width: "min(100%,500px)", aspectRatio: "4/3" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "6% -4% -5% 8%",
          background: crayon.yellow,
          borderRadius: 12,
          transform: "rotate(4deg)",
          filter: CRAYON_FILTER,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-3% 10% 12% -6%",
          background: crayon.magenta,
          borderRadius: 10,
          transform: "rotate(-5deg)",
          filter: CRAYON_FILTER,
          mixBlendMode: "multiply",
          opacity: 0.75,
        }}
      />
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        aria-label="Self-portrait by Lauren, animating from the original drawing to its pixelized version"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: `#fff url(${PIXELIZED}) center/cover`,
          imageRendering: "pixelated",
          border: `4px solid ${crayon.ink}`,
          borderRadius: 6,
          transform: "rotate(-1.5deg)",
          boxSizing: "border-box",
        }}
      />
      <div
        className="crayon-hand"
        style={{
          position: "absolute",
          right: -8,
          bottom: -22,
          transform: "rotate(-6deg)",
          fontSize: 22,
          color: crayon.ink,
          background: crayon.cream,
          padding: "2px 10px",
        }}
      >
        made w/ my pixelizer ↑
      </div>
    </div>
  );
};
