export default {
	/************公共************/
	//设置是否登录
	setIsLogin(state,data){
		state.isLogin = data;
	},
	//设置授权用户id
	setUserId(state,data){
		state.userId = data;
	},
	//设置授权用户token
	setToken(state,data){
		state.token = data;
	},
	//设置授权用户weixin_id
	setWeixinId(state,data){
		state.weixin_id = data;
	},
	//设置玩家当前个人页信息-字段
	setUserInfoField(state,data){
		let field = data.field,
			info = data.info;
		state.userInfo[field] = info;
	}
}