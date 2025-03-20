import { useState, useEffect } from 'react';
import ThreeScene from '../components/ThreeJS/ThreeScene';
import ThreeScene2 from '../components/ThreeJS/ThreeScene2';
import ThreeScene3 from '../components/ThreeJS/ThreeScene3';
import ThreeScene4 from '../components/ThreeJS/ThreeScene4';
import { vertexShaders } from './VertexText';
import { useNavigate } from 'react-router-dom';

const SpaceOtterssey = () => {
  const [activeScene, setActiveScene] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check the browser's color scheme preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Add or remove the 'dark' class based on the browser's color scheme
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for changes to the color scheme in the browser (if the user manually changes it)
    const mediaQueryListener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Add the event listener for color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', mediaQueryListener);

    // Cleanup the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', mediaQueryListener);
    };
  }, []);

  const renderScene = () => {
    switch (activeScene) {
        case 1:
            return <ThreeScene />;
        case 2:
            return <ThreeScene2 />;
        case 3:
            return <ThreeScene3 />;
        case 4:
            return <ThreeScene4 />;
        default:
            return <ThreeScene />;
    }
  };

  return (
    <div className="w-full h-screen flex relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-md xl:text-xl 2xl:text-3xl absolute top-4 left-4 px-4 py-2 text-white rounded-lg"
      >
        Back
      </button>

      {/* Left Half - Three.js Scene */}
      <div className="w-1/2 aspect-[1/1] flex items-center justify-center bg-black">
        <div className="w-[100%] aspect-[1/1] ">{renderScene()}</div>
      </div>

      {/* Right Half - Vertex GLSL Placeholder */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-4 xl:p-6 2xl:p-10">
        <h2 className="text-2xl xl:text-4xl 2xl:text-6xl font-bold mb-4 xl:mb-6 2xl:mb-10">Vertex Shader Code</h2>
        <pre className="text-md xl:text-xl 2xl:text-3xl border p-4 xl:p-6 2xl:p-10 rounded-lg w-full text-sm overflow-auto">
          {vertexShaders[activeScene]}
        </pre>

        {/* Scene Selection Buttons */}
        <div className="text-md xl:text-xl 2xl:text-3xl mt-6 flex space-x-4">
          <button
            onClick={() => setActiveScene(1)}
            className={`px-4 py-2 border rounded-md ${activeScene === 1 ? 'bg-[#1C1E25] text-[#E3E1DA] dark:bg-[#E3E1DA] dark:text-[#1C1E25]' : 'bg-transparent'}`}
          >
            Object 1
          </button>
          <button
            onClick={() => setActiveScene(2)}
            className={`px-4 py-2 border rounded-md ${activeScene === 2 ? 'bg-[#1C1E25] text-[#E3E1DA] dark:bg-[#E3E1DA] dark:text-[#1C1E25]' : 'bg-transparent'}`}
          >
            Object 2
          </button>
          <button
            onClick={() => setActiveScene(3)}
            className={`px-4 py-2 border rounded-md ${activeScene === 3 ? 'bg-[#1C1E25] text-[#E3E1DA] dark:bg-[#E3E1DA] dark:text-[#1C1E25]' : 'bg-transparent'}`}
          >
            Object 3
          </button>
          <button
            onClick={() => setActiveScene(4)}
            className={`px-4 py-2 border rounded-md ${activeScene === 4 ? 'bg-[#1C1E25] text-[#E3E1DA] dark:bg-[#E3E1DA] dark:text-[#1C1E25]' : 'bg-transparent'}`}
          >
            Object 4
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceOtterssey;
