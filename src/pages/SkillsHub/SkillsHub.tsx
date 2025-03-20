import React, { useState, useEffect } from 'react';
import Home from './Home';
import NavBar from './NavBar';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const SkillsHub: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
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
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  // Simulate loading for 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
        {isMobile && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white text-xl z-50">
          <div className="bg-red-500 p-4 rounded-lg text-center">
            <div>Mobile Not Supported</div>
            {/* Add a button that redirects to the home page */}
            <button
              onClick={() => navigate('/')} // Navigate to home page
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
      <NavBar>
        <div className="flex justify-center w-full">
          {loading ? (
            <div className="absolute inset-0 w-full h-full flex justify-center">
              <Loading />
            </div>
          ) : (
            <Home />
          )}
        </div>
      </NavBar>
    </div>
  );
};

export default SkillsHub;
