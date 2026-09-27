import { CRAYON_FILTER, crayon, radius, space } from '../tokens/crayon'

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
        margin: `${space.lg} 0`,
        background: color,
        borderRadius: radius.sm,
        transform: `rotate(${rotate}deg)`,
        filter: CRAYON_FILTER,
      }}
    />
  )
}
