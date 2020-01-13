/**
 * 二级市场api调用
 */
import http from './base.js'

export const queryGoodsListByIdCard = (params) => {
	http.config.loading = true;
	return http.post('/assets-service/btMark/appShop', params, {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}
