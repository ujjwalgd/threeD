//
//for frist canvas
//

let scene, camera, renderer;
//to save the position of mouse
let pointer = new THREE.Vector2();

init();

function init() {
  scene = new THREE.Scene();
  scene2 = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: AboutLucid,
  });
  scene.background = new THREE.Color(0xd61c4e);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //for intial position of camera
  camera.position.z = 5;
}

//create donute
const TorGeo = new THREE.TorusGeometry(10, 3, 16, 100);
const NormalMap = new THREE.TextureLoader().load("img/metal_nor.png");
const TorMat = new THREE.MeshStandardMaterial({
  color: 0xc4ddff,
  normalMap: NormalMap,
  roughness: 0.2,
});
const Torus = new THREE.Mesh(TorGeo, TorMat);
Torus.scale.set(0.2, 0.2, 0.2);
scene.add(Torus);

//create sphare
const SphGeo = new THREE.SphereGeometry(15, 32, 16);
const Sph_NormalMap = new THREE.TextureLoader().load("img/clothe_nor.png");
const SphMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  normalMap: Sph_NormalMap,
});
const Sphere = new THREE.Mesh(SphGeo, SphMat);
Sphere.scale.set(0.04, 0.04, 0.04);
scene.add(Sphere);

const AmLight = new THREE.AmbientLight(0xd61c4e);
scene.add(AmLight);

const directionalLight1 = new THREE.PointLight(0xf38181, 1, 100);
directionalLight1.position.set(5, 5, -1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.PointLight(0x95e1d3, 1, 100);
directionalLight2.position.set(-5, 5, 2);
scene.add(directionalLight2);

//move torus
document.addEventListener("mousemove", function (event) {
  movetorus(event);
});

function movetorus(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  Torus.rotation.x += pointer.y * 0.1;
  Torus.rotation.y += pointer.x * 0.1;
}
//rander frames
animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  Torus.rotation.x += 0.01;
  Torus.rotation.y += 0.01;
}
