import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Fruit from "./Fruit/Fruit";
import Fruit2 from "./Fruit2/Fruit2";
import Fruit3 from "./Fruit3/Fruit3";
import Poison from "./Poison/Poison";

export type ThreeSceneVariant = "fruit" | "fruit2" | "fruit3" | "poison";

/** Each variant's object class plus the uniform scale it is displayed at. */
const VARIANTS: Record<
  ThreeSceneVariant,
  { create: () => THREE.Group & { update: (delta: number) => void }; scale: number }
> = {
  fruit: { create: () => new Fruit(), scale: 1 },
  fruit2: { create: () => new Fruit2(), scale: 1 },
  fruit3: { create: () => new Fruit3(), scale: 1 },
  poison: { create: () => new Poison(), scale: 1.5 },
};

interface ThreeSceneProps {
  variant?: ThreeSceneVariant;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ variant = "fruit" }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current; // Store ref in a variable

    // Scene setup
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffaa55, 1, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    // Add the variant's object to the scene
    const { create, scale } = VARIANTS[variant];
    const subject = create();
    subject.scale.set(scale, scale, scale);
    scene.add(subject);

    subject.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    let previousTime = 0;
    const FPS = 60;
    const frameTime = 500 / FPS;
    let lastFrameTime = 0;

    const timeScale = 0.5;

    let frameId = 0;

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime >= frameTime) {
        lastFrameTime = currentTime;

        const deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

        const slowedDeltaTime = deltaTime * timeScale;
        subject.update(slowedDeltaTime);

        controls.update();
        renderer.render(scene, camera);
      }

      frameId = requestAnimationFrame(animate);
    };

    animate(0);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    });

    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement); // Use `mount` instead of `mountRef.current`
      controls.dispose();
      renderer.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} className="w-full h-full"></div>;
};

export default ThreeScene;
export { ThreeScene };
