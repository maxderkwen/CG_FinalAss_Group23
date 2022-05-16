
var gui;
function buildGui() {
    gui = new dat.GUI();
    var params = {
        color: groundMat.color.getHex(),
        switch: wireFrameOn,
        volume:ambientSound.getVolume(),
        
    }
    gui.addColor(params, 'color').name("Ground Color").onChange(function(val) {
        groundMat.color.setHex(val);
    });

    // on/off button
    gui.add(params, "switch").name("Wireframe On").onChange(function(val) {
        UpdateSceneModelWireFrame(val);
    });;

    gui.add(params, "volume",0,2).name("Music Volume").onChange(function(val) {
        ambientSound.setVolume(val);
    });;
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
    let N = 128; //控制音频分析器返回频率数据数量
    for (let i = 0; i < N / 2; i++) {
      var box = new THREE.BoxGeometry(2, 1, 2); //创建一个立方体几何对象
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff*Math.random()
      }); //材质对象
      var mesh = new THREE.Mesh(box, material); //网格模型对象
      // 长方体间隔20，整体居中
      mesh.position.set(4 * i - N / 2 * 2, 50, -150)
      audioGroup.add(mesh)
    }
    mainAudioBar.position.set(0, 60, -100)
    scene.add(mainAudioBar);
    scene.add(audioGroup);
}
