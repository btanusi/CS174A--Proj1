//////////////////////////////////////////////////////////////////
// Assignment 1:  Programing
/////////////////////////////////////////////////////////////////


// SETUP RENDERER AND SCENE
var scene = new THREE.Scene();
var body;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff); // white background colour
document.body.appendChild(renderer.domElement);


// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(-8,3,10);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA


var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

////////////////////////////////////////////////////////////////////////////////
//  loadOBJ( ):  loads OBJ file vertex mesh, with vertex normals
////////////////////////////////////////////////////////////////////////////////

function loadOBJ(objName, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function() {
    console.log('Failed to load ' + file);
  };
  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.name = objName;
    scene.add(object);

  }, onProgress, onError);
}

////////////////////////////////////////////////////////////////////////////////////
//   resize( ):  adjust camera parameters if the window is resized
////////////////////////////////////////////////////////////////////////////////////

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

////////////////////////////////////////////////////////////////////////////////////
//   create the needed objects
////////////////////////////////////////////////////////////////////////////////////

  // FLOOR WITH CHECKERBOARD 

var floorTexture = new THREE.ImageUtils.loadTexture('images/floor_winter.jpg');
//floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
//floorTexture.repeat.set(4, 4);
var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(20, 20);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = Math.PI / 2;
scene.add(floor);


  // Sphere

var sphereTexture=new THREE.ImageUtils.loadTexture('images/texture_galaxy.jpg');
var sphereMaterial=new THREE.MeshBasicMaterial({map:sphereTexture})
var sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
var whiteSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( whiteSphere );
whiteSphere.position.set(3,1,0);



  // LIGHTS:  needed for phong illumination model

var light = new THREE.PointLight(0xFFFFFF);
light.position.x=-70;
light.position.y=100;
light.position.z=70;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

  // MATERIALS

var brownMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x402020, color: 0x806060, specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });
var whiteMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x404040, color: 0x808080, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading });
var normalMaterial = new THREE.MeshNormalMaterial();



  // Leg: Front Left

var legFL1_Length = 0.6;
var leg1_Angle = -10;       // animation parameter
var legFL1_Geometry = new THREE.CylinderGeometry(0.16, 0.08, legFL1_Length, 60);
var legFL1 = new THREE.Mesh( legFL1_Geometry, normalMaterial );
scene.add( legFL1 );
legFL1.matrixAutoUpdate = false;

var legFL2_Length = 0.4;
var leg2_Angle = 15;       // animation parameter
var legFL2_Geometry = new THREE.CylinderGeometry(0.08, 0.05, legFL2_Length, 60);
var legFL2 = new THREE.Mesh( legFL2_Geometry, normalMaterial );
scene.add( legFL2 );
legFL2.matrixAutoUpdate = false;

var legFL3_Length = 0.1;
var leg3_Angle = -5;       // animation parameter
var legFL3_Geometry = new THREE.CylinderGeometry(0.05, 0.1, legFL3_Length, 60);
var legFL3 = new THREE.Mesh( legFL3_Geometry, normalMaterial );
scene.add( legFL3 );
legFL3.matrixAutoUpdate = false;

var legFL_Joint1_Geometry = new THREE.SphereGeometry(0.08, 32, 32);
var legFL_Joint1=new THREE.Mesh (legFL_Joint1_Geometry, normalMaterial );
scene.add ( legFL_Joint1 );
legFL_Joint1.matrixAutoUpdate = false;


//////////////////////////////////////////////////////////////////
//  LEGS MATERIALS
//////////////////////////////////////////////////////////////////
// FRONTLEGS : RIGHT
//////////////////////////////////////////////////////////////////

 // Leg: Front Right

var legFR1_Length = 0.6;
var legFR1_Angle = -10;       // animation parameter
var legFR1_Geometry = new THREE.CylinderGeometry(0.16, 0.08, legFR1_Length, 60);
var legFR1 = new THREE.Mesh( legFR1_Geometry, normalMaterial );
scene.add( legFR1 );
legFR1.matrixAutoUpdate = false;

var legFR2_Length = 0.4;
var legFR2_Angle = 15;       // animation parameter
var legFR2_Geometry = new THREE.CylinderGeometry(0.08, 0.05, legFR2_Length, 60);
var legFR2 = new THREE.Mesh( legFR2_Geometry, normalMaterial );
scene.add( legFR2 );
legFR2.matrixAutoUpdate = false;

var legFR3_Length = 0.1;
var legFR3_Angle = -5;       // animation parameter
var legFR3_Geometry = new THREE.CylinderGeometry(0.05, 0.1, legFR3_Length, 60);
var legFR3 = new THREE.Mesh( legFR3_Geometry, normalMaterial );
scene.add( legFR3 );
legFR3.matrixAutoUpdate = false;

var legFR_Joint1_Geometry = new THREE.SphereGeometry(0.08, 32, 32);
var legFR_Joint1=new THREE.Mesh (legFR_Joint1_Geometry, normalMaterial );
scene.add ( legFR_Joint1 );
legFR_Joint1.matrixAutoUpdate = false;

  // Leg: Back Left

var legB1_Length = 0.15;
var legB1_Angle = -10;       // animation parameter
var legBL1_Geometry = new THREE.CylinderGeometry(0.14, 0.12, legB1_Length, 60);
var legBL1 = new THREE.Mesh( legBL1_Geometry, normalMaterial );
scene.add( legBL1 );
legBL1.matrixAutoUpdate = false;

var legB2_Length = 0.5;
var legB2_Angle = 35;       // animation parameter
var legBL2_Geometry = new THREE.CylinderGeometry(0.12, 0.08, legB2_Length, 60);
var legBL2 = new THREE.Mesh( legBL2_Geometry, normalMaterial );
scene.add( legBL2 );
legBL2.matrixAutoUpdate = false;

var legB3_Length = 0.5;
var legB3_Angle = -40;       // animation parameter
var legBL3_Geometry = new THREE.CylinderGeometry(0.08, 0.05, legB2_Length, 60);
var legBL3 = new THREE.Mesh( legBL3_Geometry, normalMaterial );
scene.add( legBL3 );
legBL3.matrixAutoUpdate = false;

var legB4_Length = 0.1;
var legB4_Angle = 15;       // animation parameter
var legBL4_Geometry = new THREE.CylinderGeometry(0.05, 0.1, legB4_Length, 60);
var legBL4 = new THREE.Mesh( legBL4_Geometry, normalMaterial );
scene.add( legBL4 );
legBL4.matrixAutoUpdate = false;

var legBL_Joint1_Geometry = new THREE.SphereGeometry(0.12, 32, 32);
var legBL_Joint1=new THREE.Mesh (legBL_Joint1_Geometry, normalMaterial );
scene.add ( legBL_Joint1 );
legBL_Joint1.matrixAutoUpdate = false;

var legBL_Joint2_Geometry = new THREE.SphereGeometry(0.08, 32, 32);
var legBL_Joint2=new THREE.Mesh (legBL_Joint2_Geometry, normalMaterial );
scene.add ( legBL_Joint2 );
legBL_Joint2.matrixAutoUpdate = false;

  // Leg: Back Right

var legB1_Length = 0.15;
var legBR1_Angle = -10;       // animation parameter
var legBR1_Geometry = new THREE.CylinderGeometry(0.14, 0.12, legB1_Length, 60);
var legBR1 = new THREE.Mesh( legBR1_Geometry, normalMaterial );
scene.add( legBR1 );
legBR1.matrixAutoUpdate = false;

var legB2_Length = 0.5;
var legBR2_Angle = 35;       // animation parameter
var legBR2_Geometry = new THREE.CylinderGeometry(0.12, 0.08, legB2_Length, 60);
var legBR2 = new THREE.Mesh( legBR2_Geometry, normalMaterial );
scene.add( legBR2 );
legBR2.matrixAutoUpdate = false;

var legB3_Length = 0.5;
var legBR3_Angle = -40;       // animation parameter
var legBR3_Geometry = new THREE.CylinderGeometry(0.08, 0.05, legB2_Length, 60);
var legBR3 = new THREE.Mesh( legBR3_Geometry, normalMaterial );
scene.add( legBR3 );
legBR3.matrixAutoUpdate = false;

var legB4_Length = 0.1;
var legBR4_Angle = 15;       // animation parameter
var legBR4_Geometry = new THREE.CylinderGeometry(0.05, 0.1, legB4_Length, 60);
var legBR4 = new THREE.Mesh( legBR4_Geometry, normalMaterial );
scene.add( legBR4 );
legBR4.matrixAutoUpdate = false;

var legBR_Joint1_Geometry = new THREE.SphereGeometry(0.12, 32, 32);
var legBR_Joint1=new THREE.Mesh (legBR_Joint1_Geometry, normalMaterial );
scene.add ( legBR_Joint1 );
legBR_Joint1.matrixAutoUpdate = false;

var legBR_Joint2_Geometry = new THREE.SphereGeometry(0.08, 32, 32);
var legBR_Joint2=new THREE.Mesh (legBR_Joint2_Geometry, normalMaterial );
scene.add ( legBR_Joint2 );
legBR_Joint2.matrixAutoUpdate = false;

//////////////////////////////////////////////////////////////////

  // Arm: Left

  var armL_Joint1_Geometry = new THREE.SphereGeometry(0.12, 32, 32);
  var armL_Joint1=new THREE.Mesh (armL_Joint1_Geometry, normalMaterial );
  scene.add ( armL_Joint1 );
  armL_Joint1.matrixAutoUpdate = false;

  var arm1_Length = 0.4;
  var arm1_AngleX = -2;
  var arm1_AngleY = 0;
  var arm1_AngleZ = -5;
  var armL1_Geometry = new THREE.CylinderGeometry(0.11, 0.08, arm1_Length, 60);
  var armL1 = new THREE.Mesh( armL1_Geometry, normalMaterial );
  scene.add (armL1);
  armL1.matrixAutoUpdate = false;

  var armL_Joint2_Geometry = new THREE.SphereGeometry(0.08, 32, 32);
  var armL_Joint2=new THREE.Mesh (armL_Joint2_Geometry, normalMaterial );
  scene.add ( armL_Joint2 );
  armL_Joint2.matrixAutoUpdate = false;

  var arm2_Length = 0.4;
  var arm2_AngleX = -6;
  var arm2_AngleY = 0; 
  var arm2_AngleZ =0;
  var armL2_Geometry = new THREE.CylinderGeometry(0.08, 0.05, arm2_Length, 60);
  var armL2 = new THREE.Mesh( armL2_Geometry, normalMaterial );
  scene.add (armL2);
  armL2.matrixAutoUpdate = false;

  var armL_Joint3_Geometry = new THREE.SphereGeometry(0.05, 32, 32);
  var armL_Joint3=new THREE.Mesh (armL_Joint3_Geometry, normalMaterial );
  scene.add ( armL_Joint3 );
  armL_Joint3.matrixAutoUpdate = false;

  var arm3_Length = 0.5;
  var arm3_AngleX = 3;
  var arm3_AngleY = 100;
  var arm3_AngleZ = 7;
  var armL3_Geometry = new THREE.BoxGeometry( 0.15, 0.2, 0.05 );
  var armL3 = new THREE.Mesh( armL3_Geometry, normalMaterial );
  scene.add (armL3);
  armL3.matrixAutoUpdate = false;


  // Arm: Right

  var armR_Joint1_Geometry = new THREE.SphereGeometry(0.12, 32, 32);
  var armR_Joint1=new THREE.Mesh (armR_Joint1_Geometry, normalMaterial );
  scene.add ( armR_Joint1 );
  armR_Joint1.matrixAutoUpdate = false;

  var arm1_Length = 0.4;
  var arm1R_AngleX = 2;
  var arm1R_AngleY = 0;
  var arm1R_AngleZ = 5;
  var armR1_Geometry = new THREE.CylinderGeometry(0.11, 0.08, arm1_Length, 60);
  var armR1 = new THREE.Mesh( armR1_Geometry, normalMaterial );
  scene.add (armR1);
  armR1.matrixAutoUpdate = false;

  var armR_Joint2_Geometry = new THREE.SphereGeometry(0.08, 32, 32);
  var armR_Joint2=new THREE.Mesh (armR_Joint2_Geometry, normalMaterial );
  scene.add ( armR_Joint2 );
  armR_Joint2.matrixAutoUpdate = false;

  var arm2_Length = 0.4;
  var arm2R_AngleX = 6;
  var arm2R_AngleY = 0; 
  var arm2R_AngleZ =0;
  var armR2_Geometry = new THREE.CylinderGeometry(0.08, 0.05, arm2_Length, 60);
  var armR2 = new THREE.Mesh( armR2_Geometry, normalMaterial );
  scene.add (armR2);
  armR2.matrixAutoUpdate = false;

  var armR_Joint3_Geometry = new THREE.SphereGeometry(0.05, 32, 32);
  var armR_Joint3=new THREE.Mesh (armR_Joint3_Geometry, normalMaterial );
  scene.add ( armR_Joint3 );
  armR_Joint3.matrixAutoUpdate = false;

  var arm3_Length = 0.5;
  var arm3R_AngleX = -3;
  var arm3R_AngleY = -100;
  var arm3R_AngleZ = -7;
  var armR3_Geometry = new THREE.BoxGeometry( 0.15, 0.2, 0.05 );
  var armR3 = new THREE.Mesh( armR3_Geometry, normalMaterial );
  scene.add (armR3);
  armR3.matrixAutoUpdate = false;




  // Body

loadOBJ('body','centaur/cent_no_legs_no_arms.obj',normalMaterial,1,0,0,0,0,0,0);

//////////////////////////////////////////////////////////////////
// printMatrix():  prints a matrix
//////////////////////////////////////////////////////////////////

function printMatrix(name,matrix) {       // matrices are stored column-major, although matrix.set() uses row-major
    console.log('Matrix ',name);
    var e = matrix.elements;
    console.log(e[0], e[4], e[8], e[12]);
    console.log(e[1], e[5], e[9], e[13]);
    console.log(e[2], e[6], e[10], e[14]);
    console.log(e[3], e[7], e[11], e[15]);
}



//////////////////////////////////////////////////////////////////
// setupBody():  build model Matrix for body, and then its children
//////////////////////////////////////////////////////////////////

var bodyHeight=0.3;
var bodyX=0;
var bodyZ=0;
var headAngle=-3;
var bodyAngleY=0;
//set up body coordinates, and then legs in correlations to that, so that the legs move as the body moved


function setupBody(parentMatrix) {
//  printMatrix("body parent",parentMatrix);
  body.matrix.copy(parentMatrix);     // copy the parent link transformation
  body.matrix.multiply(new THREE.Matrix4().makeTranslation(bodyX,bodyHeight,bodyZ));        // post multiply by translate matrix
  body.matrix.multiply(new THREE.Matrix4().makeRotationX(headAngle*Math.PI/180.0));      // post multiply by rotation matrix (3 deg rotation)
  body.matrix.multiply(new THREE.Matrix4().makeRotationY(bodyAngleY*Math.PI/180.0));
  setupLegFL1(body.matrix);           // draw children, i.e., attached objects
  setupArmL_Joint1(body.matrix);
  setupArmR_Joint1(body.matrix);
  setupLegFR1(body.matrix); 
  setupLegBL1(body.matrix);
  setuplegBR1(body.matrix);
//body.matrix.multiply(new THREE.Matrix4().makeScale(0.3,0.3,0.3));   // post multiply by scale matrix, to scale down body geometry
 body.matrix.multiply(new THREE.Matrix4().makeScale(0.07,0.07,0.07));   // post multiply by scale matrix, to scale down body geometry
  body.updateMatrixWorld();         // force update of internal body.matrixWorld
}

//////////////////////////////////////////////////////////////////
// setupHead():  build model Matrix for head
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
// FRONTLEGS : LEFT
//////////////////////////////////////////////////////////////////

function setupLegFL1(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legFL1.matrix.copy(parentMatrix);     // copy the parent link transformation
  legFL1.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.17,0.8,0.4));              // post multiply by translate matrix
  legFL1.matrix.multiply(new THREE.Matrix4().makeRotationX(leg1_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legFL1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legFL1_Length,0));              // post multiply by translate matrix
  legFL1.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegFL2(legFL1.matrix);
  setupLegFL_Joint1(legFL1.matrix);
}
function setupLegFL_Joint1(parentMatrix){
  legFL_Joint1.matrix.copy(parentMatrix);
  legFL_Joint1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.3,0.0));
  legFL_Joint1.updateMatrixWorld();
}
function setupLegFL2(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legFL2.matrix.copy(parentMatrix);     // copy the parent link transformation
  legFL2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.3,0.0));              // post multiply by translate matrix
  legFL2.matrix.multiply(new THREE.Matrix4().makeRotationX(leg2_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legFL2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legFL2_Length,0));              // post multiply by translate matrix
  legFL2.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegFL3(legFL2.matrix);
}
function setupLegFL3(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legFL3.matrix.copy(parentMatrix);     // copy the parent link transformation
  legFL3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.2,0.0));              // post multiply by translate matrix
  legFL3.matrix.multiply(new THREE.Matrix4().makeRotationX(leg3_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legFL3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legFL3_Length,0));              // post multiply by translate matrix
  legFL3.updateMatrixWorld();         // force update of internal body.matrixWorld
}


//////////////////////////////////////////////////////////////////
//  LEGS SETUP
function setupLegFR1(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legFR1.matrix.copy(parentMatrix);     // copy the parent link transformation
  legFR1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.17,0.8,0.4));              // post multiply by translate matrix
  legFR1.matrix.multiply(new THREE.Matrix4().makeRotationX(legFR1_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legFR1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legFR1_Length,0));              // post multiply by translate matrix
  legFR1.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegFR2(legFR1.matrix);
  setupLegFR_Joint1(legFR1.matrix);
}
function setupLegFR_Joint1(parentMatrix){
  legFR_Joint1.matrix.copy(parentMatrix);
  legFR_Joint1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.3,0.0));
  legFR_Joint1.updateMatrixWorld();
}
function setupLegFR2(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legFR2.matrix.copy(parentMatrix);     // copy the parent link transformation
  legFR2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.3,0.0));              // post multiply by translate matrix
  legFR2.matrix.multiply(new THREE.Matrix4().makeRotationX(legFR2_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legFR2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legFR2_Length,0));              // post multiply by translate matrix
  legFR2.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegFR3(legFR2.matrix);
}
function setupLegFR3(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legFR3.matrix.copy(parentMatrix);     // copy the parent link transformation
  legFR3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.2,0.0));              // post multiply by translate matrix
  legFR3.matrix.multiply(new THREE.Matrix4().makeRotationX(legFR3_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legFR3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legFR3_Length,0));              // post multiply by translate matrix
  legFR3.updateMatrixWorld();         // force update of internal body.matrixWorld
}

//////////////////////////////////////////////////////////////////
// BACKLEGS : LEFT
//////////////////////////////////////////////////////////////////
function setupLegBL1(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBL1.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBL1.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.1,0.8,-0.3));              // post multiply by translate matrix
  legBL1.matrix.multiply(new THREE.Matrix4().makeRotationX(legB1_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBL1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB1_Length,0));              // post multiply by translate matrix
  legBL1.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegBL2(legBL1.matrix);
  setupLegBL_Joint1(legBL1.matrix);
}
function setupLegBL_Joint1(parentMatrix){
  legBL_Joint1.matrix.copy(parentMatrix);
  legBL_Joint1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.05,0.0));
  legBL_Joint1.updateMatrixWorld();
}
function setupLegBL2(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBL2.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBL2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.05,0.0));              // post multiply by translate matrix
  legBL2.matrix.multiply(new THREE.Matrix4().makeRotationX(legB2_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBL2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB2_Length,0));              // post multiply by translate matrix
  legBL2.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegBL3(legBL2.matrix);
  setupLegBL_Joint2(legBL2.matrix);
  }
function setupLegBL_Joint2(parentMatrix){
  legBL_Joint2.matrix.copy(parentMatrix);
  legBL_Joint2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.26,0.0));
  legBL_Joint2.updateMatrixWorld();
}
function setupLegBL3(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBL3.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBL3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.25,0.0));              // post multiply by translate matrix
  legBL3.matrix.multiply(new THREE.Matrix4().makeRotationX(legB3_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBL3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB3_Length,0));              // post multiply by translate matrix
  legBL3.updateMatrixWorld();         // force update of internal body.matrixWorld
  setupLegBL4(legBL3.matrix); 
}
function setupLegBL4(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBL4.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBL4.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.2,0.0));              // post multiply by translate matrix
  legBL4.matrix.multiply(new THREE.Matrix4().makeRotationX(legB4_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBL4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB4_Length,0));              // post multiply by translate matrix
  legBL4.updateMatrixWorld();
}

//////////////////////////////////////////////////////////////////
// BACKLEGS : RIGHT
//////////////////////////////////////////////////////////////////
function setuplegBR1(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBR1.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBR1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.1,0.8,-0.3));              // post multiply by translate matrix
  legBR1.matrix.multiply(new THREE.Matrix4().makeRotationX(legBR1_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBR1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB1_Length,0));              // post multiply by translate matrix
  legBR1.updateMatrixWorld();         // force update of internal body.matrixWorld
  setuplegBR2(legBR1.matrix);
  setuplegBR_Joint1(legBR1.matrix);
}
function setuplegBR_Joint1(parentMatrix){
  legBR_Joint1.matrix.copy(parentMatrix);
  legBR_Joint1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.05,0.0));
  legBR_Joint1.updateMatrixWorld();
}
function setuplegBR2(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBR2.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBR2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.05,0.0));              // post multiply by translate matrix
  legBR2.matrix.multiply(new THREE.Matrix4().makeRotationX(legBR2_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBR2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB2_Length,0));              // post multiply by translate matrix
  legBR2.updateMatrixWorld();         // force update of internal body.matrixWorld
  setuplegBR3(legBR2.matrix);
  setuplegBR_Joint2(legBR2.matrix);
  }
function setuplegBR_Joint2(parentMatrix){
  legBR_Joint2.matrix.copy(parentMatrix);
  legBR_Joint2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.26,0.0));
  legBR_Joint2.updateMatrixWorld();
}
function setuplegBR3(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBR3.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBR3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.25,0.0));              // post multiply by translate matrix
  legBR3.matrix.multiply(new THREE.Matrix4().makeRotationX(legBR3_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBR3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB3_Length,0));              // post multiply by translate matrix
  legBR3.updateMatrixWorld();         // force update of internal body.matrixWorld
  setuplegBR4(legBR3.matrix); 
}
function setuplegBR4(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  legBR4.matrix.copy(parentMatrix);     // copy the parent link transformation
  legBR4.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.2,0.0));              // post multiply by translate matrix
  legBR4.matrix.multiply(new THREE.Matrix4().makeRotationX(legBR4_Angle*Math.PI/180.0));           // post multiply by rotation matrix
  legBR4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB4_Length,0));              // post multiply by translate matrix
  legBR4.updateMatrixWorld();
}

//////////////////////////////////////////////////////////////////

function setupArmL_Joint1(parentMatrix){
  armL_Joint1.matrix.copy(parentMatrix);
  armL_Joint1.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.3,1.73,0.3));
  armL_Joint1.updateMatrixWorld();
  setupArmL1(armL_Joint1.matrix);
}

function setupArmL1(parentMatrix) {
  armL1.matrix.copy(parentMatrix);
  armL1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,0.0,0.0));
  armL1.matrix.multiply(new THREE.Matrix4().makeRotationZ(arm1_AngleZ*Math.PI/180.0));
  armL1.matrix.multiply(new THREE.Matrix4().makeRotationY(arm1_AngleY*Math.PI/180.0));
  armL1.matrix.multiply(new THREE.Matrix4().makeRotationX(arm1_AngleX*Math.PI/180.0));
  armL1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*arm1_Length,0)); 
  armL1.updateMatrixWorld();
  setupArmL_Joint2(armL1.matrix);
}

function setupArmL_Joint2(parentMatrix){
  armL_Joint2.matrix.copy(parentMatrix);
  armL_Joint2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.24,0.0));
  armL_Joint2.updateMatrixWorld();
  setupArmL2(armL_Joint2.matrix);
}

function setupArmL2(parentMatrix){
  armL2.matrix.copy(parentMatrix);
  armL2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.03,0.0));
  armL2.matrix.multiply(new THREE.Matrix4().makeRotationZ(arm2_AngleZ*Math.PI/180.0));
  armL2.matrix.multiply(new THREE.Matrix4().makeRotationY(arm2_AngleY*Math.PI/180.0));
  armL2.matrix.multiply(new THREE.Matrix4().makeRotationX(arm2_AngleX*Math.PI/180.0));
  armL2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*arm2_Length,0)); 
  armL2.updateMatrixWorld();
  setupArmL_Joint3(armL2.matrix);
}

function setupArmL_Joint3(parentMatrix){
  armL_Joint3.matrix.copy(parentMatrix);
  armL_Joint3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.23,0.0));
  armL_Joint3.updateMatrixWorld();
  setupArmL3(armL_Joint3.matrix);
}

function setupArmL3(parentMatrix){
  armL3.matrix.copy(parentMatrix);
  armL3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,0.1,0.0));
  armL3.matrix.multiply(new THREE.Matrix4().makeRotationZ(arm3_AngleZ*Math.PI/180.0));
  armL3.matrix.multiply(new THREE.Matrix4().makeRotationX(arm3_AngleX*Math.PI/180.0));
  armL3.matrix.multiply(new THREE.Matrix4().makeRotationY(arm3_AngleY*Math.PI/180.0));
  armL3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*arm3_Length,0)); 
  armL3.updateMatrixWorld();
}

//////////////////////////////////////////////////////////////////

function setupArmR_Joint1(parentMatrix){
  armR_Joint1.matrix.copy(parentMatrix);
  armR_Joint1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.3,1.73,0.3));
  armR_Joint1.updateMatrixWorld();
  setupArmR1(armR_Joint1.matrix);
}

function setupArmR1(parentMatrix) {
  armR1.matrix.copy(parentMatrix);
  armR1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,0.0,0.0));
  armR1.matrix.multiply(new THREE.Matrix4().makeRotationZ(arm1R_AngleZ*Math.PI/180.0));
  armR1.matrix.multiply(new THREE.Matrix4().makeRotationY(arm1R_AngleY*Math.PI/180.0));
  armR1.matrix.multiply(new THREE.Matrix4().makeRotationX(arm1R_AngleX*Math.PI/180.0));
  armR1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*arm1_Length,0)); 
  armR1.updateMatrixWorld();
  setupArmR_Joint2(armR1.matrix);
}

function setupArmR_Joint2(parentMatrix){
  armR_Joint2.matrix.copy(parentMatrix);
  armR_Joint2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.24,0.0));
  armR_Joint2.updateMatrixWorld();
  setupArmR2(armR_Joint2.matrix);
}

function setupArmR2(parentMatrix){
  armR2.matrix.copy(parentMatrix);
  armR2.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.03,0.0));
  armR2.matrix.multiply(new THREE.Matrix4().makeRotationZ(arm2R_AngleZ*Math.PI/180.0));
  armR2.matrix.multiply(new THREE.Matrix4().makeRotationY(arm2R_AngleY*Math.PI/180.0));
  armR2.matrix.multiply(new THREE.Matrix4().makeRotationX(arm2R_AngleX*Math.PI/180.0));
  armR2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*arm2_Length,0)); 
  armR2.updateMatrixWorld();
  setupArmR_Joint3(armR2.matrix);
}

function setupArmR_Joint3(parentMatrix){
  armR_Joint3.matrix.copy(parentMatrix);
  armR_Joint3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.23,0.0));
  armR_Joint3.updateMatrixWorld();
  setupArmR3(armR_Joint3.matrix);
}

function setupArmR3(parentMatrix){
  armR3.matrix.copy(parentMatrix);
  armR3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,0.1,0.0));
  armR3.matrix.multiply(new THREE.Matrix4().makeRotationZ(arm3R_AngleZ*Math.PI/180.0));
  armR3.matrix.multiply(new THREE.Matrix4().makeRotationX(arm3R_AngleX*Math.PI/180.0));
  armR3.matrix.multiply(new THREE.Matrix4().makeRotationY(arm3R_AngleY*Math.PI/180.0));
  armR3.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*arm3_Length,0)); 
  armR3.updateMatrixWorld();
}



//////////////////////////////////////////////////////////////////
// updateWorld():  update all degrees of freedom, as needed, and recompute matrices
//////////////////////////////////////////////////////////////////

var clock = new THREE.Clock(true);

function updateWorld() {
  var modelMatrix = new THREE.Matrix4();
  modelMatrix.identity();
    // only start the matrix setup if the 'body' object has been loaded
  if (body != undefined) {   
    setupBody(modelMatrix);     
  }
}


//////////////////////////////////////////////////////////////////
//  checkKeyboard():   listen for keyboard presses
//////////////////////////////////////////////////////////////////
var keyboard = new THREEx.KeyboardState();
var mode = 0;
function checkKeyboard() {
   body = scene.getObjectByName( 'body' );

    if (body != undefined) {
     body.matrixAutoUpdate = false;
   }

  for (var i=0; i<6; i++)
  {
    if (keyboard.pressed(i.toString()))
    {
      mode = i;
      break;
    }
  }
  switch(mode)
  {
    //add poses here:
    case 0:       // pose
      headAngle = 0;

      leg1_Angle = -50;
      leg2_Angle = 80;
      leg3_Angle = 0;

      legBR1_Angle= -60;
      legBR2_Angle= 100;
      legBR3_Angle= -80;
      legBR4_Angle= 60;


      legFR1_Angle= 5;
      legFR2_Angle= 2;
      legFR3_Angle= -8;

      legB1_Angle= 20;
      legB2_Angle= 10;
      legB3_Angle= -35;
      legB4_Angle= 5;


      break;     
    case 1:       // pose hind legs raised
      
      headAngle = 20;

      leg1_Angle = -5;
      leg2_Angle = 0;
      leg3_Angle = -15;

      legFR1_Angle= -35;
      legFR2_Angle= 5;
      legFR3_Angle= 5;

      legB1_Angle= 30;
      legB2_Angle= 60;
      legB3_Angle= 20;
      legB4_Angle= 30;

      legBR1_Angle= 10;
      legBR2_Angle= 60;
      legBR3_Angle= -120;
      legBR4_Angle= 40;

      break;
    case 2:       // pose front legs raised
      headAngle = -30;

      leg1_Angle = -80;
      leg2_Angle = 100;
      leg3_Angle = 40;

      legFR1_Angle= -120;
      legFR2_Angle= 80;
      legFR3_Angle= 50;

      legB1_Angle= 20;
      legB2_Angle= 35;
      legB3_Angle= -55;
      legB4_Angle= 30;

      legBR1_Angle= 20;
      legBR2_Angle= 35;
      legBR3_Angle= -55;
      legBR4_Angle= 30;

      break;
    case 3:      {     // animation
        var t = clock.getElapsedTime();
        
        //var t = 1.7
        var frontt = t + 1.0;
        var backt = t - 0.3;

        var heightt= frontt+1.9;
        bodyHeight = 0.2*Math.sin(3*(heightt))+0.6;
        
        leg1_Angle = 50*Math.sin(3*frontt)-20;
        leg2_Angle = 60*Math.sin(3*(frontt-0.5))+50;
        leg3_Angle = 30*Math.sin(3*(frontt-0.5))+20;

        var frontrightt= frontt+0.5;

        legFR1_Angle= 50*Math.sin(3*frontrightt)-20;
        legFR2_Angle= 60*Math.sin(3*(frontrightt-0.5))+50;
        legFR3_Angle= 30*Math.sin(3*(frontrightt-0.5))+20;
        
        
        var backrightt= backt+0.3;
        legBR1_Angle= 30*Math.sin(3*backrightt)-10;
        legBR2_Angle= 60*Math.sin(3*(backrightt-0.7))+40;
        legBR3_Angle= 40*Math.sin(3*(backrightt+0.2))-30;
        legBR4_Angle= 30*Math.sin(3*(backrightt))+20;
        
        legB1_Angle= 30*Math.sin(3*backt)-10;
        legB2_Angle= 60*Math.sin(3*(backt-0.7))+40;
        legB3_Angle= 40*Math.sin(3*(backt+0.2))-30;
        legB4_Angle= 30*Math.sin(3*(backt))+20;
    
        bodyX=8*Math.sin(t/5);
        bodyZ=8*Math.cos(t/5);

        bodyAngleY=(11*t) + 90;

		    arm1_AngleX= 40*Math.sin(3*frontrightt);
        arm1_AngleY= 20*Math.sin(3*frontrightt);
		    arm2_AngleX= 25*Math.sin(3*frontrightt) - 20;
        arm2_AngleY= -40*Math.sin(3*frontrightt);
        arm2_AngleZ= -5*Math.sin(3*frontrightt);
        arm3_AngleY=-20*Math.sin(3*frontrightt) + 100;
        arm1R_AngleX= -40*Math.sin(3*frontrightt);
        arm1R_AngleY= 20*Math.sin(3*frontrightt);
        arm2R_AngleX= -25*Math.sin(3*frontrightt) - 20;
        arm2R_AngleY= -40*Math.sin(3*frontrightt);
        arm2R_AngleZ= -5*Math.sin(3*frontrightt);
        arm3R_AngleY= -20*Math.sin(3*frontrightt) + 100;  
        console.log("hello");

      }
      camera.matrixAutoUpdate = true;
      break;
    case 4:  // camera moves with left hind leg and looks at front right leg

      var camera1_Geometry = new THREE.SphereGeometry(0.05, 32, 32);
      var camera1 = new THREE.Mesh( camera1_Geometry, brownMaterial );
      scene.add( camera1 );
      camera1.matrixAutoUpdate = false;
      
      var cameraMatrix = new THREE.Matrix4();  
      cameraMatrix.identity();

      camera1.matrix.copy(cameraMatrix);     // copy the parent link transformation


      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(bodyX,bodyHeight,bodyZ));        // post multiply by translate matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeRotationX(headAngle*Math.PI/180.0));      // post multiply by rotation matrix (3 deg rotation)
      camera1.matrix.multiply(new THREE.Matrix4().makeRotationY(bodyAngleY*Math.PI/180.0));

      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.1,0.8,-0.3));              // post multiply by translate matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeRotationX(legB1_Angle*Math.PI/180.0));           // post multiply by rotation matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB1_Length,0));

      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.05,0.0));              // post multiply by translate matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeRotationX(legBR2_Angle*Math.PI/180.0));           // post multiply by rotation matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB2_Length,0));  

      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.25,0.0));              // post multiply by translate matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeRotationX(legBR3_Angle*Math.PI/180.0));           // post multiply by rotation matrix
      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legB3_Length,0));   

      camera1.matrix.multiply(new THREE.Matrix4().makeTranslation(0.0,-0.5,0.6)); 

      camera1.updateMatrixWorld(true);
      
      break;
    default:
      break;
  }
}


//////////////////////////////////////////////////////////////////
//  update()
//////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  renderer.render(scene, camera);
  updateWorld();
  requestAnimationFrame(update);     // this requests the next update call
}

update();     // launch an infinite drawing loop
