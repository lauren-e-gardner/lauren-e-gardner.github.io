import { ALL_ICONS } from './Icons';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon = ({ 
  name, 
  size = 24, 
  color, 
}: IconProps) => {
  const iconSvg: string | undefined = (ALL_ICONS as Record<string, string>)[name];

  if (!iconSvg) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }
  
  const recoloredSvg = iconSvg
    .replace(/fill="[^"]*"/g, '') 
    .replace('<svg', `<svg fill="${color}"`);

  const encodedSvg = encodeURIComponent(recoloredSvg)
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/');

  return (
    <img src={`data:image/svg+xml,${encodedSvg}`} width={size} height={size}/>
  )
}

export default Icon