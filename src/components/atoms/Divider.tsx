import { CRAYON_FILTER, crayon } from '../tokens/crayon'

interface DividerProps {
  /** Crayon bar color. Defaults to yellow, the first divider in the page order. */
  color?: string;
  /** Degrees of tilt, so no two bars sit perfectly level. */
  rotate?: number;
  height?: number;
}

export const Divider = ({ color = crayon.yellow, rotate = -0.6, height = 9 }: DividerProps) => {
  return (
    <div
      aria-hidden
      style={{
        height,
        margin: "24px 0",
        background: color,
        borderRadius: 6,
        transform: `rotate(${rotate}deg)`,
        filter: CRAYON_FILTER,
      }}
    />
  )
}
