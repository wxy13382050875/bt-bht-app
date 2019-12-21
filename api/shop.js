import {
	bht_http
} from '@/utils/http'


//获取首页数据
export const getFindHomeGoods = () => {
	return bht_http.get('/assets-service/home/findHomeGoods')
}

//分页获取推荐商品
export const recommendGoods = (params) => {
	return bht_http.get('/assets-service/goods/recommendGoods',{
		params: params
	})
};

//分页获取热卖商品
export const bestGoods = (params) => {
	return bht_http.get('/assets-service/goods//bestGoods',{
		params: params
	})
};

//通过商品id查询商品信息
export const findGoodsAllInfoByGodosIdAndStoreId = (params) => {
	return bht_http.get('/assets-service/goods/findGoodsAllInfoByGodosIdAndStoreId',{
		params: params
	})
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
