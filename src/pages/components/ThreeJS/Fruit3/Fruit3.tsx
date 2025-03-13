import { Group, Mesh, ShaderMaterial, IcosahedronGeometry } from 'three';
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


class Fruit3 extends Group {
  private mesh1: Mesh;
  private mesh2: Mesh;
  private mesh3: Mesh;
  private mesh4: Mesh;
  private mesh5: Mesh;
  private mesh6: Mesh;
  private mesh7: Mesh;
  private mesh8: Mesh;
  private mesh9: Mesh;
  private mesh10: Mesh;
  private material: ShaderMaterial;
  private state: { bob: boolean; morph: boolean };

  constructor() {
    super(); // Call parent Group() constructor

    // Init state
    this.state = {
      bob: true,
      morph: true,
    };

    const loader = new GLTFLoader();
    
     // loading leaf geometry
     loader.load('./scene.gltf', (gltf) => {
      gltf.scene.rotation.set(.3,0,0)
      gltf.scene.position.y = 2.6
      gltf.scene.position.x = 0
      gltf.scene.position.z = 0.75
      this.add(gltf.scene)
  });

    // Loading geometry and material
    const geometry = new IcosahedronGeometry(0.01, 5)

    this.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uRadius: { value: 0.5 },
      },
    });

    this.mesh1 = new Mesh(geometry, this.material);
    this.mesh2 = new Mesh(geometry, this.material);
    this.mesh3 = new Mesh(geometry, this.material);
    this.mesh4 = new Mesh(geometry, this.material);
    this.mesh5 = new Mesh(geometry, this.material);
    this.mesh6 = new Mesh(geometry, this.material);
    this.mesh7 = new Mesh(geometry, this.material);
    this.mesh8 = new Mesh(geometry, this.material);
    this.mesh9 = new Mesh(geometry, this.material);
    this.mesh10 = new Mesh(geometry, this.material);

    this.mesh1.position.set(-2,0,0) //row 1
    this.mesh2.position.set(0,-2.5,0) //bottom
    this.mesh3.position.set(0,0,-2) //row 1
    this.mesh4.position.set(2,0,0) //row 1
    this.mesh5.position.set(0,1.0,0) //top
    this.mesh5.scale.set(1.3,1.3,1.3)
    this.mesh6.position.set(0,0,2) //row 1
    this.mesh7.position.set(1.25,-1.25,1.25) //row 2
    this.mesh8.position.set(-1.25,-1.25,1.25) //row 2
    this.mesh9.position.set(1.25,-1.25,-1.25) //row 2
    this.mesh10.position.set(-1.25,-1.25,-1.25) //row 2

    // bottom / top
    this.mesh2.rotation.x = Math.PI/2
    this.mesh5.rotation.x = Math.PI/2

    // row 1
    this.mesh1.rotateY(Math.PI/2) 
    this.mesh1.rotateX(Math.PI/8)
    this.mesh4.rotateY(Math.PI/2) 
    this.mesh4.rotateX(-Math.PI/8)
    this.mesh3.rotation.set(Math.PI/8,0,0)
    this.mesh6.rotation.set(-Math.PI/8,0,0)
    this.mesh7.rotation.set(0,Math.PI/4,0)
    this.mesh8.rotation.set(0,-Math.PI/4,0)
    this.mesh9.rotation.set(0,-Math.PI/4,0)
    this.mesh10.rotation.set(0,Math.PI/4,0)

    // Add the fruit mesh to the group
    this.add(this.mesh1);
    this.add(this.mesh2);
    this.add(this.mesh3);
    this.add(this.mesh4);
    this.add(this.mesh5);
    this.add(this.mesh6);
    this.add(this.mesh7);
    this.add(this.mesh8);
    this.add(this.mesh9);
    this.add(this.mesh10);
  }

  // Inside your Fruit class
public update(deltaTime: number): void {
    // This will now use deltaTime for smooth, time-based animation
    if (this.state.bob) {
      // Bob back and forth
      this.position.y = 0.1 * Math.cos(Date.now() * 0.0025);

      // this.position.y = 0.05 * Math.cos(deltaTime * 2); // Adjust this based on how fast you want the bobbing
    }
    if (this.state.morph) {
      // Update shader uniform for animation
      this.material.uniforms.uTime.value += deltaTime; // Update uTime over time
    }
  }
  
}

export default Fruit3;
