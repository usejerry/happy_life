


let th_app = {
    init: function () {
        console.log(22)
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        const color2 = new THREE.Color( 0xffffff );
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        var scene = new THREE.Scene();  // 场景
        scene.background = color2
        // var camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.1, 1000); //相机
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        var renderer = new THREE.WebGLRenderer(); //渲染
        renderer.setSize(window.innerWidth, window.innerHeight); //渲染大小
        document.getElementById('star_box').appendChild(renderer.domElement); //body 添加渲染节点
        var mesh;
        var loader = new THREE.TextureLoader();
        var imgs = ['bg_ping2','love_l','love_lover','love_you','men','bg_ping2']
        let materials = []
        for (var i = 0; i < imgs.length; i++) {
            loader.load('../../img/' + imgs[i] + '.png',
                function(texture) {
                    var mat = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        map: texture
                    });
                    materials.push(mat);
                    if (materials.length >= 5 ) {
                        mesh = new THREE.Mesh(geometry2, new THREE.MeshFaceMaterial(materials));
                        // scene.add(mesh);
                        // render();
                    }
                });
        }
        var geometry2 = new THREE.BoxGeometry(100, 100, 100); //正方体
        var texture_img = new THREE.TextureLoader().load("../../img/bg_ping2.png");  
        var texture_img2 = new THREE.TextureLoader().load("../../img/love_l.png");  

        // var geometry = new THREE.ConeGeometry( 5, 10, 15 );//圆锥
        var geometry = new THREE.SphereGeometry(60,40,40);
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 'red',map:texture_img});

        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // scene.add(cube);
        // scene.add(cube2);
        //辅助线
        // var axisHelper = new THREE.AxisHelper(250);
        // scene.add(axisHelper);
        var pm = new THREE.PlaneGeometry(100,100)
        var pm2 = new THREE.PlaneGeometry(100,100)
        
        var ss = new THREE.Mesh(pm,material)
        var ss2 = new THREE.Mesh(pm2,material)
        ss2.position.x = 100
        ss.position.x = -100
        ss2.position.y = 100
        ss.position.y = -100
        console.log(ss2)
        scene.add(ss);
        scene.add(ss2);



        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
        scene.add(point); //点光源添加到场景中

        // 点光源2  位置和point关于原点对称
        var point2 = new THREE.PointLight(0xffffff);
        point2.position.set(-400, -200, -300); //点光源位置
        scene.add(point2); //点光源添加到场景中
        // camera.position.z = 5;
        function render() {
            renderer.render(scene, camera);//执行渲染操作
        }
        render();
        var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
        controls.addEventListener('change', render);//监听鼠标、键盘事件
        var animate = function () {
            requestAnimationFrame(animate);

            // geometry2.rotateY(0.01)

            renderer.render(scene, camera);
        };
        animate();
    }

}


export default th_app;



