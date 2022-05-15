


const loader = new THREE.PLYLoader();

function loadPLYModel(x,y,z) {
    var tempModel =new THREE.Mesh();  
    loader.load('/models/chopper.ply', 
    function(geometry) {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        
        var material=new THREE.MeshPhongMaterial();
        material.color.set(new THREE.Color(Math.random(),Math.random(),Math.random()));
        tempModel.geometry=geometry;
        tempModel.material=material;
        tempModel.rotateX(-90);
        tempModel.position.set(x,y+25,z+25);
        tempModel.updateMatrix();
        tempModel.castShadow=true;
        tempModel.receiveShadow=true;
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
    console.log(merged);

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
var doorsNum = 2;
var startPosZ= 0;
var groundMat;
var wireFrameOn=false;

function addShapes() {

    for(let i=0;i<doorsNum;i++){
        var floorTemp = createBox(30,0.1,80,0.8,0.8,0.8);
        floorTemp.position.set(0,-10,startPosZ-i*80);
        floorTemp.updateMatrix();
        floors.push(floorTemp);
        group.add(floorTemp);
        
        var tempLoadModel=loadPLYModel(0,-20,startPosZ-i*80);
        floors.push(tempLoadModel);
        group.add(tempLoadModel);

        var doorTemp = createDoor(5,5,Math.random(),Math.random(),Math.random());
        doorTemp.position.set(0,0,startPosZ-i*80);
        doorTemp.updateMatrix();
        doors.push(doorTemp);
        group.add(doorTemp);
        
    }
    

    var groundTemp = createBox(3000,0.1,3000,0.2,0.5,0.2);
    groundTemp.position.set(0,-10.2,0);
    groundTemp.receiveShadow=true;
    groundMat=groundTemp.material;

    addLight();
    scene.add(ambientlight);
    scene.add(sceneLight);
    scene.add(camera);
    scene.add(group);
    scene.add(groundTemp);
    
}

var cameralight;
var ambientlight;
var sceneLight;
function addLight() {

    sceneLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
    sceneLight.position.set(35,20,50);
    sceneLight.castShadow =true;
    sceneLight.shadow.mapSize=new THREE.Vector2(2048,2048);
    sceneLight.shadow.camera.near=0.1;
    sceneLight.shadow.camera.far=1000;
    sceneLight.shadow.bias=-0.001;
    
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1),0.5);

}

