import React, { useState, useEffect } from 'react';
import Home from './Home';
import NavBar from './NavBar';
import Loading from './Loading';

const SkillsHub: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
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
