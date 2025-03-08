import React, { useEffect, useState } from 'react';

const BootUp: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Simulate the boot up sequence
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 3000); // Boot animation lasts for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Cycle through dots every 500ms
    const dotTimer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === '...') {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);

    // Clear the interval when the booting ends
    return () => clearInterval(dotTimer);
  }, []);

  return (
    isBooting && (
      <div className="absolute top-0 left-0 w-full h-full bg-[#008080] flex flex-col justify-center items-center z-50">
        <img
          src="/Nostalgia/WindowsLogo.png"
          alt="Windows 95 Logo"
          className="h-50 mx-auto mb-4" 
        />
        <div className="text-black text-xl mt-4">
          <p>Booting Up {dots}</p>
        </div>
      </div>
    )
  );
};

export default BootUp;
