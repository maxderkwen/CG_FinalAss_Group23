
var gui;
function buildGui() {
    gui = new dat.GUI();
    var params = {
        color: groundMat.color.getHex(),
        switch: wireFrameOn
    }
    gui.addColor(params, 'color').name("Ground Color").onChange(function(val) {
        groundMat.color.setHex(val);
    });

    // on/off button
    gui.add(params, "switch").name("wire frame On").onChange(function(val) {
        updateSceneModelWireFrame(val);
    });;

    gui.open();
}

function updateSceneModelWireFrame(val){
    scene.traverse( function( node ) {

        if ( node instanceof THREE.Mesh ) {
                node.material.wireframe = val;
    
        }
    
    } );
}