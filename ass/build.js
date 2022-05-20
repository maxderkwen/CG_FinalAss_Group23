
const plyLoader = new THREE.PLYLoader();

function loadPLYModel(x,y,z,name,scale) {
    var tempModel =new THREE.Mesh();  
    plyLoader.load(name, 
    function(geometry) {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        var material=new THREE.MeshPhongMaterial();
        material.color.set(new THREE.Color(Math.random(),Math.random(),Math.random()));

        tempModel.geometry=geometry;
        tempModel.geometry.attributes=geometry.attributes;
        tempModel.material=material;
        tempModel.rotateX(-90);
        tempModel.position.set(x,y+25,z+25);
        tempModel.updateMatrix();
        tempModel.castShadow=true;
        tempModel.receiveShadow=true;
        tempModel.scale.set(scale,scale,scale);
    });
    return tempModel;
}

function createBox(width, height, depth,r,g,b){
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(r, g, b);
    material.side = THREE.DoubleSide;
    material.wireframe = false;
    var geometry = new THREE.BoxBufferGeometry(width, height, depth,1,1,1);
    var box = new THREE.Mesh(geometry, material);
    box.castShadow = true;
    box.receiveShadow = true;
    return box;
}
function createBoxGeometry(width, height, depth,x,y,z){
    let transform = new THREE.Object3D();
    transform.position.set(x,y,z);
    transform.updateMatrix();
    let geometry = new THREE.BoxBufferGeometry(width, height, depth,1,1,1);
    geometry.applyMatrix4(transform.matrix)
    return geometry;
}



var door=createDoor(0.8,1,1,1,0.5);

function createDoor(width,height,r,g,b){

    var box1 = createBoxGeometry(7,1,10,0,2.5,0);
    var box2 = createBoxGeometry(1,4,10,-2,0,0);
    var box3 = createBoxGeometry(1,4,10,2,0,0);

    var merged = THREE.BufferGeometryUtils.mergeBufferGeometries([box1, box2,box3]);

    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(r, g, b);
    material.side = THREE.DoubleSide;
    material.wireframe = false;

    var outputDoor = new THREE.Mesh(merged, material);
    outputDoor.scale.set(width,height,1);
    outputDoor.material.wireframe=false;
    outputDoor.material.color = new THREE.Color(r, g, b);
    outputDoor.castShadow = true;
    outputDoor.receiveShadow = true;
    
    return outputDoor;
}

var doors = new Array();
var floors = new Array();
const group = new THREE.Group();
var tempLoadModel1=loadPLYModel(-40,0,0,'/models/chopper.ply',1);
var tempLoadModel2=loadPLYModel(-60,0,0,'/models/airplane.ply',0.01);
var tempLoadModel3=loadPLYModel(-80,0,0,'/models/ant.ply',1);
var doorsNum = 1;
var startPosZ= -300;
var groundMat;
var wireFrameOn=false;



function addShapes() {
    var groundTemp = createBox(3000,0.1,3000,0.2,0.5,0.2);
    groundTemp.position.set(0,-10.2,0);
    groundTemp.receiveShadow=true;
    groundMat=groundTemp.material;

    addLight();

    scene.add(tempLoadModel1);
    scene.add(tempLoadModel2);
    scene.add(tempLoadModel3);

    scene.add(ambientlight);
    scene.add(sceneLight);
    scene.add(camera);
    scene.add(group);
    scene.add(groundTemp);

}


function groupAddShape(model,scale)
{
    var floorTemp = createBox(60,0.1,60,0.8,0.8,0.8);
    floorTemp.position.set(0,-10,startPosZ);
    floorTemp.updateMatrix();
    floors.push(floorTemp);
    group.add(floorTemp);

    var modelTemp=new THREE.Mesh(model.geometry,model.material);
    modelTemp.position.set(0,10+25,startPosZ+25);
    modelTemp.rotateX(-90);
    modelTemp.castShadow=true;
    modelTemp.receiveShadow=true;
    modelTemp.scale.set(scale,scale,scale);
    modelTemp.updateMatrix();
    doors.push(modelTemp);
    group.add(modelTemp);


    var doorTemp = createDoor(8,8,Math.random(),Math.random(),Math.random());
    doorTemp.position.set(0,0,startPosZ);
    doorTemp.updateMatrix();
    doors.push(doorTemp);
    group.add(doorTemp);
}



var cameralight;
var ambientlight;
var sceneLight;
function addLight() {

    sceneLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1.2);
    sceneLight.position.set(100,50,50);
    sceneLight.castShadow =true;
    sceneLight.shadow.mapSize=new THREE.Vector2(2048,2048);
    sceneLight.shadow.camera.near=0.1;
    sceneLight.shadow.camera.far=1000;
    sceneLight.shadow.bias=-0.001;
    
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1),0.5);

}

