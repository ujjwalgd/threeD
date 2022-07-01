//
//for frist canvas
//

let scene,
  camera,
  renderer,
  //for store cloud's textures
  couldParticle = [];
//to save the position of mouse
let pointer = new THREE.Vector2();

//intialization for 1st canvas
init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: heading,
  });
  scene.background = new THREE.Color(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //for intial position of camera
  camera.position.z = 5;
}

//mouse pointer for 1st canvas
//light that follow mouse
const light = new THREE.PointLight(0x37e2d5, 10, 5);
//cicle mouse circur
const pointerGeo = new THREE.CircleGeometry(0.07, 32);
const pointermat = new THREE.MeshToonMaterial({ color: 0xf806cc });
const circlePoint = new THREE.Mesh(pointerGeo, pointermat);

//set postion of circur and light at mouse pointer
document.addEventListener("mousemove", onPointerMove);

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  light.position.set(pointer.x * 8, pointer.y * 4, 1);

  circlePoint.position.set(pointer.x * 1.5, pointer.y * 0.7, 4);
}
//add circur and light to scene
scene.add(circlePoint);
scene.add(light);

//for cloud in 1st canvas
let loader = new THREE.TextureLoader();
loader.load("img/CloudsFace.png", function (texture) {
  cloudGeo = new THREE.PlaneGeometry(5, 5);
  cloudMat = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
  });
  //set rotation and position of each cloud
  for (let i = 0; i < 50; i++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMat);
    cloud.position.set(
      Math.random() * -10 + 5,
      Math.random() * 2 - 1,
      Math.random() * 4 - 2
    );
    cloud.rotation.x = 0;
    cloud.rotation.y = 0;
    cloud.rotation.z = Math.random() * Math.PI;
    cloud.material.opacity = 0.1;
    //store every texture in couldParticle
    couldParticle.push(cloud);
    scene.add(cloud);
  }
});

//rander frames
animate();

function animate() {
  requestAnimationFrame(animate);
  //for cloud motion
  couldParticle.forEach((p) => {
    p.rotation.z += 0.003;
  });

  renderer.render(scene, camera);
}
