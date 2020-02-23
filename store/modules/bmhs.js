/**
 * 边民互市
 */
const state = {
	//保存选择添加的商品
	goodsList: [],
	inOut: 0,
}

const getters = {
	getGoodsList: (state) => {
		return state.goodsList;
	}
}

const mutations = {
	addGoodsList(state, data) {
		if (state.goodsList.length > 0) {
			
			let arr = [...data].filter(g => [...state.goodsList].every(d => d.seqNo !== g.seqNo));
			console.log('--------');
			console.log(arr);
			if (arr.length > 0) {
				state.goodsList = [...state.goodsList, ...arr];
			}
		} else {
			state.goodsList = data
		}

	},
	delGoods(state, seqNo) {
		state.goodsList.splice(state.goodsList.findIndex(item => item.seqNo === seqNo), 1);
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
