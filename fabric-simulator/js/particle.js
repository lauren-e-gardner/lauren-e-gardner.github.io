"use strict";

// Particle constructor
function Particle(x, y, z, mass) {
  this.position = new THREE.Vector3(); // position
  this.previous = new THREE.Vector3(); // previous
  this.original = new THREE.Vector3(); // original
  initParameterizedPosition(x, y, this.position);
  initParameterizedPosition(x, y, this.previous);
  initParameterizedPosition(x, y, this.original);

  this.netForce = new THREE.Vector3(); // net force acting on particle
  this.mass = mass; // mass of the particle
  this.correction = new THREE.Vector3(); // offset to apply to enforce constraints
}

// Snap a particle back to its original position
Particle.prototype.lockToOriginal = function() {
  this.position.copy(this.original);
  this.previous.copy(this.original);
};

// Snap a particle back to its previous position
Particle.prototype.lock = function() {
  this.position.copy(this.previous);
  this.previous.copy(this.previous);
};

// Add the given force to a particle's total netForce.
// Params:
// * force: THREE.Vector3 - the force to add
Particle.prototype.addForce = function(force) {
  this.netForce.add(force);
};

// Perform Verlet integration on this particle with the provided
// timestep deltaT.
// Params:
// * deltaT: Number - the length of time dt over which to integrate
Particle.prototype.integrate = function(deltaT) {
  const DAMPING = SceneParams.DAMPING;

  // You need to:
  // (1) Save the old (i.e. current) position into this.previous.
  // (2) Compute the new position of this particle using Verlet integration,
  //     and store it into this.position.
  // (3) Reset the net force acting on the particle (i.e. make it (0, 0, 0) again).
  //compute particle
  //new = this.position + (1-DAMPING) * (this.position-this.previous) + total acceleration * (deltaT)**
  let oldPos = this.position.clone();
  let velocity = new THREE.Vector3();
  velocity.subVectors(this.position, this.previous)
  this.position = this.position.add(velocity.multiplyScalar(1-DAMPING)).add(
  this.netForce.multiplyScalar(deltaT**2/this.mass));
  this.previous = oldPos;
  this.netForce = new THREE.Vector3();
};

// Handle collisions between this Particle and the provided floor.
// Note: the fields of floor are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * floor: An object representing the floor of the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.PlaneBufferGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
Particle.prototype.handleFloorCollision = function(floor) {
  let floorMesh = floor.mesh;
  let floorPosition = floorMesh.position;
  const EPS = 3;
  // Handle collision of this particle with the floor.
 // console.log(floorPosition.y)
  if (this.position.y - floorPosition.y < EPS) {
    this.position.y = floorPosition.y + EPS
  }
};

// Handle collisions between this Particle and the provided sphere.
// Note: the fields of sphere are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * sphere: An object representing a sphere in the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.SphereGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
//    - radius: number - the radius of the sphere
//    - position: THREE.Vector3 - the sphere's position in this frame
//    - prevPosition: THREE.Vector3 - the sphere's position in the previous frame
Particle.prototype.handleSphereCollision = function(sphere) {
  if (sphere.mesh.visible) {
    const friction = SceneParams.friction;
    let spherePosition = sphere.position.clone();
    let prevSpherePosition = sphere.prevPosition.clone();
    let EPS = 5; // empirically determined
    // Handle collision of this particle with the sphere.
    // As with the floor, use EPS to prevent clipping.
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
    let dist = spherePosition.distanceTo(this.position)
    if (this.position.distanceTo(spherePosition) > sphere.radius + EPS) {
      return
    }
    else {
      posNoFriction = this.position
      let scale = (sphere.radius + EPS)/dist
      posNoFriction.sub(spherePosition).multiplyScalar(scale)
      posNoFriction.add(spherePosition)
      this.position = posNoFriction
    
    }
    if (this.previous.distanceTo(spherePosition) > sphere.radius + EPS && friction != 0) {
      posFriction = this.previous.clone().add(spherePosition).sub(prevSpherePosition).multiplyScalar(friction)
      posNoFriction = posNoFriction.multiplyScalar(1.0 - friction)
      this.position.addVectors(posFriction, posNoFriction)
    }
    else {
       this.position = posNoFriction
    }
  }
};

// Handle collisions between this Particle and the provided axis-aligned box.
// Note: the fields of box are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * box: An object representing an axis-aligned box in the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.BoxGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
//    - boundingBox: THREE.Box3 - the bounding box of the box in the scene
Particle.prototype.handleBoxCollision = function(box) {
  if (box.mesh.visible) {
    const friction = SceneParams.friction;
    let boundingBox = box.boundingBox.clone();
    const EPS = 10; // empirically determined
    // Handle collision of this particle with the axis-aligned box.
    // As before, use EPS to prevent clipping
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
 
    boundingBox.expandByScalar(EPS);
    let maxX = boundingBox.max.x
    let minX = boundingBox.min.x
    let maxY = boundingBox.max.y
    let minY = boundingBox.min.y
    let maxZ = boundingBox.max.z
    let minZ = boundingBox.min.z

    let xMaxDist = maxX - this.position.x; 
    if(maxX - this.position.x < 0) 
      return;
    let xMinDist = this.position.x - minX; 
    if(xMinDist < 0) 
      return;
    let yMaxDist = maxY - this.position.y; 
    if(yMaxDist < 0) 
      return;
    let yMinDist= this.position.y - minY; 
    if(yMinDist < 0)
      return;
    let zMaxDist = maxZ - this.position.z; 
    if(zMaxDist < 0) 
      return;
    let zMinDist = this.position.z - minZ; 
    if(zMinDist < 0) 
      return;
    let minDist = Math.min(xMaxDist, xMinDist, yMaxDist, yMinDist, zMaxDist, zMinDist);

    if(xMaxDist == minDist)
      this.position.x = maxX;
    else if(xMinDist == minDist)
      this.position.x = minX;
    else if(yMaxDist == minDist)
      this.position.y = maxY;
    else if(yMinDist == minDist)
      this.position.y = minY;
    else if(zMaxDist == minDist)
      this.position.z = maxZ;
    else if(zMinDist == minDist)
      this.position.z =  minZ;

    posNoFriction = this.position.clone();

    if (!boundingBox.containsPoint(this.previous)){
      posFriction = this.previous.clone();
      this.position = posNoFriction.multiplyScalar(1-friction).add(posFriction.multiplyScalar(friction));
    }
    
  }
};

// ------------------------ Don't worry about this ---------------------------
// Apply the cached correction vector to this particle's position, and
// then zero out the correction vector.
// Particle.prototype.applyCorrection = function() {
//   this.position.add(this.correction);
//   this.correction.set(0,0,0);
// }
