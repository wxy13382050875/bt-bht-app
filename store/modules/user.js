/**
 * 用户数据管理
 */
const state = {
	userInfo: {}, //用户信息
	isLogin: false, //登录状态
	mobile: '', //用户手机号
	redirectUrl: '/pages/index/index', //登录后重定向的地址
}

const getters = {
	isLogin: state => {
		return state.isLogin
	},
	userInfo: state => {
		return state.userInfo
	},
	getRedirectUrl: (state) => {
		return state.redirectUrl;
	},
	mobile(state) {
		return state.mobile
	}
}

const mutations = {
	/**
	 * 设置登录状态
	 */
	setLoginStatus: (state, status) => {
		state.isLogin = status
	},
	/**
	 * 保存用户信息
	 */
	setUserInfo: (state, info) => {
		state.userInfo = info;
	},
	setRedirectUrl: (state, url) => {
		state.redirectUrl = url;
	},
	setMobile(state, mobile) {
		state.mobile = mobile
	}
}

const actions = {
	setLoginStatus: ({
		commit
	}, status) => {
		commit('setLoginStatus', status)
	},
	setUserInfo: ({
		commit
	}, info) => {
		commit('setUserInfo', info)
	},
	setRedirectUrl: ({
		commit
	}, url) => {
		commit('setRedirectUrl', url)
	},
	setMobile({
		commit
	}, mobile) {
		commit('setMobile', mobile)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
