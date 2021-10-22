import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let loader = new GLTFLoader();

const textureLoader = new THREE.TextureLoader();

let map1 = textureLoader.load(
  './assets/img/azul.jpg',
);

let map2 = textureLoader.load(
  './assets/img/rojo.jpg',
);

let map3 = textureLoader.load(
  './assets/img/dorado.jpg',
);

map1.encoding = THREE.sRGBEncoding;
map1.flipY = false;

map2.encoding = THREE.sRGBEncoding;
map2.flipY = false;

map3.encoding = THREE.sRGBEncoding;
map3.flipY = false;

let car;
let light;
let light2;
let light3;
let light4;
let directionalLight;

document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0xffffff);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};
/* window.addEventListener('wheel', onMouseWheel); */

export function reset() {
  scene.children = [];
  renderer.setSize(0, 0, true);
}

export function main() {
    reset();
    // Configuracion inicial
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    scene.background = new THREE.Color(0x141414)
    document.body.appendChild(renderer.domElement);

    camera.position.z = 15;
    camera.position.y = 15;

    // Visual Configs
    cameraConfig();
    controlsConfig();
  
    // Light
    setupLights();
  
    // Modelo
    loadInitialModel();
    changeModel();
}

function loadInitialModel() {
  loader.load(
    './assets/modelOne/scene.gtlf',
    function (gltf) {
       car = gltf.scene.children[0];
       scene.add(car);
       animate();
    },
    function (xhr) {
       console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
       console.log('Un error ocurrió');
    },
  );
}
  
export function changeModel(assetFolder) {
    scene.children = [];
    // Light
    setupLights();
    loader.load(
      `assets/${assetFolder}/scene.gltf`,
      function (gltf) {
        car = gltf.scene.children[0];
        scene.add(car);
        animate();
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
      },
      function (error) {
        console.log('Un error ocurrio');
      },
    );
}

export function changeTextureOne() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map1;
    }
  });
  animate();
}

export function changeTextureTwo() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map2;
    }
  });
  animate();
}

export function changeTextureThree() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map3;
    }
  });
  animate();
}


function controlsConfig() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enablePan = false;
}
  
function cameraConfig() {
    camera.position.x = 8;
    camera.position.y = 2;
    camera.position.z = 8;
}
  
function setupLights() {
  directionalLight = new THREE.DirectionalLight(0x141414, 20);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 1.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 1.5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 1.5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 1.5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
 }
  
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
} 

/* function onMouseWheel(event) {
  y = -event.deltaY * 0.0007;
} 
 */