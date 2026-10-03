import type { CodeToken } from "../components/tokens/crayon";

/** A run of text in one syntax color. */
type CodeRun = [text: string, token: CodeToken];

/** The heart of the pixelizer, shown in the code block under the hero canvas. One array per line. */
export const pixelizerSnippet: CodeRun[][] = [
  [["// fill each block with its top-left pixel", "comment"]],
  [["for ", "keyword"], ["(", "text"], ["let ", "keyword"], ["y = ", "text"], ["0", "string"], ["; y < height; y += pixelSize) {", "text"]],
  [["  for ", "keyword"], ["(", "text"], ["let ", "keyword"], ["x = ", "text"], ["0", "string"], ["; x < width; x += pixelSize) {", "text"]],
  [["    const ", "keyword"], ["[r, g, b] = ctx.", "text"], ["getImageData", "fn"], ["(x, y, ", "text"], ["1", "string"], [", ", "text"], ["1", "string"], [").data;", "text"]],
  [["    ctx.fillStyle = ", "text"], ["`rgb(${r}, ${g}, ${b})`", "string"], [";", "text"]],
  [["    ctx.", "text"], ["fillRect", "fn"], ["(x, y, pixelSize, pixelSize);", "text"]],
  [["  }", "text"]],
  [["}", "text"]],
];
