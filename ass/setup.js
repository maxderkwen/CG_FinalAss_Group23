var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var fov=60;
var camera = new THREE.PerspectiveCamera(fov, ratio, 0.1, 2000);
var renderer = new THREE.WebGLRenderer();
var listener=new THREE.AudioListener();
var ambientSound=new THREE.Audio(listener);
var analyser = new THREE.AudioAnalyser(ambientSound,128);

var controls;

var audioLoader=new THREE.AudioLoader();
audioLoader.load("sounds/EndlessCarnival.mp3",function(buffer){
    ambientSound.setBuffer(buffer); 
    ambientSound.setLoop(true);
    ambientSound.play();
    ambientSound.stop();
},function(xhr){// onProgress
    console.log("audio "+(xhr.loaded/xhr.total)*100+" % loaded");
},function(error){// onError
    console.error("an error happened !");
});	


function setScene() {

    camera.position.set(-45, 50, 45);
    camera.lookAt(0, 0, 0);
    camera.add(listener);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    CreateAudioBar();
    
}

var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}