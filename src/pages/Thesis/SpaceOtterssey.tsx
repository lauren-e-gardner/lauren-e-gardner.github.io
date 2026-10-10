import { useState } from 'react';
import ThreeScene from '../../components/organisms/ThreeScene/ThreeScene';
import { vertexShaders } from './VertexText';
import { useNavigate } from 'react-router-dom';

const SpaceOtterssey = () => {
  const [activeScene, setActiveScene] = useState<number>(1);
  const navigate = useNavigate();

  const renderScene = () => {
    switch (activeScene) {
      case 1:
        return <ThreeScene variant="fruit" />;
      case 2:
        return <ThreeScene variant="fruit2" />;
      case 3:
        return <ThreeScene variant="fruit3" />;
      case 4:
        return <ThreeScene variant="poison" />;
      default:
        return <ThreeScene variant="fruit" />;
    }
  };

  const tabClass = (scene: number) =>
    activeScene === scene ? 'demo-tab bg-dark text-light' : 'demo-tab';

  return (
    <div className="demo-page demo-split">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="demo-back ui-u2"
      >
        Back
      </button>

      {/* Left Half - Three.js Scene */}
      <div className="demo-stage">
        <div className="demo-stage-view">{renderScene()}</div>
      </div>

      {/* Right Half - Vertex GLSL Placeholder */}
      <div className="demo-pane">
        <h2 className="demo-heading ui-u1 weight-bold">Vertex Shader Code</h2>
        <pre className="demo-code ui-u2">
          {vertexShaders[activeScene]}
        </pre>

        {/* Scene Selection Buttons */}
        <div className="demo-tabs ui-u2">
          <button
            onClick={() => setActiveScene(1)}
            className={tabClass(1)}
          >
            Object 1
          </button>
          <button
            onClick={() => setActiveScene(2)}
            className={tabClass(2)}
          >
            Object 2
          </button>
          <button
            onClick={() => setActiveScene(3)}
            className={tabClass(3)}
          >
            Object 3
          </button>
          <button
            onClick={() => setActiveScene(4)}
            className={tabClass(4)}
          >
            Object 4
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceOtterssey;
