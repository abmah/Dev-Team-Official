import * as THREE from 'three'; import
  './style.css';
import { getProject, types, val } from "@theatre/core";
import studio from "@theatre/studio";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Lenis from 'lenis';
import projectState from "./public/qadan4.json";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import gsap from 'gsap';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(5.468, 2.333, 20.9404);
// camera.lookAt(0, 0, 0);
camera.lookAt(10, -10, 50);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('webgl'),
  alpha: true,
  antialias: true
});

renderer.setSize(sizes.width, sizes.height);



// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.4); // Soft white light
scene.add(ambientLight);

// Add first directional light
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5); // White light
directionalLight1.position.set(5, 10, 7.5); // Position it to the side and above
scene.add(directionalLight1);

// Add second directional light
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3); // Softer white light
directionalLight2.position.set(-5, 10, -7.5); // Position it opposite to the first light
scene.add(directionalLight2);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let college

gltfLoader.load("1.glb", (gltf) => {
  college = gltf.scene

  college.scale.set(5, 5, 5)

  scene.add(gltf.scene);
});

// fog
const fog = new THREE.Fog(0xfffff4, -4, 40);
// scene.fog = fog



// theatre studio
// studio.extend()
// theatre studio
// studio.initialize();

const project = getProject("qadan", { state: projectState });
const sheet = project.sheet("Animated scene");
const sequenceLength = val(sheet.sequence.pointer.length);

const cameraObject = sheet.object("Camera", {
  rotation: types.compound({
    x: types.number(camera.rotation.x, { range: [-20, 20] }),
    y: types.number(camera.rotation.y, { range: [-20, 20] }),
    z: types.number(camera.rotation.z, { range: [-20, 20] }),
  }),
  position: types.compound({
    x: types.number(camera.position.x, { range: [-9, 9] }),
    y: types.number(camera.position.y, { range: [-9, 9] }),
    z: types.number(camera.position.z, { range: [-9, 9] }),
  }),
});

cameraObject.onValuesChange((values) => {
  // camera.rotation.set(values.rotation.x, values.rotation.y, values.rotation.z);
  // camera.position.set(values.position.x, values.position.y, values.position.z);
});


// lenis

const lenis = new Lenis({
});

lenis.on("scroll", (e) => {
  // sheet.sequence.position = e.progress * sequenceLength;
});
let amplitude = 0.1; // Adjust this value for the range of rotation
let frequency = 0.1;

function raf(time) {
  lenis.raf(time);
  if (college) {
    college.rotation.y = amplitude * Math.sin(frequency * time / 500);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);




window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});


gsap.to('.wwab-card', {
  scrollTrigger: {
    trigger: '.where-we-are-based',
    start: 'top top',
    end: '+=1700',
    scrub: 1,
    // markers: true,
    pin: true
  },
})








gsap.to(camera.position, {
  x: -2.234,
  y: 2.333,
  z: -7.9702,
  scrollTrigger: {
    trigger: '.where-we-are-based',
    start: 'top top',
    end: '+=200',
    scrub: 1,
    // markers: true
  },
})







// Create a media query-based GSAP animation setup
gsap.matchMedia().add("(min-width: 900px)", () => {

  // This block will only run when the screen width is 900px or larger
  gsap.to('.founders', {
    scrollTrigger: {
      trigger: '.our-founders-text',
      start: 'top top',
      end: '+=1200',
      scrub: 1,
      // markers: true, // Uncomment if you want to see markers for debugging
      pin: true
    },
  });

  // Cleanup logic that will automatically run when the media query no longer matches
  return () => {
    // ScrollTrigger will automatically handle the cleanup of pinned elements and animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
});
