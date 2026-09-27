import { Group, Mesh, ShaderMaterial, IcosahedronGeometry } from 'three';
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

class Poison extends Group {
  private mesh: Mesh;
  private material: ShaderMaterial;
  private state: { bob: boolean; morph: boolean };

  constructor() {
    super(); // Call parent Group() constructor

    // Init state
    this.state = {
      bob: true,
      morph: true,
    };

    // Loading geometry and material
    const geometry = new IcosahedronGeometry(1, 100);

    this.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uRadius: { value: 0.5 },
      },
    });

    this.mesh = new Mesh(geometry, this.material);

    // Add the fruit mesh to the group
    this.add(this.mesh);
  }

  // Inside your Fruit class
public update(deltaTime: number): void {
    // This will now use deltaTime for smooth, time-based animation
    if (this.state.bob) {
      // Bob back and forth
      this.position.y = 0.1 * Math.cos(Date.now() * 0.0025);
      // this.position.y = 0.05 * Math.cos(deltaTime * 0.002); // Adjust this based on how fast you want the bobbing
    }
    if (this.state.morph) {
      // Update shader uniform for animation
      this.material.uniforms.uTime.value += deltaTime; // Update uTime over time
    }
  }
  
}

export default Poison;
