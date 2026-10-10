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
      <div className="w95-boot">
        <img
          src="/Nostalgia/WindowsLogo.png"
          alt="Windows 95 Logo"
          className="w95-boot-logo" 
        />
        <div className="ui-u2">
          <p>Booting Up {dots}</p>
        </div>
      </div>
    )
  );
};

export default BootUp;
