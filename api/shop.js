import {
	bht_http
} from '@/utils/http'


//获取首页数据
export const getFindHomeGoods = () => {
	return bht_http.get('/assets-service/home/findHomeGoods')
}

//分页获取最新商品
export const getGoodsList = (url,params) => {
	return bht_http.get(url,{
		params: params
	})
};
// //分页获取推荐商品
// export const getRecommendGoods = (params) => {
// 	return bht_http.get('/assets-service/goods/recommendGoods',{
// 		params: params
// 	})
// };
// //分页获取热卖商品
// export const getBestGoods = (params) => {
// 	return bht_http.get('/assets-service/goods//bestGoods',{
// 		params: params
// 	})
// };
//通过商品id查询商品信息
export const addGoodsCart = (params) => {
	return bht_http.post('/order-service/order/incrementCommit',params)
}
//通过商品id查询商品信息
export const findGoodsAllInfoByGodosIdAndStoreId = (params) => {
	return bht_http.get('/assets-service/goods/findGoodsAllInfoByGodosIdAndStoreId',{
		params: params
	})
}
//通过商品id查询商品信息
export const getShopCartList = (params) => {
	return bht_http.get('/order-service/order/showShopCar',{
		params: params
	})
}
//订单提交
export const postCommitOrder = (params) => {
	return bht_http.post('/order-service/order/commitOrder',params)
}
//根据点单状态查询订单
export const getOrderList = (params) => {
	return bht_http.get('/order-service/order/findOrderByOrderStatus',{
		params: params
	})
}

//通过用户id获取收货地址列表
export const getUserAddressList = (params) => {
	return bht_http.get('/assets-service/user/address',{
		params: params
	})
}
//保存用户收货地址
export const saveUserAddress = (params) => {
	return bht_http.post('/assets-service/user/saveAddress',params)
}
// //找回密码
// export const forgetPassword = (params) => {
// 	uni.showLoading({
// 		title: '正在努力提交...',
// 		mask: true
// 	});
// 	return new Promise((resolve, reject) => {
// 		bht_http.post("user/resetPassword", params, {
// 			header: {
// 				'content-type': 'application/x-www-form-urlencoded'
// 			}
// 		}).then(res => {
// 			uni.hideLoading();
// 			resolve(res);
// 		}).catch(error => {
// 			uni.hideLoading();
// 			reject(error);
// 		})
// 	})
// }
