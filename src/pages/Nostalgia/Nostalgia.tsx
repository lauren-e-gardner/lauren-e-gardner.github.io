import React, { useState, useRef, useEffect } from 'react';
import Pixelator from './Pixelator';
import Ditherer from './Ditherer';
import PageLayout from '../../layouts/PageLayout';
import { DraggableProps } from '../../types';
import BootUp from './BootUp'; // Import BootUp component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


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
      className={className}
      style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={dragRef}
        className="w95-drag-handle"
        onMouseDown={handleMouseDown}
      ></div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const Nostalgia = () => {
  const [showBootUp, setShowBootUp] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect to home


  useEffect(() => {
    // Set the isMobile state based on the screen width
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkIfMobile();

    // Listen for window resize events to update isMobile state
    window.addEventListener('resize', checkIfMobile);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
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
      {isMobile && (
        <div className="w95-overlay ui-u2">
          <div className="w95-alert">
            <div>Mobile Not Supported</div>
            {/* Add a button that redirects to the home page */}
            <button
              onClick={() => navigate('/')} // Navigate to home page
              className="w95-alert-button"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
      <div className="flex-container w95-workspace pad-md">
        {/* Left Half - Pixelator */}
        <Draggable className="w95-draggable" startX={window.innerWidth/40} startY={window.innerHeight/20}>
          <Pixelator />
        </Draggable>
        {/* Right Half - Ditherer */}
        <Draggable className="w95-draggable" startX={window.innerWidth / 2 + 50} startY={window.innerHeight/20}>
          <Ditherer />
        </Draggable>
      </div>
    </PageLayout>
  );
};

export default Nostalgia;
