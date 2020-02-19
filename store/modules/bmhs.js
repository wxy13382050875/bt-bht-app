/**
 * 边民互市
 */
const state = {
	//保存选择添加的商品
	goodsList: []
}

const getters = {
	getGoodsList: (state) => {
		return state.goodsList;
	}
}

const mutations = {
	addGoodsList(state, data) {
		state.goodsList = data
	},
	delGoods(state, seqNo) {
		state.goodsList.splice(state.goodsList.findIndex(item => item.seqNo === seqNo), 1);
		console.log(state.goodsList)
	}
}

const actions = {
	addGoodsData({
		commit
	}, data) {
		commit('addGoodsList', data)
	},
	delGoods({
		commit
	}, seqNo) {
		commit('delGoods', seqNo)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
