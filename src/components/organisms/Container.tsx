import React from 'react'
import { useDeviceType } from '../../hooks/useDeviceType';

interface ContainerProps {
    children?: any;
    className?: string;
}
export const Container: React.FC<ContainerProps> = ({
    children,
    className,
}) => {
    const deviceType = useDeviceType()
    const isMobile = deviceType === "mobile"
  return (
    <div 
        className={`${isMobile ? 'pad-left-md pad-right-md' : ''} ${className}`}
        style={{
            position: "relative",
            zIndex: 10,
            width: isMobile ? "100%" : 1032,
            maxWidth: isMobile ? "100%" : 1032,
            alignSelf: "center",
        }}
    >
        {children}
    </div>
  )
}