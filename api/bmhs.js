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
	return http.get('/assets-service/declare/getWaitingDeclareData', {
		params: {
			idCode: idCode,
			inOut: inOut
		}
	});
}

/**
 * 提交申报
 */
export const postDecGoods = (params) => {
	http.config.loading = true;
	http.config.text = '正在提交...';
	return http.post('/assets-service/declare/commitWaitingDeclare', params);
}

/**
 * 待查验数据确认数据展示接口
 */
export const getWaitingConfirmData = () => {
	http.config.loading = true;
	let {
		idCode
	} = uni.getStorageSync('userInfo');
	http.config.loading = true;
	return http.get('/assets-service/declare/getWaitingConfirmData', {
		params: {
			idCode: idCode,
		}
	});
}

/**
 * 查验确认接口
 */
export const commitWaitingConfirm = (params) => {
	http.config.loading = true;
	http.config.text = '正在提交...';
	return http.post('/assets-service/declare/commitWaitingConfirm', params);
}
/**
 * 运输工具申报-获取商品信息list接口
 */
export const getGoodsList = (params) => {
	http.config.loading = true;
	http.config.text = '正在提交...';
	return http.post('/assets-service/declare/getGoodsList', params);
}
/**
 * 运输工具申报-获取车辆信息list
 */
export const getRecordVehicleList = (params) => {
	http.config.loading = true;
	http.config.text = '正在提交...';
	return http.post('/assets-service/declare/getRecordVehicleList', params);
}