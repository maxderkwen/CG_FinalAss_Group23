
var gui;
var currentVolume=1.2;
var volumeChangeOffSet=0.5;
function buildGui() {
    gui = new dat.GUI();
    var musicPlaybutton = { add:function(){ ambientSound.play(); }};
    var musicStopbutton = { add:function(){ ambientSound.stop(); }};
    //var musicPlaybutton = { add:function(){ audioLoader.play(); }};
    //var musicStopbutton = { add:function(){  }};
    
    var params = {
        color: groundMat.color.getHex(),
        switch: wireFrameOn,
        volume:ambientSound.getVolume(),
        volumeOffset:volumeChangeOffSet,
        moveSpeed:fastSpeed
    }
    gui.addColor(params, 'color').name("Ground Color").onChange(function(val) {
        groundMat.color.setHex(val);
    });

    // on/off button
    gui.add(params, "switch").name("Wireframe On").onChange(function(val) {
        UpdateSceneModelWireFrame(val);
    });;

    gui.add(params, "volume",0,2).name("Music Volume").onChange(function(val) {
        currentVolume=val;
        ambientSound.setVolume(currentVolume);
    });;
    gui.add(params, "volumeOffset",0,2).name("VolumeOffset").onChange(function(val) {
        volumeChangeOffSet=val;
    });;
    gui.add(params, "moveSpeed",0,30).name("Move Speed").onChange(function(val) {
        fastSpeed=val;
    });;
    gui.add(musicPlaybutton,"add").name("Music Play Button");
    gui.add(musicStopbutton,"add").name("Music Stop Button");
    gui.open();
    
}

function UpdateSceneModelWireFrame(val){
    scene.traverse( function( node ) {

        if ( node instanceof THREE.Mesh ) {
                node.material.wireframe = val;
    
        }
    
    } );
}
var audioGroup = new THREE.Group();
var mainAudioBar=createBox(1,4,2,0.5,0.5,0.5);
function CreateAudioBar(){
    let N = 128; //
    for (let i = 0; i < N / 2; i++) {
      var box = new THREE.BoxBufferGeometry(2, 1, 2); //
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff*Math.random()
      }); 
      var mesh = new THREE.Mesh(box, material); //
      mesh.position.set(4 * i - N / 2 * 2, 50, -150)
      audioGroup.add(mesh)
    }
    mainAudioBar.position.set(0, 60, -100)
    scene.add(mainAudioBar);
    scene.add(audioGroup);
}
