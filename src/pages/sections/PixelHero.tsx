import { useEffect, useRef, useState } from "react";
import { CRAYON_FILTER, crayon, radius, space } from "../../components/tokens/crayon";
import { BLOB_RADIUS, CrayonBlob, CrayonFill } from "../../components/atoms/Crayon";
import { Text } from '../../components/atoms/Text';

const ORIGINAL = "/images/Lanterns.jpg";

const W = 1000;
const H = 934;
/**
 * Block size at 100% pixelation: 90% of the Nostalgia pixelator's chunkiest
 * setting (10 blocks across). 0% is the untouched original.
 */
const MAX_PIXEL_SIZE = Math.round(0.60 * (W / 10));
/** hold pixelized · ease to original · hold original · ease back (seconds) */
const TIMELINE = [1, 2, 1, 2] as const;
const LOOP = TIMELINE.reduce((a, b) => a + b, 0);

/** The card, and the navy panel and lantern blob tucked behind it. */
const CARD = { maxWidth: 500, tilt: "-1deg", inset: "14px", canvasRatio: "656/613", canvasBorder: 3 } as const;
const NAVY_PANEL = { inset: "4% -3% -4% 6%", tilt: "2.5deg" } as const;
const BLUE_PANEL = { inset: "-2% 3% 2% -3%", tilt: "-2.5deg" } as const;
const LANTERN_BLOB = { left: "-16%", top: "-12%", width: "75%", aspectRatio: "1.2", opacity: 0.85 } as const;
const MINT_BLOB = { left: "-16%", top: "10%", width: "200%", aspectRatio: "1.2", opacity: 0.85 } as const;
const HEADER = { padding: "10px 16px", dot: 10 } as const;
const RULE = { height: 2, opacity: 0.5 } as const;
const PLAY = { width: 34, height: 30, radius: "12px 9px 15px 10px", glyph: 18 } as const;

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

const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** Pixelation (1 = fully pixelized, 0 = original) at `t` seconds into the loop. */
const pixelationAt = (t: number) => {
  const [holdPixel, toOriginal, holdOriginal, toPixel] = TIMELINE;
  if (t < holdPixel) return 1;
  if ((t -= holdPixel) < toOriginal) return 1 - easeInOut(t / toOriginal);
  if ((t -= toOriginal) < holdOriginal) return 0;
  return easeInOut((t - holdOriginal) / toPixel);
};

const pixelSizeFor = (pixelation: number) => Math.max(1, Math.round(1 + pixelation * (MAX_PIXEL_SIZE - 1)));

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The pixelizer card: Lauren's Lanterns painting pixelized live, like the
 * Nostalgia pixelator but in full color — each block is filled with its
 * top-left pixel. It eases between fully pixelized and the original on a loop;
 * the slider scrubs (and pauses), the button toggles playback. Starts paused
 * under reduced motion.
 */
export const PixelHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const [paused, setPaused] = useState(prefersReducedMotion);
  // The animation loop reads these every frame, so they live in refs rather
  // than restarting the loop on each toggle.
  const pausedRef = useRef(paused);
  /** Pixelation shown while paused: where playback stopped, or where the slider was dragged. */
  const manualRef = useRef(1);

  const pause = (next: boolean) => {
    pausedRef.current = next;
    setPaused(next);
  };

  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    loadImage(ORIGINAL)
      .then((img) => {
        const ctx = canvasRef.current?.getContext("2d");
        const source = cover(img).getContext("2d")?.getImageData(0, 0, W, H);
        if (!ctx || !source || cancelled) return;

        // Each frame samples one pixel per block into a tiny image on this
        // scratch canvas, then scales it up with nearest-neighbor — far cheaper
        // than a fillRect per block when the blocks get small.
        const scratch = document.createElement("canvas");
        scratch.width = W;
        scratch.height = H;
        const scratchCtx = scratch.getContext("2d");
        if (!scratchCtx) return;

        const pixelize = (pixelSize: number) => {
          if (pixelSize === 1) {
            ctx.putImageData(source, 0, 0);
            return;
          }
          const cols = Math.ceil(W / pixelSize);
          const rows = Math.ceil(H / pixelSize);
          const blocks = scratchCtx.createImageData(cols, rows);
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const from = (row * pixelSize * W + col * pixelSize) * 4;
              const to = (row * cols + col) * 4;
              blocks.data[to] = source.data[from];
              blocks.data[to + 1] = source.data[from + 1];
              blocks.data[to + 2] = source.data[from + 2];
              blocks.data[to + 3] = 255;
            }
          }
          scratchCtx.putImageData(blocks, 0, 0);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(scratch, 0, 0, cols, rows, 0, 0, cols * pixelSize, rows * pixelSize);
        };

        // The clock only advances while playing, so resuming picks up where it left off.
        let clock = 0;
        let prev = performance.now();
        let lastSize = NaN;

        const tick = (now: number) => {
          const dt = (now - prev) / 1000;
          prev = now;

          let pixelation: number;
          if (pausedRef.current) {
            pixelation = manualRef.current;
          } else {
            clock = (clock + dt) % LOOP;
            pixelation = pixelationAt(clock);
            manualRef.current = pixelation;
            if (rangeRef.current) rangeRef.current.value = String(pixelation);
          }

          const size = pixelSizeFor(pixelation);
          if (size !== lastSize) {
            lastSize = size;
            pixelize(size);
          }
          raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        /* Without the image the canvas keeps its navy background. */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ position: "relative", justifySelf: "center", width: "100%", maxWidth: CARD.maxWidth }}>
      <CrayonFill
        color={crayon.navy}
        radius={radius.xl}
        style={{ inset: NAVY_PANEL.inset, transform: `rotate(${NAVY_PANEL.tilt})` }}
      />
      <CrayonFill
        color={crayon.onNavyMuted}
        radius={radius.xl}
        style={{ inset: BLUE_PANEL.inset, transform: `rotate(${BLUE_PANEL.tilt})` }}
      />
      <CrayonBlob
        color={crayon.lantern}
        radius={BLOB_RADIUS.organic}
        style={{
          left: LANTERN_BLOB.left,
          top: LANTERN_BLOB.top,
          width: LANTERN_BLOB.width,
          aspectRatio: LANTERN_BLOB.aspectRatio,
          opacity: LANTERN_BLOB.opacity,
        }}
      />
      <CrayonBlob
        color={crayon.mint}
        radius={BLOB_RADIUS.organic}
        style={{
          left: MINT_BLOB.left,
          top: MINT_BLOB.top,
          width: MINT_BLOB.width,
          aspectRatio: MINT_BLOB.aspectRatio,
          opacity: MINT_BLOB.opacity,
        }}
      />
      

      <div
        className="br-sm"
        style={{
          position: "relative",
          background: crayon.paperRaised,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="mono-m2"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: space.smLg,
            padding: HEADER.padding,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: space.sm }}>
            <span
              aria-hidden
              style={{
                width: HEADER.dot,
                height: HEADER.dot,
                background: crayon.accentBlue,
                borderRadius: BLOB_RADIUS.dot,
                filter: CRAYON_FILTER,
              }}
            />
            pixelizer.ts
          </span>
        </div>

        <div
          aria-hidden
          style={{ position: "relative", height: RULE.height, background: crayon.ink, opacity: RULE.opacity, filter: CRAYON_FILTER }}
        />

        <div style={{ position: "relative", padding: `${CARD.inset} ${CARD.inset} 0` }}>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            aria-label="Painting by Lauren of glowing lanterns in deep blue, pixelized"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: CARD.canvasRatio,
              background: crayon.navyDeep,
              imageRendering: "pixelated",
              border: `${CARD.canvasBorder}px solid ${crayon.ink}`,
              borderRadius: radius.xs,
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          className="mono-m2"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: space.smLg,
            padding: `${space.smLg} ${CARD.inset}`,
          }}
        >
          <button
            type="button"
            onClick={() => pause(!paused)}
            aria-label={paused ? "Play animation" : "Pause animation"}
            style={{
              position: "relative",
              flex: "none",
              width: PLAY.width,
              height: PLAY.height,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: crayon.ink,
            }}
          >
            <span style={{ position: "relative", fontSize: PLAY.glyph}}>{paused ? "▶" : "❚❚"}</span>
          </button>
          <span style={{ flex: "none" }}>original</span>
          <input
            ref={rangeRef}
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={manualRef.current}
            onChange={(e) => {
              manualRef.current = Number(e.target.value);
              pause(true);
            }}
            aria-label="Pixelation level"
            style={{ flex: 1, minWidth: 0, accentColor: crayon.accentBlue, cursor: "pointer" }}
          />
          <span style={{ flex: "none" }}>pixelized</span>
        </div>
        <a href="#/nostalgia" className="pad-md justify-flex-end" >
            <Text className="bodyMedium-b6">
                Try the pixelizer yourself →
            </Text>
        </a>
      </div>
    </div>
  );
};
