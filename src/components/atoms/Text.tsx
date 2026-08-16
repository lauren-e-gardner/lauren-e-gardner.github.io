import React from 'react'

interface TextProps {
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export const Text = ( { className, textAlign, children } : TextProps ) => {
  return (
    <div className={className} style={{ textAlign }}>
      {children}
    </div>
  )
}