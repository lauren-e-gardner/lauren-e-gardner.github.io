import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Pixelator from './Pixelator';
import PageLayout from '../../layouts/PageLayout';
import { DraggableProps } from '../../types';
import BootUp from './BootUp'; // Import BootUp component

// Height of the fixed menu bar and taskbar ($taskbar-height, --space-2xl), kept
// clear when centering a window.
const BAR_HEIGHT = 48;

// Matches $bp-md: below this the window sits in the page flow instead of floating.
const MOBILE_QUERY = '(max-width: 767px)';

const Draggable: React.FC<DraggableProps> = ({ children, className = '', disabled = false }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const offset = useRef<{ x: number; y: number } | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  // Start centered on screen, between the menu bar and the taskbar. Runs before
  // paint so the window never flashes in the corner, and again whenever the
  // window starts floating after a resize up from mobile.
  useLayoutEffect(() => {
    const el = windowRef.current;
    if (!el || disabled) return;
    const usableHeight = window.innerHeight - 2 * BAR_HEIGHT;
    setPosition({
      x: Math.max(0, (window.innerWidth - el.offsetWidth) / 2),
      y: BAR_HEIGHT + Math.max(0, (usableHeight - el.offsetHeight) / 2),
    });
  }, [disabled]);

  // Pointer events cover mouse, pen and touch. Drags start on the title bar,
  // and capturing the pointer keeps them going when they outrun it.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!(e.target as Element).closest('.w95-titlebar')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!offset.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = () => {
    offset.current = null;
  };

  // Same element either way, so crossing the breakpoint doesn't remount the
  // app inside and lose its image and settings.
  return (
    <div
      ref={windowRef}
      className={disabled ? className : `${className} w95-floating`}
      style={disabled ? undefined : { position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
      onPointerDown={disabled ? undefined : handlePointerDown}
      onPointerMove={disabled ? undefined : handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
};

const Nostalgia = () => {
  const [showBootUp, setShowBootUp] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBootUp(false);
    }, 3000); // Hide boot up after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      {showBootUp && <BootUp />} {/* Show the BootUp screen on page load */}
      <div className="w95-workspace">
        <Draggable className="w95-draggable" disabled={isMobile}>
          <Pixelator />
        </Draggable>
      </div>
    </PageLayout>
  );
};

export default Nostalgia;
