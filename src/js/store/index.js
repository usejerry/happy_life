// import Vue from 'vue'
// import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// Vue.use(Vuex)

export function createStore(){
// const store	= new Vuex.Store({
	return new Vuex.Store({
		state : {
			isLogin : false,//是否已授权登录
			token : '',
			userId : '',
			weixin_id : '',
		},
		mutations,
		actions
	})
}

// export default store;