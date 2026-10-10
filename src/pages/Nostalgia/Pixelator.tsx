import { useRef, useState, useEffect } from "react";
import { win7Palette } from "./Windows7Palette";
import { win95Palette } from "./Windows95Palette";
import { Palette } from "../../types.ts";
import { pixelate, dither } from "./effects";

type Effect = "pixelate" | "dither";

// Each effect drives the Detail slider over its own range. Dither detail maps
// to a pixel size of 11 - detail, so 10 is one screen pixel per dither pixel.
const sliderConfig = {
  pixelate: { min: 10, max: 200, ticks: 11 },
  dither: { min: 1, max: 10, ticks: 10 },
};

export default function Pixelator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("ex.png");
  const [effect, setEffect] = useState<Effect>("pixelate");
  const [palette, setPalette] = useState<Palette>(win7Palette);
  const [detail, setDetail] = useState<Record<Effect, number>>({ pixelate: 100, dither: 6 });

  const [originalImage, setOriginalImage] = useState(() => {
    const img = new Image();
    img.src = "/Nostalgia/ex.png";
    return img;
  });

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (effect === "pixelate") {
        pixelate(canvas, originalImage, palette, detail.pixelate);
      } else {
        dither(canvas, originalImage, palette, 11 - detail.dither);
      }
    };

    if (originalImage.complete) {
      render();
    } else {
      originalImage.onload = render;
    }
  }, [effect, palette, detail, originalImage]);

  // Handle file upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => setOriginalImage(img); // The effect above redraws with the new image
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Grab the canvas at click time so the download always matches what's shown.
  const handleSave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (canvasRef.current) {
      event.currentTarget.href = canvasRef.current.toDataURL("image/png");
    }
  };

  const isWin95Palette = palette === win95Palette;
  const slider = sliderConfig[effect];

  return (
    <div className="w95-app col align-center justify-center pad-md">
      <div className="w95-window">
        <div className="w95-titlebar">
          <span className="ui-u4 weight-bold">Pixelator</span>
          <div className="row gap-xs">
            <img src="/Nostalgia/Buttons.png" alt="Close" className="w95-titlebar-icon" />
          </div>
        </div>

        <div className="w95-window-body col gap-sm-lg">
          <div className="row align-center gap-sm">
            <span className="ui-u4">Image:</span>
            <div className="w95-textbox ui-u4">{fileName}</div>
            <button onClick={() => fileInputRef.current?.click()} className="w95-button ui-u4">
              Browse...
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              hidden
            />
          </div>

          <div className="w95-inset w95-well w95-well-dark">
            <canvas ref={canvasRef} className="w95-canvas"></canvas>
          </div>

          <div className="row gap-sm-lg">
            <fieldset className="w95-groupbox w95-groupbox-grow">
              <legend className="ui-u4">Effect</legend>
              <div className="col gap-xs">
                <label className="w95-radio ui-u4">
                  <input
                    type="radio"
                    name="pixelator-effect"
                    checked={effect === "pixelate"}
                    onChange={() => setEffect("pixelate")}
                  />
                  <span>Pixelate</span>
                </label>
                <label className="w95-radio ui-u4">
                  <input
                    type="radio"
                    name="pixelator-effect"
                    checked={effect === "dither"}
                    onChange={() => setEffect("dither")}
                  />
                  <span>Dither</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="w95-groupbox w95-groupbox-grow">
              <legend className="ui-u4">Palette</legend>
              <div className="col gap-xs">
                <label className="w95-radio ui-u4">
                  <input
                    type="radio"
                    name="pixelator-palette"
                    checked={!isWin95Palette}
                    onChange={() => setPalette(win7Palette)}
                  />
                  <span>Windows 7</span>
                </label>
                <label className="w95-radio ui-u4">
                  <input
                    type="radio"
                    name="pixelator-palette"
                    checked={isWin95Palette}
                    onChange={() => setPalette(win95Palette)}
                  />
                  <span>Windows 95</span>
                </label>
              </div>
            </fieldset>
          </div>

          <fieldset className="w95-groupbox">
            <legend className="ui-u4">{effect === "pixelate" ? "Pixelation" : "Dithering"}</legend>
            <div className="row align-flex-start gap-sm">
              <label htmlFor="pixelator-detail" className="ui-u4">Detail:</label>
              <span className="ui-u4">Low</span>
              <div className="w95-slider">
                <input
                  id="pixelator-detail"
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  value={detail[effect]}
                  onChange={(e) => setDetail({ ...detail, [effect]: Number(e.target.value) })}
                  className="w95-slider-input"
                />
                <div className="w95-slider-ticks" aria-hidden="true">
                  {Array.from({ length: slider.ticks }, (_, i) => <span key={i} />)}
                </div>
              </div>
              <span className="ui-u4">High</span>
            </div>
          </fieldset>

          <div className="row justify-flex-end">
            <a
              href="#"
              onClick={handleSave}
              download={effect === "pixelate" ? "pixelized-image.png" : "dithered-image.png"}
              className="w95-button ui-u4"
            >
              Save As...
            </a>
          </div>
        </div>

        <div className="w95-statusbar ui-u4">
          <div className="w95-statusbar-pane">
            {effect === "pixelate" ? "Pixelate" : "Dither"}, {isWin95Palette ? "Windows 95" : "Windows 7"} palette
          </div>
          <div className="w95-statusbar-pane">Detail: {detail[effect]}</div>
        </div>
      </div>
    </div>
  );
}
