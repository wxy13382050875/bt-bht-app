import http from '@/utils/base-http.js'
import novalid_http from '@/utils/novalid-http.js'
//获取首页数据
export const getFindHomeGoods = (params) => {
	let userInfo = uni.getStorageSync("userInfo");
	return http.get(`/home/${userInfo.userId}`);
};

//分页获取最新商品
export const getGoodsList = (url,params) => {
	return http.get(url,{
		params: params
	})
};

//通过商品id查询商品信息
export const addGoodsCart = (params) => {
	return http.post('/order-service/order/incrementCommit',params)
}
//通过商品id查询商品信息
export const findGoodsAllInfoByGodosIdAndStoreId = (params) => {
	return http.get('/goods/findGoodsAllInfoByGodosIdAndStoreId',{
		params: params
	})
}
//通过商品id查询商品信息
export const getShopCartList = (params) => {
	return http.get('/order-service/order/showShopCar',{
		params: params
	})
}
//订单提交
export const postCommitOrder = (params) => {
	let userInfo = uni.getStorageSync("userInfo");
	params.userId = userInfo.userId;
	return http.post('/order-service/order/commitOrder',params)
	// return http.get('/order-service/order/getKey')
}
//根据点单状态查询订单
export const getOrderList = (params) => {
	let userInfo = uni.getStorageSync("userInfo");
	params.userId = userInfo.userId;
	return http.get('/order-service/order/findOrderByOrderStatus',{
		params: params
	})
}

//通过用户id获取收货地址列表
export const getUserAddressList = (params) => {
	let userInfo = uni.getStorageSync("userInfo");
	params.userId = userInfo.userId;
	return http.get('/user/address',{
		params: params
	})
}
//保存用户收货地址
export const saveUserAddress = (params) => {
	let userInfo = uni.getStorageSync("userInfo");
	params.userId = userInfo.userId;
	return http.post('/user/saveAddress',params)
}
//用户登录
export const login = (params) => {
	return novalid_http.post('/user/login',params)
};
//注册用户/保存用户信息
export const saveUser = (params) => {
	return http.novalid_http('/user/saveUser',params)
};
//注册用户/保存用户信息
export const deleteAddress = (params) => {
	return http.post('/user/deleteAddress',params)
};
export const getOrderDetails = (params) => {
	let userInfo = uni.getStorageSync("userInfo");
	params.userId = userInfo.userId;
	return http.get('/order/getDetails',{
		params: params
	})
}



