/**
 * 二级市场store
 */
const state = {
	//保存商品列表
	goodsList: []
}

const getters = {
	goodsList: (state) => {
		return state.goodsList
	}
}

const mutations = {
	addGoodsList(state, goodsList) {
		state.goodsList = list
	}
}

const actions = {
	addGoodsList({
		commit
	}, goodsList) {
		commit('addGoodsList', goodsList)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
