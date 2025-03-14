import React, { useState, useRef, useEffect } from 'react';
import Pixelator from './Pixelator';
import Ditherer from './Ditherer';
import PageLayout from '../../layouts/PageLayout';
import { DraggableProps } from '../components/types';
import BootUp from './BootUp'; // Import BootUp component

const Draggable: React.FC<DraggableProps> = ({ children, className = '', startX, startY }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: startX, y: startY });
  const isDragging = useRef<boolean>(false);
  const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current || !dragRef.current.contains(e.target as Node)) return;
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={dragRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 cursor-grab active:cursor-grabbing p-2"
        style={{ width: '100%', height: '60px', backgroundColor: 'transparent', zIndex: 10 }}
        onMouseDown={handleMouseDown}
      ></div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const Nostalgia = () => {
  const [showBootUp, setShowBootUp] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBootUp(false);
    }, 3000); // Hide boot up after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      {showBootUp && <BootUp />} {/* Show the BootUp screen on page load */}
      <div className="flex flex-wrap items-center justify-center w-full h-full relative gap-4 p-4">
        {/* Left Half - Pixelator */}
        <Draggable className="flex-1 max-w-[45%] w-full" startX={window.innerWidth/40} startY={window.innerHeight/20}>
          <Pixelator />
        </Draggable>
        {/* Right Half - Ditherer */}
        <Draggable className="flex-1 max-w-[45%] w-full" startX={window.innerWidth / 2 + 50} startY={window.innerHeight/20}>
          <Ditherer />
        </Draggable>
      </div>
    </PageLayout>
  );
};

export default Nostalgia;
