/******************************************************************************
 * render.js
 *
 * This file is responsible for the main rendering loop of the program.
 ******************************************************************************/

var Renderer = Renderer || {};

if (!Detector.webgl) Detector.addGetWebGLMessage();

var time = 0;

function main() {
  Renderer.init();
  Renderer.animate();
}

Renderer.init = function() {
  // Set up the GUI elements
  Gui.init();

  // Build the scene by adding lights, a camera, and objects.
  Scene.init();

  // Built the cloth object to be simulated
  Sim.init();

  // Resize the canvas and recompute the camera matrix when the viewport expands.
  window.addEventListener("resize", onWindowResize, false);

  // Set up the raytracer for clicking
  window.addEventListener("mousemove", onMouseMove, false);
  Renderer.raycaster = new THREE.Raycaster();
  Renderer.mouse = new THREE.Vector2();
}

function onWindowResize() {
  Scene.camera.aspect = window.innerWidth / window.innerHeight;
  Scene.camera.updateProjectionMatrix();
  Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

// calculate mouse position in normalized device coordinates
// (-1 to +1) for both components
function onMouseMove( event ) {
	Renderer.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	Renderer.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


Renderer.animate = function() {
  requestAnimationFrame(Renderer.animate);

  // Using realtime clocks leads to undesirable effects when simulation is
  // paused or slowed down
  // time = Date.now();
  time += 30; // equivalent to ~33 fps

  Sim.simulate(); // run physics simulation to create new positions of cloth
  Renderer.render(); // update position of cloth, compute normals, rotate camera, render the scene
  Scene.stats.update();
  Scene.controls.update();
}

// the rendering happens here
Renderer.render = function() {
  let timer = time * 0.0002 * 0.8; // a hack

  // update position of the cloth
  // i.e. copy positions from the particles (i.e. result of physics simulation)
  // to the cloth geometry
  let p = cloth.particles;
  for (let i = 0, il = p.length; i < il; i++) {
    Scene.cloth.geometry.vertices[i].copy(p[i].position);
  }

  // Draw lines in the scene to visualize where constraints have been placed
  if (SceneParams.showConstraints) {
    cloth.createConstraintLinesInScene();
    let cs = cloth.constraints;
    for (let i = 0, il = cs.length; i < il; i++) {
      let obj = Scene.cloth.constraints.array[i];
      let c = cs[i];
      obj.geometry.attributes.position.array[0] = c.p1.position.x;
      obj.geometry.attributes.position.array[1] = c.p1.position.y + 10;
      obj.geometry.attributes.position.array[2] = c.p1.position.z;
      obj.geometry.attributes.position.array[3] = c.p2.position.x;
      obj.geometry.attributes.position.array[4] = c.p2.position.y;
      obj.geometry.attributes.position.array[5] = c.p2.position.z;
      if (SceneParams.allowShownConstraintMovement) {
        obj.geometry.attributes.position.needsUpdate = true;
      }
    }
  }

  // recalculate cloth normals
  Scene.cloth.geometry.computeFaceNormals();
  Scene.cloth.geometry.computeVertexNormals();

  Scene.cloth.geometry.normalsNeedUpdate = true;
  Scene.cloth.geometry.verticesNeedUpdate = true;

  // update sphere position from current sphere position in simulation
  Scene.sphere.mesh.position.copy(Scene.sphere.position);

  // option to auto-rotate camera
  if (SceneParams.rotate) {
    let x = Scene.camera.position.x;
    let z = Scene.camera.position.z;
    let cameraRadius = Math.sqrt(x * x + z * z);
    Scene.camera.position.x = Math.cos(timer) * cameraRadius;
    Scene.camera.position.z = Math.sin(timer) * cameraRadius;
  }
  Scene.camera.lookAt(Scene.scene.position);

  // Set up raytracer
  // update the picking ray with the camera and mouse position
	Renderer.raycaster.setFromCamera(Renderer.mouse, Scene.camera);

  Scene.renderer.render(Scene.scene, Scene.camera); // render the scene
}

// Invoke the main function
main();
