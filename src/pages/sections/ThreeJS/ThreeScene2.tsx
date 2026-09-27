import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Fruit2 from "./Fruit2/Fruit2";

const ThreeScene: React.FC = () => {
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
  
    // Add Fruit object to the scene
    const fruit = new Fruit2();
    fruit.scale.set(1, 1, 1);
    scene.add(fruit);
  
    fruit.traverse((child) => {
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
  
    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime >= frameTime) {
        lastFrameTime = currentTime;
  
        const deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;
  
        const slowedDeltaTime = deltaTime * timeScale;
        fruit.update(slowedDeltaTime);
  
        controls.update();
        renderer.render(scene, camera);
      }
  
      requestAnimationFrame(animate);
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
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement); // Use `mount` instead of `mountRef.current`
      controls.dispose();
    };
  }, []);
  

  return <div ref={mountRef} className="w-full h-full"></div>;
};

export default ThreeScene;
