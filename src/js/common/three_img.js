import Snowman from '../lib/snowman.js'

//  场景 scene  new THREE.Scene()   渲染器 renderer  new THREE.WebGLRenderer()
//  光源 pointLight  new THREE.PointLight()
let scene , renderer ,camera,creeperObj,tween,tweenBack,facePoi,imgs_g_data,yHua_data,Snowman_g 
let th_app = {
    init: function () {
        scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x000000, 0.0008)
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
        // renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
        renderer.shadowMap.enable = true // 陰影效果
        renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

        camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
          )
        camera.position.set(30, 30, 30) // 相機位置
        camera.lookAt(scene.position) // 相機焦點  


        // 簡單的地板
        const planeGeometry = new THREE.PlaneGeometry(200, 200)
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, -20, 0)
        plane.receiveShadow = true
        scene.add(plane)
        var axes = new THREE.AxisHelper(20);
        scene.add(axes);

        // createCreeper()

        // 設置環境光提供輔助柔和白光
        let ambientLight = new THREE.AmbientLight(0x404040)
        scene.add(ambientLight)
        
        // 設置聚光燈幫忙照亮物體
        let spotLight = new THREE.SpotLight(0xf0f0f0)
        spotLight.position.set(-10, 30, 20)
        spotLight.castShadow = true
        scene.add(spotLight)
        // let spotHelper = new THREE.SpotLightHelper(spotLight)
        // scene.add(spotHelper)
        
        // 移動點光源
        let pointLight = new THREE.PointLight(0xccffcc, 1, 100) // 顏色, 強度, 距離
        pointLight.castShadow = true // 投影
        scene.add(pointLight)

        // 小球體模擬點光源實體
        const sphereLightGeo = new THREE.SphereGeometry(0.3)
        const sphereLightMat = new THREE.MeshBasicMaterial({ color: 0xccffcc })
        let  sphereLightMesh = new THREE.Mesh(sphereLightGeo, sphereLightMat)
        sphereLightMesh.castShadow = true
        sphereLightMesh.position.y = 16
        scene.add(sphereLightMesh)

        document.getElementById('star_box').appendChild(renderer.domElement)

        let rotateAngle = 0

        
        function pointLightAnimation() {
            if (rotateAngle > 2 * Math.PI) {
              rotateAngle = 0 // 超過 360 度後歸零
            } else {
              rotateAngle += 0.03 // 遞增角度
            }
          
            // 光源延橢圓軌道繞 Y 軸旋轉
            sphereLightMesh.position.x = 10 * Math.cos(rotateAngle)
            sphereLightMesh.position.z = 5 * Math.sin(rotateAngle)
          
            // 點光源位置與球體同步
            pointLight.position.copy(sphereLightMesh.position)
        }
        let offset = { x: 0, z: 0, rotateY: 0 }
        let target = { x: 20, z: 20, rotateY: 0.7853981633974484 } // 目標值
        // 苦力怕走動及轉身補間動畫
        const onUpdate = () => {
          // 移動
          creeperObj.feet.position.x = offset.x
          creeperObj.feet.position.z = offset.z
          creeperObj.head.position.x = offset.x
          creeperObj.head.position.z = offset.z
          creeperObj.body.position.x = offset.x
          creeperObj.body.position.z = offset.z
        
          // 轉身
          if (target.x > 0) {
            creeperObj.feet.rotation.y = offset.rotateY
            creeperObj.head.rotation.y = offset.rotateY
            creeperObj.body.rotation.y = offset.rotateY
          } else {
            creeperObj.feet.rotation.y = -offset.rotateY
            creeperObj.head.rotation.y = -offset.rotateY
            creeperObj.body.rotation.y = -offset.rotateY
          }
        }
        tween = new TWEEN.Tween(offset)
        .to(target, 3000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(onUpdate)
        .onComplete(() => {
          tweenBack.start()
        })
        // 回原點
        tweenBack = new TWEEN.Tween(offset)
        .to({ x: 0, z: 0, rotateY: 0 }, 3000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(onUpdate)
        .onComplete(() => {
          handleNewTarget() // 計算新的目標值
          tween.start()
        })
        // 計算新的目標值
        const handleNewTarget = () => {
          // 限制苦力怕走路邊界
          if (camera.position.x > 30) target.x = 20
          else if (camera.position.x < -30) target.x = -20
          else target.x = camera.position.x
        
          if (camera.position.z > 30) target.z = 20
          else if (camera.position.z < -30) target.z = -20
          else target.z = camera.position.z
        
          const v1 = new THREE.Vector2(0, 1) // 原點面向方向
          const v2 = new THREE.Vector2(target.x, target.z) // 苦力怕面向新相機方向
        
          // 內積除以純量得兩向量 cos 值
          let cosValue = v1.dot(v2) / (v1.length() * v2.length())
        
          // 防呆，cos 值區間為（-1, 1）
          if (cosValue > 1) cosValue = 1
          else if (cosValue < -1) cosValue = -1
        
          // cos 值求轉身角度
          target.rotateY = Math.acos(cosValue)
        }
        var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
        // tween.start()
        let sceneR = 0 
        // yuanPoints()
        createSnowman()
        // facePoints()  // 雪花 
        // imgFalling() // 图片
        cherryBlossoms()
        function render() {
          // scene.rotation.y = sceneR += 0.01;
          TWEEN.update() // update
          requestAnimationFrame(render)
          // creeperHeadRotate()
          // creeperfeetRotate()
          // creeperScaleBody()
          // pointLightAnimation() // update
          // animateYhua()
          // animateSnow()
          // imgAma()
          renderer.render(scene, camera)
      }
      render()
      // tween.start()
        // controls.addEventListener('change', render);//监听鼠标、键盘事件
    },
    
}
// 生成苦力怕並加到場景
function createCreeper() {
  creeperObj = new Creeper()
  scene.add(creeperObj.creeper)
}


function createSnowman(){
  Snowman_g = new Snowman()
  scene.add(Snowman_g.snowman_cre)
}
// 圆 粒子
function yuanPoints(){
  let yuan_gro = new THREE.SphereGeometry(30,20,20)
  const material = new THREE.PointsMaterial({
    size: 2,
    color: 0x00ff00 // 綠色
  })
  let spherePoints = new THREE.Points(yuan_gro, material) 
  // spherePoints.position.set(45, 0, 0)
  scene.add(spherePoints)
}

// 雪花
function facePoints(){
  let num = 1500
  
  
  let snok = new THREE.TextureLoader().load(
    require('../../img/snowflake.png')
  )

  let snok2 = new THREE.TextureLoader().load(
    require('../../img/che_1.jpg')
  )
  let snok3 = new THREE.TextureLoader().load(
    require('../../img/che_1.jpg')
  )
  let mesData = [snok,snok2,snok3]
  let faceGro = new  THREE.Geometry()
  let faceMes = new  THREE.PointsMaterial({size:5,map:snok,
    blending: THREE.AdditiveBlending,
                                          depthTest: false,
                                          transparent: true,
                                          opacity: 0.7})
  let rang = 100 
  for(let i = 0; i<=num;i++){
    let x = THREE.Math.randInt(-rang,rang)
    let y = THREE.Math.randInt(0,rang*20)
    let z = THREE.Math.randInt(-rang,rang)
    let xlp = new THREE.Vector3(x,y,z)
    xlp.velocityX = THREE.Math.randFloat(-0.16, 0.16) // 粒子橫向移動速度
    xlp.velocityY = THREE.Math.randFloat(0.1, 0.3) // 粒子縱向移動速度
    faceGro.vertices.push(xlp)
  }
  facePoi = new THREE.Points(faceGro, faceMes) 
  scene.add(facePoi)
  
}
// 落雪
function animateSnow(){
  facePoi.geometry.vertices.forEach(v => {
    if(v.y>-7){    
      v.y = v.y - v.velocityY
      v.x = v.x - v.velocityX
    }

    if (v.y <= -100) v.y = 100
    if (v.x <= -100 || v.x >= 100) v.velocityX = v.velocityX * -1
  });
  facePoi.geometry.verticesNeedUpdate = true // 告訴渲染器需更新頂點位置
}

// 樱花
function cherryBlossoms(){
  let c_b_num = 700
  let yhua = new THREE.TextureLoader().load(
    require('../../img/yhua.png')
  )
  let poinX = []
  let poinY = []
  yHua_data = []
  let yhua_m = new THREE.MeshBasicMaterial({map:yhua,side: THREE.DoubleSide,
    depthTest: false,
    transparent: true,
    opacity: 0.7})


  for (let i = 0; i < 2*Math.PI; i += 2*Math.PI/c_b_num/2) {
    let x = 16 * Math.pow(Math.sin(i), 3);
    let z = 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i);
    let y = THREE.Math.randInt(0,c_b_num*30)
    // points.push({x:x,z:z});
    poinX.push(x)
    poinX.push(y)
    let yhua_p = new THREE.PlaneGeometry(2,2)
    let yhua_mesh = new THREE.Mesh(yhua_p,yhua_m)
    yhua_mesh.position.set(x,y,z)
    yhua_mesh.rotation.x =  -0.5 * Math.PI
    yhua_mesh.velocityX = THREE.Math.randFloat(-0.16, 0.16) // 粒子橫向移動速度
    yhua_mesh.velocityY = THREE.Math.randFloat(0.1, 0.3) // 粒子縱向移動速度
    yHua_data.push(yhua_mesh)
    scene.add(yhua_mesh)
  }
 
  for (let i = 0; i < c_b_num; i++) {
    
    
  }
}
// 樱花
function animateYhua(){
  yHua_data.forEach(v => {
    if(v.position.y>-7){    
      // v.y = v.y - v.velocityY
      // v.x = v.x - v.velocityX
      v.position.set(v.position.x,v.position.y- v.velocityY,v.position.z)
    }

    // if (v.position.y <= -100) v.y = 100
    // if (v.x <= -100 || v.x >= 100) v.velocityX = v.velocityX * -1
  });
  // facePoi.geometry.verticesNeedUpdate = true // 告訴渲染器需更新頂點位置
}


function imgFalling(){
  console.log(creeperObj)
  let imgs = [new THREE.TextureLoader().load(require('../../img/che_1.jpg')),
              new THREE.TextureLoader().load(require('../../img/che_2.jpg')),
              new THREE.TextureLoader().load(require('../../img/che_3.jpg')),
              new THREE.TextureLoader().load(require('../../img/che_4.jpg'))]
  let num  = 3 
  imgs_g_data = []
  let rang = 100 
  for(let i = 0;i<num;i++){
    let b_gr = new THREE.PlaneGeometry(20,20)
    let x = THREE.Math.randInt(-rang,rang)
    let y =THREE.Math.randInt(0,rang*3)
    let z = THREE.Math.randInt(-rang,rang)
    // let xfs = new THREE.Vector3(x,y,z)
    let material = new THREE.MeshBasicMaterial( {map:imgs[THREE.Math.randInt(0,2)],side: THREE.DoubleSide,});
    let g_ma = new THREE.Mesh(b_gr,material)
    g_ma.velocityX = THREE.Math.randFloat(-0.16, 0.16) // 粒子橫向移動速度
    g_ma.velocityY = THREE.Math.randFloat(0.1, 0.3) // 粒子縱向移動速度
    g_ma.position.set(x,y,z)
    imgs_g_data.push(g_ma)
    scene.add(g_ma)
    // creeperObj.creeper.position.set(imgs_g_data[0].position.x,creeperObj.creeper.position.y,imgs_g_data[0].position.z)
  }
}

function imgAma(){
  imgs_g_data.forEach(v => {
    if(v.position.y>-7){    
      // v.position.y = v.y - v.velocityY
      // v.position.x = v.x - v.velocityX
      v.position.set(v.position.x- v.velocityX,v.position.y- v.velocityY,v.position.z)
    }else{
       console.log(v.position.y)
      // v.rotation.y = sceneR += 0.01;
    }
    // console.log(v.position.y)

    if (v.position.y <= -7){ 
      v.position.y = 100
      v.position.z = THREE.Math.randInt(-100,100)}
    if (v.position.x <= -100 || v.position.x >= 100) v.velocityX = v.velocityX * -1
  });
  creeperObj.creeper.position.set(imgs_g_data[0].position.x,creeperObj.creeper.position.y,creeperObj.creeper.position.z)

  if(imgs_g_data[0].position.y <= -7){
    let kw_go = new TWEEN.Tween({ z: creeperObj.creeper.position.z})
    .to({z:imgs_g_data[0].position.z}, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(() => {
      console.log("22222")
    })
    kw_go.start()
  }
}
// 头扭动
let rotateHeadOffset = 0
function creeperHeadRotate (){
  rotateHeadOffset += 0.02
  creeperObj.head.rotation.y = Math.sin(rotateHeadOffset)
}

// 脚扭动
let rotatefeetOffset = 0 
function creeperfeetRotate (){
  rotatefeetOffset += 0.02
  creeperObj.foot1.rotation.x = Math.sin(rotatefeetOffset)
  creeperObj.foot2.rotation.x = -Math.sin(rotatefeetOffset)
  creeperObj.foot3.rotation.x = -Math.sin(rotatefeetOffset)
  creeperObj.foot4.rotation.x = Math.sin(rotatefeetOffset)

}

let scaleHeadOffset = 0
// 苦力怕膨脹
function creeperScaleBody() {
  scaleHeadOffset += 0.04
  let scaleRate = Math.abs(Math.sin(scaleHeadOffset)) / 16 + 1
  creeperObj.creeper.scale.set(scaleRate, scaleRate, scaleRate)
}


class Creeper {
  constructor() {
    // 宣告頭、身體、腳幾何體大小
    const headGeo = new THREE.BoxGeometry(4, 4, 4)
    const bodyGeo = new THREE.BoxGeometry(4, 8, 2)
    const footGeo = new THREE.BoxGeometry(2, 3, 2)

    // 苦力怕臉部貼圖
    const headMap = new THREE.TextureLoader().load(
      'https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png'
    )
    // 苦力怕皮膚貼圖
    const skinMap = new THREE.TextureLoader().load(
      'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png'
    )

    // 身體與腳的材質設定
    const skinMat = new THREE.MeshPhongMaterial({
      map: skinMap // 皮膚貼圖
    })

    // 準備頭部與臉的材質
    const headMaterials = []
    for (let i = 0; i < 6; i++) {
      let map

      if (i === 4) map = headMap
      else map = skinMap

      headMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    // 頭
    this.head = new THREE.Mesh(headGeo, headMaterials)
    this.head.position.set(0, 6, 0)
    this.head.rotation.y = 0.5 // 稍微的擺頭

    // 身體
    this.body = new THREE.Mesh(bodyGeo, skinMat)
    this.body.position.set(0, 0, 0)

    // 四隻腳
    this.foot1 = new THREE.Mesh(footGeo, skinMat)
    this.foot1.position.set(-1, -5.5, 2)
    this.foot2 = this.foot1.clone() // 剩下三隻腳都複製第一隻的 Mesh
    this.foot2.position.set(-1, -5.5, -2)
    this.foot3 = this.foot1.clone()
    this.foot3.position.set(1, -5.5, 2)
    this.foot4 = this.foot1.clone()
    this.foot4.position.set(1, -5.5, -2)

    // 將四隻腳組合為一個 group
    this.feet = new THREE.Group()
    this.feet.add(this.foot1)
    this.feet.add(this.foot2)
    this.feet.add(this.foot3)
    this.feet.add(this.foot4)

    // 將頭、身體、腳組合為一個 group
    this.creeper = new THREE.Group()
    this.creeper.add(this.head)
    this.creeper.add(this.body)
    this.creeper.add(this.feet)

    // 苦力怕投影設定，利用 traverse 遍歷各個子元件設定陰影
    this.creeper.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }
}
export default th_app;



