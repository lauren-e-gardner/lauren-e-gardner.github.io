import { CRAYON_FILTER, crayon, space } from '../tokens/crayon'

interface DividerProps {
  /** Crayon rule color. Defaults to ink. */
  color?: string;
  /** Degrees of tilt, so no two rules sit perfectly level. */
  rotate?: number;
  height?: number;
  opacity?: number;
  /** Space above and below the rule. */
  margin?: string;
}

/** The thin crayon rule between home page sections. */
export const Divider = ({
  color = crayon.ink,
  rotate = -0.3,
  height = 2,
  opacity = 0.3,
  margin = `${space.lg} 0`,
}: DividerProps) => {
  return (
    <div
      aria-hidden
      style={{
        height,
        margin,
        background: color,
        opacity,
        transform: `rotate(${rotate}deg)`,
        filter: CRAYON_FILTER,
      }}
    />
  )
}
