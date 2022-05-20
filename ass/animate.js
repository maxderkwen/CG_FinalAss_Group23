
var fastSpeed=20.0;

 function animateDoor(object){    
        //object is THREE.Mesh
        object.position.z += fastSpeed;
        if(object.position.z>camera.position.z+500){
            group.remove(object);
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


function animateAudioBarAllFrequency(){
    requestAnimationFrame(animateAudioBarAllFrequency);
    if (analyser) {
        // 获得频率数据N个
        var arr = analyser.getFrequencyData();
        // console.log(arr);
        // 遍历组对象，每个网格子对象设置一个对应的频率数据
        audioGroup.children.forEach((elem, index) => {
          elem.scale.y =  arr[index] / 10;
          
          elem.material.color.r = arr[index] / 200;
        });
        
    }
}

var currFrequency=-1.0;
var lastFrequency=-1.0;
var frequencyDifference=0;
var clock = new THREE.Clock();
var renderTime = 0.1;
var timer = 0;
function animateAudioBarAverageFrequency(){
    requestAnimationFrame(animateAudioBarAverageFrequency);
    var deltaTime = clock.getDelta();
    timer=timer+deltaTime;
    if (timer> renderTime &&analyser) {
        timer=0;
        lastFrequency=currFrequency;
        currFrequency = analyser.getAverageFrequency();
        mainAudioBar.scale.x = 300 * currFrequency / 256;
        frequencyDifference=currFrequency-lastFrequency;

        if(frequencyDifference>1 && frequencyDifference<15){
            groupAddShape(tempLoadModel1,1);
            ambientSound.setVolume(currentVolume*volumeChangeOffSet*0.8);
        }
        if(frequencyDifference>15)
        {
            groupAddShape(tempLoadModel2,0.02);
            ambientSound.setVolume(currentVolume*volumeChangeOffSet);
        }
        if(frequencyDifference<-9)
        {
            groupAddShape(tempLoadModel3,1);
            ambientSound.setVolume(currentVolume);
        }
       // console.log(tempLoadModel3.geometry.attributes.position);
    }
}