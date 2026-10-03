import { useNavigate } from 'react-router-dom';

/**
 * The simulator is a standalone three.js r102 app (global THREE, dat.gui), so it
 * lives in public/fabric-simulator and runs in an iframe rather than sharing the
 * site's three.js version.
 */
const SIM_SRC = `${import.meta.env.BASE_URL}fabric-simulator/index.html`;

const FabricSimulator = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#cce0ff]">
      <button
        onClick={() => navigate(-1)}
        className="text-md xl:text-xl 2xl:text-3xl absolute top-4 left-4 px-4 py-2 text-white bg-black/60 hover:bg-black/75 rounded-lg z-10"
      >
        Back
      </button>

      <iframe
        src={SIM_SRC}
        title="Fabric Simulator demo"
        className="w-full h-full border-0 block"
        // Focus the frame so the arrow-key pokes work without an extra click
        onLoad={(e) => e.currentTarget.focus()}
      />

      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl text-center text-xs xl:text-sm 2xl:text-lg text-white bg-black/60 rounded-lg px-4 py-2">
        Drag to orbit · Scroll to zoom · Hover the cloth and press the arrow keys to poke it ·
        Change pinning, forces and objects in the panel on the right
      </p>
    </div>
  );
};

export default FabricSimulator;
