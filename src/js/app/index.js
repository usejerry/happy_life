require('../../css/index.less');

import Popup from '../../components/popup/popup.vue'

import Circle from '../../components/cssCircle/cssCircle.vue'

import {createStore} from '../store/index.js'
import "js/lib/pixi.min";
// import "js/lib/three.js";
// import "js/lib/orbitControls.js";
import pixi_app from '../common/star-warp.js'
import '../common/index.js'
import th_app from '../common/three_img.js'

Vue.prototype.resPath = __CDNPATH;

Vue.component('popup',Popup);
Vue.component('circ',Circle);

const store = createStore();


const app = new Vue({
	el : "#app",
	store,
	data : function(){
        return{
			loading_text:0,
        }
    }, 
    // components:{
	// 	'popup':Popup,
	// 	'circle':Circle
	// },

	watch : {

	},
	created: function(){
	},
	methods: {
		loadingImg(){
			let _this  = this
			let imgs = [
				require('../../img/che_1.jpg'),
				require('../../img/che_2.jpg'),
				require('../../img/che_3.jpg'),
				require('../../img/che_4.jpg'),
				require('../../img/che_5.jpg'),
				require('../../img/car_bg.png'),
				require('../../img/car_bg2.png'),
				require('../../img/car_bg3.png'),
				require('../../img/juzo.png'),
				require('../../img/juzo_s.png'),
				require('../../img/kaneki.png'),
				require('../../img/kaneki_s.png'),
				require('../../img/yeshan.png'),
				require('../../img/yeshan_s.png'),
				require('../../img/tip3.png'),
				require('../../img/tip4.png'),
				// require('../../img/loading.gif'),
			]
			let lengs = 0
			let timer = null, 
			load = (url) => {
                if (lengs < imgs.length) {
                    const image = new Image()
                    image.src  = url
                    timer = setInterval(() => {
                        if (image.complete) {
                            
                            clearInterval(timer)
							load(imgs[lengs++])
							_this.loading_text = parseInt(lengs/imgs.length*100)
							// if(_this.loading_text<=50){
							// 	_this.left_r =135+ 3.6*_this.loading_text
								
							// }else{
							// 	_this.right_r =135+ 3.6*(_this.loading_text-50)
							// }
                        }
                    }, 80)
                } else {
					// _this.page_type = 'home'
					// _this.set_sw()
					// if(_this.$Utils.checkFirst()){
					// 	_this.tips_ok = true
					// 	_this.tips_show= 'tip1'
					// 	// console.log(2222)
					// }
                }
			}
			load(imgs[lengs])

		},
	},
	mounted : function(){
		th_app.init()
		// this.loadingImg()
	},

});