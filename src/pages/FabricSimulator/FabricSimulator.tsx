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
    <div className="demo-page bg-fabric-sky">
      <button
        onClick={() => navigate(-1)}
        className="demo-back ui-u2"
      >
        Back
      </button>

      <iframe
        src={SIM_SRC}
        title="Fabric Simulator demo"
        className="fill"
        // Focus the frame so the arrow-key pokes work without an extra click
        onLoad={(e) => e.currentTarget.focus()}
      />

      <p className="demo-caption ui-u4">
        Drag to orbit · Scroll to zoom · Hover the cloth and press the arrow keys to poke it ·
        Change pinning, forces and objects in the panel on the right
      </p>
    </div>
  );
};

export default FabricSimulator;
