/**
 * 保存全局常量信息
 */

const state = {
	//导航栏高度
	navHeight: 0,
	//开票数据
	invoiceData: [],
	//tabBar激活的位置
	tabBarIndex: 'index',
	//统计模块 小块宽度
	statItemWidth: 0,
	//当前页面地址
	curUrl: '',
	//角色数据
	roleData: [{
			value: '边民',
			code: '001'
		},
		{
			value: '承运人',
			code: '002'
		},
		{
			value: '工作人员',
			code: '003'
		},
		{
			value: '店铺',
			code: '004'
		}
	],
	roleArr: ['边民', '承运人', '工作人员', '店铺'],
}

const getters = {
	navHeight: (state) => {
		return state.navHeight
	},
	invoiceData: (state) => {
		return state.invoiceData
	},
	curUrl: (state) => {
		return state.curUrl
	},
	roleData: (state) => {
		return state.roleData
	},
	roleArr: (state) => {
		return state.roleArr
	},
	getTabBarIndex: (state) => {
		return state.tabBarIndex
	},
	getStatItemWidth: (state) => {
		return state.statItemWidth
	}
}

const mutations = {
	setNavHeight: (state, height) => {
		state.navHeight = height
	},
	setInvoice: (state, data) => {
		state.invoiceData = data
	},
	setCurUrl: (state, url) => {
		state.curUrl = url
	},
	setTabBarIndex: (state, index) => {
		state.tabBarIndex = index
	},
	setStatItemWidth: (state, width) => {
		state.statItemWidth = width
	}
}

const actions = {
	setNavHeight: ({
		commit
	}, height) => {
		commit('setNavHeight', height)
	},
	setInvoice: ({
		commit
	}, data) => {
		commit('setInvoice', data)
	},
	setCurUrl: ({
		commit
	}, url) => {
		commit('setCurUrl', url)
	},
	setTabBarIndex: ({
		commit
	}, index) => {
		commit('setTabBarIndex', index)
	},
	setStatItemWidth: ({
		commit
	}, width) => {
		commit('setStatItemWidth', width)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
