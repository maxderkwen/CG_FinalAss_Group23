const r = 100;
var alpha = 0;
var dalpha = 2 * Math.PI / 200;
var tempGrassColor = new THREE.Color(1.0,0.5,1);
//render and animate the grassNoise
function grassNoiseShaderControl(model) {
    
    alpha += dalpha;
    var alphas=model.geometry.attributes.alpha.array;
    var offset =model.geometry.attributes.offset.array;
    var count = model.geometry.attributes.alpha.count;
    for (var i = 0; i < count; i++) {
        alphas[i] *= 0.5;
        offset[i]*=0.5;
        if (alphas[i] < 0.01) {
            alphas[i] = 5.0;
        }
        if (offset[i] < 0.1) {
            offset[i]=frequencyDifference;
        }
        //offset[0]=Math.random()*2.0;
    }
    model.geometry.attributes.alpha.needsUpdate = true;

    //color.setHex(Math.random() * 0xffffff);
    model.material.uniforms.color.value=tempGrassColor;
    
    offset.needsUpdate=true;
}

//render and animate the starNoise
function starNoiseShaderControl(model) {
    
    alpha += dalpha;
    var alphas=model.geometry.attributes.alpha.array;
    var offset =model.geometry.attributes.offset.array;
    var count = model.geometry.attributes.alpha.count;
    for (var i = 0; i < count; i++) {
        alphas[i]*= 0.2;
        offset[i]*=0.5;
        if (alphas[i] < 0.01) {
            alphas[i] = 1.0;

        }
        if (offset[i] < 0.1) {
            offset[i]=frequencyDifference;
        }
        //offset[0]=Math.random()*2.0;
    }
    model.material.uniforms.color.value=new THREE.Color(0xffffff*Math.random());
    model.geometry.attributes.alpha.needsUpdate = true;

    //color.setHex(Math.random() * 0xffffff);
    
    offset.needsUpdate=true;
}