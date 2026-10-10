import { RGB, Palette } from "../../types.ts";

/* Image effects for the Pixelator window. Both draw the source image onto the
   canvas at a fixed height and snap every color to the chosen palette. */

const FIXED_HEIGHT = 500;

const colorDistance = (c1: RGB, c2: RGB): number =>
  Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);

const closestColor = (color: RGB, palette: Palette): RGB =>
  palette.reduce((closest, current) =>
    colorDistance(color, current) < colorDistance(color, closest) ? current : closest
  );

// Size the canvas to the image's aspect ratio and return its 2D context.
// Starts from solid black so transparent areas of a PNG come out black in both
// effects. Without it, dither's scaled-up copy is see-through there and the
// small working copy in the top-left corner shows through.
const prepareCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.width = FIXED_HEIGHT * (img.width / img.height);
  canvas.height = FIXED_HEIGHT;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return ctx;
};

// Flat blocks of the nearest palette color. Higher detail means smaller blocks.
export const pixelate = (canvas: HTMLCanvasElement, img: HTMLImageElement, palette: Palette, detail: number) => {
  const ctx = prepareCanvas(canvas, img);
  if (!ctx) return;

  const { width, height } = canvas;
  const pixelSize = Math.floor(width / detail);
  ctx.drawImage(img, 0, 0, width, height);

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      const closest = closestColor({ r: imageData[0], g: imageData[1], b: imageData[2] }, palette);
      ctx.fillStyle = `rgb(${closest.r}, ${closest.g}, ${closest.b})`;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }
};

const floydSteinbergDither = (imageData: ImageData, palette: Palette): ImageData => {
  const { width, height, data } = imageData;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const originalColor = { r: data[index], g: data[index + 1], b: data[index + 2] };
      const newColor = closestColor(originalColor, palette);

      data[index] = newColor.r;
      data[index + 1] = newColor.g;
      data[index + 2] = newColor.b;

      const errR = originalColor.r - newColor.r;
      const errG = originalColor.g - newColor.g;
      const errB = originalColor.b - newColor.b;

      const distributeError = (dx: number, dy: number, factor: number) => {
        const newIndex = ((y + dy) * width + (x + dx)) * 4;
        if (newIndex >= 0 && newIndex < data.length) {
          data[newIndex] = Math.min(255, Math.max(0, data[newIndex] + errR * factor));
          data[newIndex + 1] = Math.min(255, Math.max(0, data[newIndex + 1] + errG * factor));
          data[newIndex + 2] = Math.min(255, Math.max(0, data[newIndex + 2] + errB * factor));
        }
      };

      distributeError(1, 0, 7 / 16);
      distributeError(-1, 1, 3 / 16);
      distributeError(0, 1, 5 / 16);
      distributeError(1, 1, 1 / 16);
    }
  }
  return imageData;
};

// Floyd-Steinberg dithering on a downscaled copy, then scaled back up so each
// dithered pixel is pixelSize screen pixels wide.
export const dither = (canvas: HTMLCanvasElement, img: HTMLImageElement, palette: Palette, pixelSize: number) => {
  const ctx = prepareCanvas(canvas, img);
  if (!ctx) return;

  const { width, height } = canvas;
  const smallWidth = width / pixelSize;
  const smallHeight = height / pixelSize;

  ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
  const imageData = ctx.getImageData(0, 0, smallWidth, smallHeight);
  ctx.putImageData(floydSteinbergDither(imageData, palette), 0, 0);
  ctx.drawImage(canvas, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
};
