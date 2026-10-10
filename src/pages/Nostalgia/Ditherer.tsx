"use client";

import { useRef, useState, useEffect } from "react";
import { win7Palette } from "./Windows7Palette";
import { win95Palette } from "./Windows95Palette";
import { RGB, Palette, ImageDataType, HTMLCanvas, HTMLInputEvent, HTMLImage } from "../../types.ts";


const colorDistance = (c1: RGB, c2: RGB): number =>
  Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);

const closestColor = (color: RGB, palette: Palette): RGB =>
  palette.reduce<RGB>(
    (closest, current) =>
      colorDistance(color, current) < colorDistance(color, closest) ? current : closest,
    palette[0] // Ensure there's always an initial color to compare
  );

const floydSteinbergDither = (imageData: ImageDataType, selectedPalette: Palette): ImageDataType => {
  const { width, height, data } = imageData;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const originalColor = { r: data[index], g: data[index + 1], b: data[index + 2] };
      const newColor = closestColor(originalColor, selectedPalette);

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

const ditherImage = (img: HTMLImage, selectedPalette: Palette, canvas: HTMLCanvas, pixelSize: number) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;


  const fixedHeight = 500;
  const aspectRatio = img.width / img.height;
  const newWidth = fixedHeight * aspectRatio;

  canvas.width = newWidth;
  canvas.height = fixedHeight;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, newWidth / pixelSize, fixedHeight / pixelSize);
  const imageData = ctx.getImageData(0, 0, newWidth / pixelSize, fixedHeight / pixelSize);
  const ditheredData = floydSteinbergDither(imageData, selectedPalette);
  ctx.putImageData(ditheredData, 0, 0);
  ctx.drawImage(canvas, 0, 0, newWidth / pixelSize, fixedHeight / pixelSize, 0, 0, newWidth, fixedHeight);
};

export default function Ditherer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const downloadRef = useRef(null);
  const [palette, setPalette] = useState(win7Palette);
  const [pixelSize, setPixelSize] = useState(5);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [originalImage, setOriginalImage] = useState(() => {
    const img = new Image();
    img.src = "/Nostalgia/ex.png";
    return img;
  });
  
  useEffect(() => {
    if (originalImage.complete) {
      ditherImage(originalImage, palette, canvasRef.current, pixelSize);
      setImageLoaded(true);
    } else {
      originalImage.onload = () => {
        ditherImage(originalImage, palette, canvasRef.current, pixelSize);
        setImageLoaded(true);
      };
    }
  }, [palette, pixelSize, originalImage]);
  

  const handleFileSelect = (event: HTMLInputEvent) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        ditherImage(img, palette, canvasRef.current, pixelSize);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w95-app col align-center justify-center pad-md">
      <div className="w95-window">
        <div className="w95-titlebar">
          <span className="ui-u3 weight-bold">Ditherer - Windows 95</span>
          <div className="row gap-xs">
            <img src="/Nostalgia/Buttons.png" alt="Close" className="w95-titlebar-icon" />
          </div>
        </div>

        <div className="pad-md">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileSelect} 
            className="w95-field w95-inset pad-xs mono-m2 mr-bottom-md"
          />
          
          <div className="w95-inset w95-well">
            <canvas ref={canvasRef} className="w95-canvas"></canvas>
          </div>

          {imageLoaded && (
            <a 
              ref={downloadRef} 
              href={canvasRef.current?.toDataURL("image/png")} 
              download="dithered-image.png"
              className="w95-button w95-button-block ui-u3 mr-top-md"
            >
              Download Image
            </a>
          )}

          <div className="row gap-sm mr-top-md">
            <button 
              onClick={() => setPalette(win7Palette)} 
              className="w95-button ui-u3"
            >
              Windows 7 Palette
            </button>
            <button 
              onClick={() => setPalette(win95Palette)} 
              className="w95-button ui-u3"
            >
              Windows 95 Palette
            </button>
          </div>

          <div className="mr-top-md">
            <label className="ui-u3">Pixel Size</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={pixelSize} 
              onChange={(e) => setPixelSize(Number(e.target.value))} 
              className="w95-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
