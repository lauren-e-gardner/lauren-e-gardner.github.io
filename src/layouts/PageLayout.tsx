import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <div className="w95-desktop">
      
      {/* Top Navigation Bar */}
      <nav className="w95-menubar">
          
        {/* Back Button */}
        <div 
          className="w95-button"
          onClick={() => handleNavigation("/")}
        >
          Back
        </div>

      </nav>
      
      {children}

      {/* Windows 95 Style Bottom Bar */}
      <div className="w95-taskbar">
        
        {/* Start Button */}
        <button className="w95-start">
          <img src="/Nostalgia/Start.jpg" alt="Start" />
        </button>

        {/* Time Display */}
        <div className="w95-inset w95-clock">
          {time}
        </div>
        
      </div>
    </div>
  );
};

export default PageLayout;
