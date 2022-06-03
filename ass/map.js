

var glist = [];

// 通道
let composer;
const rangeRandom = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

  // 初始化变换粒子
  function initMainParticles() {
    // 初始化geometry
    geometry = new THREE.BufferGeometry();
    // 初始化贴图
    const textureLoader = new THREE.TextureLoader();
    //解决跨域问题
    textureLoader.crossOrigin = '';
    // 圆点

    const POINT_LENGTH = 7524,
      POINT_SIZE = 4;
      const points = [];
      const colors = [];
    for (let i = 0; i < POINT_LENGTH; i++) {
      const vertex = new THREE.Vector3();
      vertex.x = rangeRandom(window.innerWidth, -window.innerHeight);
      vertex.y = rangeRandom(window.innerWidth, -window.innerHeight);
      vertex.z = rangeRandom(window.innerWidth, -window.innerHeight);
      points.push(vertex);
    }
    
    geometry.setFromPoints(points);
    geometry.colors=colors;
    const material = new THREE.PointsMaterial({
      size: POINT_SIZE,
      sizeAttenuation: true,
      vertexColors: false, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
      color: 0xffffff,
      transparent: true,
      opacity: 1,
    });

    const particles = new THREE.Points(geometry, material);
    geometry.name = "变换点组"
    return particles;
  }

  // 初始化环境粒子
  function initAroundParticles() {
    const around = new THREE.BufferGeometry();

    // 初始化贴图
    const textureLoader = new THREE.TextureLoader();
    // 解决跨域问题
    textureLoader.crossOrigin = '';
    // 圆点

    const minZVal = window.innerWidth * 1.5;
    const minYVal = window.innerHeight * 1.5;
    const color = new THREE.Color(255, 255, 255);
    const points = [];
    const colors = [];
    // 初始化漫游粒子
    for (let i = 0; i < 200; i++) {
      const vertex = new THREE.Vector3();
      vertex.x = rangeRandom(minZVal, -minZVal); // 水平方向
      vertex.y = rangeRandom(minYVal, -minYVal); // 垂直方向
      vertex.z = rangeRandom(minZVal, -minZVal);
      points.push(vertex);
      colors.push(color);
    }

    around.setFromPoints(points);
    around.colors=colors;

    const aroundMaterial = new THREE.PointsMaterial({
      size: 10,
      sizeAttenuation: true,
      vertexColors: false, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
      color: 0xffffff,
      transparent: true,
      opacity: 1,
    });

    const aroundPoints = new THREE.Points(around, aroundMaterial);
    ;

    TweenMax.to(aroundPoints.rotation, 20, {
      y: Math.PI * 2,
      repeat: -1
    })
    return aroundPoints;
  }


  function ChangeShapAnimation(model,speed) {
    const baseVal = -Math.PI * 0.6;

    return new Promise(resolve => {
      model.rotation.y = baseVal;
      TweenMax.to(model.rotation, speed, {
        y: 0,
        delay: 0,//Math.random(),
        onComplete: () => {
          // 自动切换到第一个模型
          changeModel(model,0);
          resolve(true);
        }
      });
    });
  }

  // 切换模型
  function changeModel(model,index) {
   // model.geometry.attributes.position;
    var points=[];
    points= model.geometry.attributes.position.array;
    
    for (var i = 0; i < points.count; i++){     
      var poitns2= glist[index].geometry.attributes.position.array;
      var length = poitns2.count;
      var temp=glist[index].geometry.attributes.position.array[i % length];
      const o = temp;
      let a = new TweenMax.to(points[i], 2, {
        x: o.x,
        y: o.y,
        z: o.z,
        delay: Math.random(),
        onStart: () => {
          // camera.position.set(scene.position);
        }
      })
      this.tweenMax.push(a);
    }
    //console.log(model.geometry.attributes.position);
  }

  function onDocumentMouseMove(event) {
    const rotateY = (event.pageX / (this.width * 30)) * 2 * Math.PI;
    const rotateX = (event.pageY / (this.height * 200)) * 2 * Math.PI;

    TweenMax.to(group.rotation, 3, {
      x: rotateX,
      y: rotateY
    })
    event.preventDefault();
  }

  // 初始化模型
  function initModelMap() {
    glist.push(tempLoadModel1);
    glist.push(tempLoadModel1);
    glist.push(tempLoadModel1);
  }



