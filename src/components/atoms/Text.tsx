import React from 'react'

interface TextProps {
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Text = ( { className, textAlign, children, style } : TextProps ) => {
  return (
    <div className={className} style={{ textAlign, ...style }}>
      {children}
    </div>
  )
}