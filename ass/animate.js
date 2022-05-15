
const fastSpeed=2.0;

 function animateDoor(object){    
        //object is THREE.Mesh
        object.position.z += fastSpeed;
        if(object.position.z>camera.position.z+500){
            object.position.z=camera.position.z-doors.length*60;
        }
}

function animateAllDoor(){
    renderer.render(scene, camera);
    doors.forEach(animateDoor);
    floors.forEach(animateDoor);
    requestAnimationFrame(animateAllDoor);
}

function animate(){
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}