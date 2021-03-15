class Snowman {
    constructor(){
        let color1 =  new THREE.MeshBasicMaterial( {color: 0xffffff} );
        // 帽子
        let hat = new THREE.ConeGeometry(4,10,100);
        let hat_M = new THREE.MeshBasicMaterial( {color: 0xD3D3D3} );
        this.snowman_hat = new THREE.Mesh(hat,hat_M)
        this.snowman_hat.position.set(0,16,0)
        // 头部
        let head = new THREE.SphereGeometry( 3, 100, 100 );
        let head_M = new THREE.MeshBasicMaterial( {color: 0xF5DEB3} );
        this.snowman_head = new THREE.Mesh(head,head_M)
        this.snowman_head.position.set(0,10,0)
        // 身体
        let body = new THREE.ConeGeometry(6,10,100);
        let body_M = new THREE.MeshBasicMaterial( {color: 0xD3D3D3} );
        this.snowman_body = new THREE.Mesh(body,body_M)
        this.snowman_body.position.set(0,3,0)

        // 腿
        let leg = new THREE.CylinderGeometry( 1, 1, 10 );
        this.snowman_leg_left = new THREE.Mesh(leg,color1) // 左腿
        this.snowman_leg_left.position.set(-2,-5,0)
        this.snowman_leg_right = this.snowman_leg_left.clone()// 右腿
        this.snowman_leg_right.position.set(2,-5,0)
        this.snowman_leg = new THREE.Group()
        this.snowman_leg.add(this.snowman_leg_left)
        this.snowman_leg.add(this.snowman_leg_right)


        // 脚
        this.snowman_foot_left = new THREE.Group()
        let foot_head = new THREE.SphereGeometry(1, 32, 32, 0, 2*Math.PI, 0, Math.PI/2);
        this.snowman_foot_head = new THREE.Mesh(foot_head,color1)
        this.snowman_foot_head.position.set(0,-.5,1)
        let foot_body = new THREE.BoxGeometry(2,1,2)
        this.snowman_foot_body = new THREE.Mesh(foot_body,color1)
        this.snowman_foot_body.position.set(0,0,0)
        this.snowman_foot_left.add(this.snowman_foot_head)
        this.snowman_foot_left.add(this.snowman_foot_body)
        
        this.snowman_foot_right = this.snowman_foot_left.clone()
        this.snowman_foot_right.position.set(-2,-10,0)
        this.snowman_foot_left.position.set(2,-10,0)





        this.snowman_cre = new THREE.Group()
        this.snowman_cre.add(this.snowman_hat)
        this.snowman_cre.add(this.snowman_head)
        this.snowman_cre.add(this.snowman_body)
        this.snowman_cre.add(this.snowman_leg)
        this.snowman_cre.add(this.snowman_foot_left)
        this.snowman_cre.add(this.snowman_foot_right)
        





    }


}

export default Snowman;
