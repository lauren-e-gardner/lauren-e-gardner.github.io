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
    <div className="bg-[#008080] relative overflow-auto min-h-screen pb-10">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-[#c0c0c0] text-white border-b-2 border-r-2 border-[#000000] shadow-lg z-50">
        <div className="flex justify-between items-center px-4 py-1">
          
          {/* Back Button */}
          <div 
            className="px-3 py-1 text-black border-b-2 border-r-2 border-black cursor-pointer flex items-center justify-center z-50"
            onClick={() => handleNavigation("/")}
          >
            Back
          </div>

        </div>
      </nav>
      
      {children}

      {/* Windows 95 Style Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#c0c0c0] border-t-2 border-[#000000] flex justify-between items-center px-4 h-11 z-50">
        
        {/* Start Button */}
        <button className="mt-1 border-2 border-[#000000] bg-[#c0c0c0] z-50">
          <img src="/Nostalgia/Start.jpg" alt="Start" className="h-8" />
        </button>

        {/* Time Display */}
        <div className="px-3 w-30 py-1 border-l-2 border-t-2 border-[#000000] bg-[#c0c0c0] text-[#000000] z-50">
          {time}
        </div>
        
      </div>
    </div>
  );
};

export default PageLayout;
