//main.js

//Initialize the objects for use in the scene
let scene, camera, renderer, light, helper;
let shape, treeTop, treeTrunk;

//Variables for the rotation animation of both the light and the camera
var radius = 10;
var radius2 = 5;
var angle = 0;
var angle2 = 0;

//This function initializes the scene, camera, renderer, and light.
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    scene.add(light.target);

    light.position.z = 10;
    light.position.y = 5;
    light.position.x = 3;

    camera.position.z = 10;
    camera.position.y = 5;
    camera.lookAt(0,0,0);
}

//This function initializes the shape on the scene
function initShape(){
    const shapeGeo = new THREE.BoxGeometry(1,1,1);
    const shapeMat = new THREE.MeshPhongMaterial( { color: 0xc22e2e, wireframe: false } );

    shape = new THREE.Mesh(shapeGeo, shapeMat);
    shape.position.y = 0.5;
    shape.position.z = 3;

    scene.add(shape);
}

//This function initializes the tree on the scene
function initTree(){
    const treeTrunkGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.5);
    const treeTrunkMat = new THREE.MeshPhongMaterial( { color: 0x964B00, wireframe: false });

    treeTrunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
    treeTrunk.position.y = 0.25;
    treeTrunk.position.z = -3;

    var treeTopGeo = new THREE.ConeGeometry(1,3,12);
    var treeTopMat = new THREE.MeshPhongMaterial( { color: 0x77d977, wireframe: false, shininess: 0});

    treeTop = new THREE.Mesh(treeTopGeo, treeTopMat);
    treeTop.position.y = 2;
    treeTop.position.z = -3;

    treeTopGeo = new THREE.ConeGeometry(1, 3, 12);
    treeTopMat = new THREE.MeshPhongMaterial( { color: 0x77d977})

    var treeTop2 = new THREE.Mesh(treeTopGeo, treeTopMat);
    treeTop2.position.y = 2.5;
    treeTop2.position.z = -3;

    scene.add(treeTrunk);
    scene.add(treeTop);
    scene.add(treeTop2);
}

//This function adds the grid and the light helper lines to the scene
function showGrid(){
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, divisions, 0x5959);
    scene.add( gridHelper );      

    helper = new THREE.DirectionalLightHelper( light, 1 );
    scene.add(helper);

}

//This function recursively animates the scene by changing properties of the objects placed on the scene.
function animate(){
    requestAnimationFrame(animate);

    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    angle += 0.001;

    camera.lookAt(0,0,0);

    console.log(light.target.position);
    light.position.x = radius2 * Math.cos(angle2);
    light.position.z = radius2 * Math.sin(angle2);
    angle2 += 0.01;

    helper.update();

    renderer.render(scene, camera);
}

//Function calls
init();
initShape();
initTree();
showGrid();
animate();