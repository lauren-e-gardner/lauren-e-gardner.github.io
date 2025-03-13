import { useRef, useState, useEffect } from "react";
import { win7Palette } from "./Windows7Palette";
import { win95Palette } from "./Windows95Palette";
import { RGB, Palette} from "../components/types.ts";

const colorDistance = (c1: RGB, c2: RGB): number =>
  Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);

const closestColor = (color: RGB, palette: Palette): RGB =>
  palette.reduce((closest, current) =>
    colorDistance(color, current) < colorDistance(color, closest) ? current : closest
  );

export default function Pixelator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [palette, setPalette] = useState<Palette>(win7Palette);
  const [pixelation, setPixelation] = useState<number>(100);

  const [originalImage, setOriginalImage] = useState(() => {
    const img = new Image();
    img.src = "/Nostalgia/ex.png";
    return img;
  });

    useEffect(() => {
      if (originalImage.complete) {
        processImage(originalImage, palette, pixelation);        
        setImageLoaded(true);
      } else {
        originalImage.onload = () => {
          processImage(originalImage, palette, pixelation);          
          setImageLoaded(true);
        };
      }
    }, [palette, pixelation, originalImage]);

  // Process the image on canvas
  const processImage = (img: HTMLImageElement, selectedPalette: Palette, pixelSizeFactor: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fixedHeight = 500;
    const aspectRatio = img.width / img.height;
    const newWidth = fixedHeight * aspectRatio;

    canvas.width = newWidth;
    canvas.height = fixedHeight;
    const pixelSize = Math.floor(newWidth / pixelSizeFactor);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, newWidth, fixedHeight);

    for (let y = 0; y < fixedHeight; y += pixelSize) {
      for (let x = 0; x < newWidth; x += pixelSize) {
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const closest = closestColor({ r: imageData[0], g: imageData[1], b: imageData[2] }, selectedPalette);
        ctx.fillStyle = `rgb(${closest.r}, ${closest.g}, ${closest.b})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }

    setImageLoaded(true);
  };

  // Handle file upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img); // Replace the default image with the uploaded image
        processImage(img, palette, pixelation); // Reprocess the new image with selected pixelation and palette
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handle palette change
  const handlePaletteChange = (newPalette: Palette) => {
    setPalette(newPalette);
    if (originalImage) {
      processImage(originalImage, newPalette, pixelation);
    }
  };

  // Handle pixelation slider change
  const handlePixelationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPixelation = Number(event.target.value);
    setPixelation(newPixelation);
    if (originalImage) {
      processImage(originalImage, palette, newPixelation);
    }
  };

  return (
    <div className="w-[80vh] flex flex-col items-center justify-center p-4">
      <div className="border border-black shadow-md bg-[#c0c0c0] relative">
        <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-1">
          <span className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl font-bold">Pixelator - Windows 95</span>
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
              download="pixelized-image.png"
              className="text-black mt-4 block bg-[#c0c0c0] border-b-2 border-r-2 border-black px-3 py-1 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-center cursor-pointer shadow-inner active:shadow-none"
            >
              Download Image
            </a>
          )}
  
          <div className="mt-4 flex space-x-2">
            <button 
              onClick={() => handlePaletteChange(win7Palette)} 
              className="text-black bg-[#c0c0c0] border-b-2 border-r-2 border-black px-3 py-1 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl cursor-pointer shadow-inner active:border-2"
            >
              Windows 7 Palette
            </button>
            <button 
              onClick={() => handlePaletteChange(win95Palette)} 
              className="text-black bg-[#c0c0c0] border-b-2 border-r-2 border-black px-3 py-1 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl cursor-pointer shadow-inner active:border-2"
            >
              Windows 95 Palette
            </button>
          </div>
  
          <div className="mt-4">
            <label className="text-black text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl">Pixelation Level</label>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={pixelation} 
              onChange={handlePixelationChange} 
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
