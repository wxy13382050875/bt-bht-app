/**
 * 边民互市接口
 */
import http from '@/utils/base-http.js'
import BasUrl from '@/utils/config'

http.setConfig((config) => {
	config.baseUrl = BasUrl.BASE_TRADEING_URL
	config.header = {
		...config.header
	}
	return config
});

/**
 * 申报数据列表
 */
export const goodsDesList = (inOut) => {
	let {
		idCode
	} = uni.getStorageSync('userInfo');
	http.config.loading = true;
	return http.get('/goods/list', {
		params: {
			idcardno: idCode,
			inout: inOut
		}
	});
}

/**
 * 提交申报
 */
export const postDecGoods = (params) => {
	http.config.loading = true;
	return http.get('/goods/post', {
		params: {
			params
		}
	});
}
