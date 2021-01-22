require('../../css/index.less');

import Popup from '../../components/popup/popup.vue'
import {createStore} from '../store/index.js'
import "js/lib/pixi.min";
import pixi_app from '../common/star-warp.js'
import '../common/index.js'
Vue.prototype.resPath = __CDNPATH;

Vue.component('popup',Popup);
const store = createStore();


const app = new Vue({
	el : "#app",
	store,
	data : function(){
        return{
		
        }
    }, 
    components:{},

	watch : {

	},
	created: function(){
	},
	methods: {
		
	},
	mounted : function(){
		pixi_app.init()
	},

});