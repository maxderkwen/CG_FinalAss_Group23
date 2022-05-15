var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var fov=60;
var camera = new THREE.PerspectiveCamera(fov, ratio, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls;
function setScene() {

    camera.position.set(-45, 50, 45);
    camera.lookAt(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}