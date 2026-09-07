import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'desktop';

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    // Define your breakpoints matching your CSS/Tailwind configuration
    const mobileQuery = window.matchMedia('(max-width: 1031px)');

    const handleResize = () => {
      if (mobileQuery.matches) {
        setDeviceType('mobile');
      } else {
        setDeviceType('desktop');
      }
    };

    // Run once on mount to get initial device type
    handleResize();

    // Listen for changes
    mobileQuery.addEventListener('change', handleResize);

    // Clean up listeners
    return () => {
      mobileQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return deviceType;
}