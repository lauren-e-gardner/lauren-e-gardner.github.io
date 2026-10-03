"use strict";

/***************** Important Info on Accessing Cloth Properties **************/
// NOTE: A variety of useful physical constants and properties of the cloth
// are defined for you in `params.js`.
//
// As you change values in the GUI (such as the size of the cloth),
// these changes are automatically populated into the global SceneParams object.
//
// You should treat the SceneParams object as read-only, as mutating its values
// without going through the GUI will have undesirable effects.
//
// We recommend you briefly inspect `params.js` to get a feel for what sorts
// of values are available to you, and what their defaults are.
//
// For example, to use these values in your code you might write:
//      let MASS = SceneParams.MASS;
//      let friction = SceneParams.friction;
//      let fabricLength = SceneParams.fabricLength;
//  ... and so on.

/****************************** HELPER FUNCTIONS ******************************/
// Used to parameterize the cloth's geometry and provide initial positions
// for the particles in the cloth
// Params:
// * width: int - the width of the planar section
// * height: int - the height of the planar section
function plane(width, height) {
  return function(u, v, vec) {
    let x = u * width - width / 2;
    let y = 125;
    let z = v * height - height / 2;
    vec.set(x, y, z);
  };
}

// A higher order function f(u,v,vec) that sets the components of a Vector3 vec
// using the u,v coordinates in a plane.
let initParameterizedPosition = plane(500,500);

/***************************** CONSTRAINT *****************************/
function Constraint(p1, p2, distance) {
  this.p1 = p1; // Particle 1
  this.p2 = p2; // Particle 2
  this.distance = distance; // Desired distance
}

Constraint.prototype.enforce = function() {
  // Enforce this constraint by applying a correction to the two particles'
  // positions based on their current distance relative to their desired rest
  // distance.
  let AB = new THREE.Vector3(0,0,0)
  AB.subVectors(this.p2.position, this.p1.position);
  let dist = AB.length()
  let v_corr = AB.normalize().multiplyScalar((dist - this.distance)/2);
  this.p1.position.add(v_corr);
  this.p2.position.sub(v_corr);
};

/****************************** CLOTH ******************************/
// Cloth constructor
// Parameters:
//   w: (int) number of segments width-wise
//   h: (int) number of segments height-wise
//   l: (int) actual length of the square cloth
//
// A cloth has the following properties:
//   this.w: (int) number of segments width-wise
//   this.h: (int) number of segments height-wise
//   this.constraints: (Constraints[]) list of Constraint objects
//      that constrain distances between some 2 particles in the cloth
//   this.particles: (Particles[]) list of Particle objects that make up the cloth
//
// NOTE: A cloth is a 2d grid of particles ranging from (0,0) to (w,h) *inclusive*.
//       This means that the grid of particles is [w+1 x h+1], NOT [w x h].
function Cloth(w, h, l) {
  // Internal helper function for computing 1D index into particles list
  // from a particle's 2D index
  function index(u, v) {
    return u + v * (w + 1);
  }
  this.index = index;

  // Width and height
  this.w = w;
  this.h = h;

  // Resting distances
  this.restDistance = SceneParams.fabricLength / this.w; // for adjacent particles
  this.restDistanceB = 2; // multiplier for 2-away particles
  this.restDistanceS = Math.sqrt(2);

  // Empty initial lists
  let particles = [];
  let constraints = [];

  // Create particles
  for (let v = 0; v <= h; v++) {
    for (let u = 0; u <= w; u++) {
      particles.push(new Particle(u / w, v / h, 0, SceneParams.MASS));
    }
  }

  // Edge constraints
  let rconstraints = [];

  for (let v = 0; v <= h; v++) {
    for (let u = 0; u <= w; u++) {
      if (v < h && (u == 0 || u == w)) {
          constraints.push(new Constraint(particles[index(u, v)], particles[index(u, v + 1)], this.restDistance));
      }

      if (u < w && (v == 0 || v == h)) {
        constraints.push(new Constraint(particles[index(u, v)], particles[index(u + 1, v)], this.restDistance));
      }
    }
  }

  // Structural constraints
  if (SceneParams.structuralSprings) {
  
    for (let v = 0; v <= h; v++) {
      for (let u = 0; u <= w; u++) {
        if (v < h) {
          let constraint = new Constraint(particles[index(u, v)], particles[index(u, v + 1)], this.restDistance)
          if (!constraints.includes(constraint)) {
            constraints.push(constraint);
          }
        }
        if (u < w) {
          let constraint = new Constraint(particles[index(u, v)], particles[index(u + 1, v)], this.restDistance)
          if (!constraints.includes(constraint)) {
            constraints.push(constraint);
          }
        }
      }
    }
  }

  // Shear constraints
  if (SceneParams.shearSprings) {

    for (let v = 0; v < h; v++) {
      for (let u = 0; u < w; u++) {
       // if (v < h && u < w) {
          let constraint1 = new Constraint(particles[index(u, v)], particles[index(u + 1, v + 1)],  this.restDistance* this.restDistanceS)
          let constraint2 = new Constraint(particles[index(u + 1, v)], particles[index(u, v + 1)],  this.restDistance* this.restDistanceS)
          if (!constraints.includes(constraint1)) {
            constraints.push(constraint1);
          }
          if (!constraints.includes(constraint2)) {
            constraints.push(constraint2);
          }
        
      }
    }
  }

  // Bending constraints
  if (SceneParams.bendingSprings) {
    // Add bending constraints between particles in the cloth to the list of constraints.

    for (let v = 0; v <= h; v++) {
      for (let u = 0; u <= w; u++) {
        if (v < h - 1) {
          let constraint = new Constraint(particles[index(u, v)], particles[index(u, v + 2)], this.restDistance* this.restDistanceB)
          if (!constraints.includes(constraint)) {
            constraints.push(constraint);
          }
        }
        if (u < w - 1) {
          let constraint = new Constraint(particles[index(u, v)], particles[index(u + 2, v)], this.restDistance* this.restDistanceB)
          if (!constraints.includes(constraint)) {
            //console.log("here");
            constraints.push(constraint);
          }
        }
      }
    }
  }

  // Store the particles and constraints lists into the cloth object
  this.particles = particles;
  this.constraints = constraints;

  // Register an event handler to make the cloth react to your keypresses.
  // Don't double register if this handler has already been set up.
  // BUG: Remove this check - will invoke on wrong cloth obj
  if (!Cloth.eventHandlerRegistered) {
    // Add a listener for key press events.
    // The listener should invoke `cloth.handleImpactEvents`, which you
    // will complete elsewhere in this file.
    //
    // The `onMouseMove`, `onWindowResize`, and `Renderer.init` functions
    // in `render.js` may serve as a useful guide.
    
    window.addEventListener("keydown", handleImpactEvents, false);

    Cloth.eventHandlerRegistered = true;
  }
}

// Return the Particle that the mouse cursor is currently hovering above,
// or return null if the cursor is not over the canvas.
Cloth.prototype.getLookedAtParticle = function() {
  // Shoot a ray into the scene and see what it hits, just like in A3!
  let intersects = Renderer.raycaster.intersectObjects(Scene.scene.children);

  // Check all of the objects the ray intersects.
  // If one is the cloth, find an arbitrary particle on the face that was hit.
  for (let intersect of intersects) {
    if (intersect.object === Scene.cloth.mesh) {
      let i = intersect.face.a;
      let particle = this.particles[i];
      return particle;
    }
  }

  // The ray didn't run into any faces of the cloth.
  return null;
}

// Handler for impact events generated by the keyboard.
// When a certain key on the keyboard is pressed, apply a small impulse to the
// cloth at the location of the mouse cursor.
//
// We recommend binding each of the four arrow keys to a different directional
// impulse, but you are welcome to get creative if you'd like to have more
// complicated effects, or use different keys.
// Be sure to document your implementation and keybindings in the writeup.
//
// Params:
// * evt: event - The keypress event that led to this function call.
//
//  Note: your browser's event handling framework will automatically
//       invoke this function with the correct argument so long as you
//       registered the handler correctly in the Cloth constructor.
function handleImpactEvents(event) {
  // Ignore keypresses typed into a text box
  if (event.target.tagName === "INPUT") { return; }

  // The vectors tom which each key code in this handler maps. (Change these if you like)
  const keyMap = {
    ArrowUp: new THREE.Vector3(0,  1,  0),
    ArrowDown: new THREE.Vector3(0,  -1,  0),
    ArrowLeft: new THREE.Vector3(-1,  0,  0),
    ArrowRight: new THREE.Vector3(1,  0,  0),
};

  // The magnitude of the offset produced by this impact.
  // this number was chosen to look well in the absence of gravity.
  // It looks especially cool if you start turning off spring constraints.
  const scale = 30; // the magnitude of the offset produced by this impact.
  // (1) Check which key was pressed. If it isn't the triggering key, do nothing.
  // (2) Shoot a ray into the scene to determine what point is being looked at.
  //     (You may find the `cloth.getLookedAtParticle()` function useful).
  // (3) Calculate a position offset based on the directional key pressed.
  //     Scale the offset proportional to scale.
  // (4) Update the particle's position based on the offset.

  // Uncomment this line to inspect the fields of event in more detail:
  // debugger;

  var particle = cloth.getLookedAtParticle();
  if (!particle) return;
  if (event.keyCode == 37) {
    particle.position.addVectors(particle.original, keyMap.ArrowLeft.multiplyScalar(scale));
  }
  else if (event.keyCode == 38) {
    particle.position.addVectors(particle.original, keyMap.ArrowUp.multiplyScalar(scale));
  }
  else if (event.keyCode == 39) {
    particle.position.addVectors(particle.original, keyMap.ArrowRight.multiplyScalar(scale));
  }
  else if (event.keyCode == 40) {
    particle.position.addVectors(particle.original, keyMap.ArrowDown.multiplyScalar(scale));
  }
}

// ***************************************************************
// *                     Forces & Impulses
// ***************************************************************

// Apply a uniform force due to gravity to all particles in the cloth
Cloth.prototype.applyGravity = function() {
  let particles = this.particles;
  const GRAVITY = SceneParams.GRAVITY;
  // For each particle in the cloth, apply force due to gravity.

  for (let i = 0; i < particles.length; i++) {
  
    let force = new THREE.Vector3(0 , (-GRAVITY * particles[i].mass), 0)
    particles[i].addForce(force)
  }
};

// Oscllate one edge of the cloth up and down with the specified
// amplitude and frequency, while fixing the opposing edge in place.
//
// Useful for debugging constraints.
//
// Params:
// * amplitude: Number - the amplitude of oscillation (in units)
// * frequency: Number - the frequency of oscillation (in Hz/2pi)
Cloth.prototype.applyWave = function(amplitude, frequency) {
  let f = frequency / 1000;
  let y = amplitude * Math.sin(f * time);
  let offset = new THREE.Vector3(0,y,0);

  // Move the last row of cloth up and down.
  for (let i = 0; i <= this.w; i++) {
    let particle = this.particles[this.index(0, i)];
    particle.previous.addVectors(particle.original, offset);
    particle.position.addVectors(particle.original, offset);
  }

  // Grow/shrink the poles to match
  let oldHeight = Scene.poles.height;
  let newHeight = oldHeight + y;
  let ratio = newHeight / oldHeight;
  Scene.poles.meshes[3].scale.y = ratio;
  Scene.poles.meshes[0].scale.y = ratio;
}

// For each face in the cloth's geometry, apply a wind force.
//
// Params:
// * windStrength: number - the strength of the wind. Larger = stronger wind.
//        The precise implementation details of how to use this parameter are
//        intentionally left for you to decide upon.
Cloth.prototype.applyWind = function(windStrength) {
  let particles = this.particles;
  // Here are some dummy values for a relatively boring wind.
  //
  // Try making it more interesting by making the strength and direction
  // of the wind vary with time. You can use the global variable `time`,
  // which stores (and is constantly updated with) the current Unix time
  // in milliseconds.
  //
  // One suggestion is to use sinusoidal functions. Play around with the
  // constant factors to find an appealing result!
  windStrength *= 0.25*Math.sin(time/5000)
  windStrength += 30 
  let windForce = new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(windStrength);
  // Apply the wind force to the cloth particles
  let faces = Scene.cloth.geometry.faces;
  for (let face of faces) {
    let normal = face.normal;
    let tmpForce = normal
      .clone()
      .normalize()
      .multiplyScalar(normal.dot(windForce));
    particles[face.a].addForce(tmpForce);
    particles[face.b].addForce(tmpForce);
    particles[face.c].addForce(tmpForce);
  }
};

// For each face in the cloth's geometry, apply a rain impulse.
// Impulses represent a sudden strike to the cloth, rather than a sustained force.
//
// As such, the "rain force" is not a true force, and doesn't need to be
// considered during net force calculations. Instead, you can think of the
// rain impulse as a sudden change to the position of affected particles,
// which will be corrected over time by the constraints of the cloth.
//
// Hint: You may find Sim.randomCoord() useful.
//
// Params:
// * strength: number - a scalar multiplier for the strength of raindrop impact
// * rate: number - the number of raindrop impacts to simulate in a given frame
Cloth.prototype.applyRain = function(strength, rate) {
  let particles = this.particles;

  // (1) For each of the `rate` raindrops,
  //    (i)    Compute a random impact location
  //    (ii)   Add an impulse to that raindrop's position
  //    (iii)  Add a weakened impulse to nearby raindrops

for (let i = 0; i < rate; i++){
  let hit = Sim.randomCoord();
  //console.log(hit)
  if (0 <= i && i < particles.length) {
    this.particles[this.index(hit.x, hit.y)].position.y -= strength
    if (hit.x > 0)
      this.particles[this.index(hit.x-1, hit.y)].position.y -= strength * 0.1
    if (hit.x < this.w)
     this.particles[this.index(hit.x+1, hit.y)].position.y -= strength * 0.1
    if (hit.y > 0)
      this.particles[this.index(hit.x, hit.y-1)].position.y -= strength * 0.1
    if (hit.y < this.h)
      this.particles[this.index(hit.x, hit.y+1)].position.y -= strength * 0.1
    if (hit.x > 0 && hit.y > 0)
      this.particles[this.index(hit.x-1, hit.y-1)].position.y -= strength * 0.1
    if (hit.x > 0 && hit.y < this.h)
      this.particles[this.index(hit.x-1, hit.y+1)].position.y -= strength * 0.1
    if (hit.x < this.w && hit.y > 0)
      this.particles[this.index(hit.x+1, hit.y-1)].position.y -= strength * 0.1
    if (hit.x < this.w && hit.y < this.h)
      this.particles[this.index(hit.x+1, hit.y+1)].position.y -= strength * 0.1
  }
}

}


// Implement your own custom force, and apply it to some (or all) of the
// particles in the cloth.
//
// You can make it vary as a function of time, space, or any other parameters
// that you can dream up.
//
// Params:
// * strength: number - a strength parameter. Use it however you like, or ignore it!
// * rate: number - a rate parameter. Use it however you like, or ignore it!
Cloth.prototype.applyCustom = function(strength, rate) {
  let particles = this.particles;

        let hit = new THREE.Vector2(Math.round(time/100), Math.round(time/100))
       //)
        //console.log(hit)
        if (hit.x >= 0 && hit.y >= 0 && hit.x <= this.w && hit.y <= this.h) {
  
          this.particles[this.index(hit.x, hit.y)].position.y /=  strength
          if (hit.x > 0)
            this.particles[this.index(hit.x-1, hit.y)].position.y += strength * 0.1
          if (hit.x < this.w)
           this.particles[this.index(hit.x+1, hit.y)].position.y += strength * 0.1
          if (hit.y > 0)
            this.particles[this.index(hit.x, hit.y-1)].position.y += strength * 0.1
          if (hit.y < this.h)
            this.particles[this.index(hit.x, hit.y+1)].position.y += strength * 0.1
          if (hit.x > 0 && hit.y > 0)
            this.particles[this.index(hit.x-1, hit.y-1)].position.y += strength * 0.1
          if (hit.x > 0 && hit.y < this.h)
            this.particles[this.index(hit.x-1, hit.y+1)].position.y += strength * 0.1
          if (hit.x < this.w && hit.y > 0)
            this.particles[this.index(hit.x+1, hit.y-1)].position.y += strength * 0.1
          if (hit.x < this.w && hit.y < this.h)
            this.particles[this.index(hit.x+1, hit.y+1)].position.y += strength * 0.1
        }
    //  }
      
 // }
//}
}

// Wrapper function that calls each of the other force-related
// functions, if applicable. Additional forces in the simulation
// should be added here.
Cloth.prototype.applyForces = function() {
  if (SceneParams.gravity) {
    this.applyGravity();
  }
  if (SceneParams.wind) {
    this.applyWind(SceneParams.windStrength);
  }
  if (SceneParams.rain) {
    this.applyRain(SceneParams.rainStrength, SceneParams.rainRate);
  }
  if (SceneParams.wave) {
    this.applyWave(SceneParams.waveAmp, SceneParams.waveFreq);
  }
  if (SceneParams.customForce) {
    this.applyCustom(SceneParams.customFStrength, SceneParams.customFRate);
  }
};

Cloth.prototype.update = function(deltaT) {
  if (!SceneParams.integrate) return;
  let particles = this.particles;
  // For each particle in the cloth, have it update its position
  // by calling its integrate function.
  for (let i = 0; i < particles.length; i++) {
    particles[i].integrate(deltaT)
  }
};

// ***************************************************************
// *                 Collisions & Constraints
// ***************************************************************

Cloth.prototype.handleCollisions = function() {
  let particles = this.particles;

  let floor  = Scene.ground;
  let sphere = Scene.sphere;
  let box    = Scene.box;
  // For each particle in the cloth, call the appropriate function(s)
  // for handling collisions with various objects.
  //
  // Edit this function as you implement additional collision-detection functions.
  for (let i = 0; i < particles.length; i++) {
    particles[i].handleFloorCollision(floor)
    particles[i].handleSphereCollision(sphere)
    particles[i].handleBoxCollision(box)
  }
};

Cloth.prototype.enforceConstraints = function() {
  let constraints = this.constraints;
  // Enforce all constraints in the cloth.
  for (var i = 0; i < constraints.length; i++) {
    constraints[i].enforce();
  }
};


Cloth.prototype.createConstraintLinesInScene = function() {
  let constraints = this.constraints;
  let group = new THREE.Group();
  // create constraint lines if not already created
  if (!Scene.cloth.constraints) {
    let objs = [];
    for (let c of constraints) {
      let obj = Scene.createConstraintLine(c)
      objs.push(obj);
      group.add(obj.mesh);
    }
    Scene.cloth.constraints = {
      array: objs,
      group: group,
    };
    Scene.scene.add(group);
  }
}

// Handle self intersections within the cloth by repelling any
// pair of particles back towards a natural rest distance.
// This should be similar to how constraints are enforced to keep
// particles close to each other, but in the opposite direction.
//
// A naive approach can do this in quadratic time.
// For additional credit, try optimizing this further and showing us
// the fps improvements that you achieve with your optimizations!
//
// Possible optimization ideas, in order of increasing difficutly:
//  (1) Implement a heuristic collision detection scheme, such as:
//  (1a)    Assume a particle will only ever self-intersect with nearby
//          particles. Check for self-intersections only in a K-sized window
//          around a given point, in terms of the 2D cloth coordinates.
//  (1b)    Implement a nondeterministic collision detection scheme by
//          randomly enforcing only a subset of the self-intersection constraints
//          at each time step.
//  (2) Use spatial hashing to efficiently check for collisions only against
//      points that are nearby in 3D space. To do this:
//      (i) Segment 3D space into several cubic "chunks"
//            (similar to the checkerbooard material from A3).
//      (ii) Create a mapping from each chunk to the particles within it at
//           the current time step.
//      (iii) Check for collisions only between a particle and all other
//            particles that are within that bin.
//      (iv) Bonus: There are interesting corner cases where two bins meet.
//           For example, two adjacent particles may end up each in a different
//           bin, and we'd like to make sure they don't intersect either.
//           Find a creative way of resolving these corner cases.
Cloth.prototype.handleSelfIntersections = function() {
  let particles = this.particles;
};
