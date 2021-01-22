// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

import Popup from '../../components/popup/popup.vue'

import {createStore} from '../store/index.js'
import Utils from '../common/index.js'

Vue.prototype.$Api = Api;
Vue.prototype.$Utils = Utils;
Vue.prototype.resPath = __CDNPATH;

Vue.component('popup',Popup);

export function createApp(el,options={}){
	const store = createStore();
	const app = new Vue({
		el : el,
		store,
		options
	});

	return {app , store}
}