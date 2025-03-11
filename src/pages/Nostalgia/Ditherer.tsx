"use client";

import { useRef, useState, useEffect } from "react";
import { win7Palette } from "./Windows7Palette";
import { win95Palette } from "./Windows95Palette";
import { RGB, Palette, ImageDataType, HTMLCanvas, HTMLInputEvent, HTMLImage } from "../components/types.ts";


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
    <div className="w-[80vh] flex flex-col items-center justify-center p-4">
      <div className="border border-black shadow-md bg-[#c0c0c0] relative">
        <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-1">
          <span className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl font-bold">Ditherer - Windows 95</span>
          <div className="flex space-x-1">
            <img src="/Nostalgia/Buttons.png" alt="Close" className="h-6 cursor-pointer" />
          </div>
        </div>

        <div className="p-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileSelect} 
            className="w-full border-black border-t-2 border-l-2 p-1 text-xs text-[#000000] font-mono cursor-pointer mb-4"
          />
          
          <div className="flex items-center justify-center border-t-2 border-l-2 border-black bg-[#fffbf0] p-2">
            <canvas ref={canvasRef} className="h-[40vh]"></canvas>
          </div>

          {imageLoaded && (
            <a 
              ref={downloadRef} 
              href={canvasRef.current?.toDataURL("image/png")} 
              download="dithered-image.png"
              className="text-black mt-4 block bg-[#c0c0c0] border-b-2 border-r-2 border-black px-3 py-1 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-center cursor-pointer shadow-inner active:shadow-none"
            >
              Download Image
            </a>
          )}

          <div className="mt-4 flex space-x-2">
            <button 
              onClick={() => setPalette(win7Palette)} 
              className="text-black bg-[#c0c0c0] border-b-2 border-r-2 border-black px-3 py-1 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl cursor-pointer shadow-inner active:border-2"
            >
              Windows 7 Palette
            </button>
            <button 
              onClick={() => setPalette(win95Palette)} 
              className="text-black bg-[#c0c0c0] border-b-2 border-r-2 border-black px-3 py-1 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl cursor-pointer shadow-inner active:border-2"
            >
              Windows 95 Palette
            </button>
          </div>

          <div className="mt-4">
            <label className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl">Pixel Size</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={pixelSize} 
              onChange={(e) => setPixelSize(Number(e.target.value))} 
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
