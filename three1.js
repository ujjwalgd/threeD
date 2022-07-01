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
const light = new THREE.PointLight(0xff3014, 7, 5);
//cicle mouse circur
const pointerGeo = new THREE.CircleGeometry(0.07, 32);
const pointermat = new THREE.MeshToonMaterial({ color: 0xbf381d });
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
      Math.random() * -7 + 3.5,
      Math.random() * 1 - 0.5,
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

//2nd canvas
let scene2,
  camera2,
  renderer2,
  //combination of all the point in each vertex of tree
  treePnt,
  //to store the camera postion on curve
  cameraPos = 0,
  //for move camera when enogh wheel scroll
  camera2Acc = 0,
  isstatic = true;
//texture for points
const particleTax = new THREE.TextureLoader().load("img/disc.png");
// for store mouse postion
let pointer2 = new THREE.Vector2();
init2();

//for intialization of 2nd canvas
function init2() {
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  //set background color
  scene2.background = new THREE.Color(0x000000);
  //initial postion of camera
  camera2.position.setZ(15);

  renderer2 = new THREE.WebGLRenderer({
    antialias: true,
    canvas: menus,
  });
  renderer2.setSize(window.innerWidth, window.innerHeight);
}

//to load the Gltf model of tree
let loader2 = new THREE.GLTFLoader();
loader2.load("3dModels/tree.gltf", function (tree) {
  //store all the points on each vertex
  let pts = [];
  //store buffer Attribure of all points geometry
  let v3 = new THREE.Vector3();
  tree.scene.traverse((child) => {
    if (child.isMesh) {
      let pos = child.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        pts.push(v3.clone());
      }
    }
  });
  // create a geomatry from all points
  let treeGeo = new THREE.BufferGeometry().setFromPoints(pts);
  //center the final geomatry
  treeGeo.center();
  // texture for make points round insted of squre

  let treeMat = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 0.1,
    map: particleTax,
    alphaTest: 0.5,
    transparent: true,
  });

  treePnt = new THREE.Points(treeGeo, treeMat);
  treePnt.scale.set(0.55, 0.55, 0.55);
  treePnt.position.z = 3;
  treePnt.position.x = 2.55;
  scene2.add(treePnt);
});

//ground
const groundGeo = new THREE.PlaneGeometry(1, 1, 30, 10);
const groundMat = new THREE.PointsMaterial({
  color: 0xff0000,
  size: 0.15,
  map: particleTax,
  alphaTest: 0.5,
  transparent: true,
});
const groundPlane = new THREE.Points(groundGeo, groundMat);
groundPlane.scale.set(50, 10, 10);
scene2.add(groundPlane);

//rander frames
animate();

function animate() {
  requestAnimationFrame(animate);
  //for cloud motion
  couldParticle.forEach((p) => {
    p.rotation.z += 0.003;
  });

  document
    .getElementById("menus")
    .addEventListener("mousemove", function (event) {
      moveTree(event);
    });

  function moveTree(e) {
    //get mouse coordinate
    pointer2.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer2.y = -(e.clientY / window.innerHeight) * 2 + 1;
    treePnt.rotation.set(
      -1 * pointer.y * Math.PI * 0.1,
      pointer.x * Math.PI * 0.1,
      0
    );
  }

  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);
}
