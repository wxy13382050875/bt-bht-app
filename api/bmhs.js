/**
 * 边民互市接口
 */
import http from '@/utils/base-http.js'
import store from '@/store'

/**
 * 申报数据列表
 */
export const goodsDesList = (inOut) => {
	let {
		idCode
	} = uni.getStorageSync('userInfo');
	http.config.loading = true;
	return http.get('/declare/getWaitingDeclareData', {
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
	return http.post('/declare/commitWaitingDeclare', params);
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
	return http.get('/declare/getWaitingConfirmData', {
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
	return http.post('/declare/commitWaitingConfirm', params);
}
/**
 * 运输工具申报-获取商品信息list接口
 */
export const getGoodsList = (params) => {

	let {
		customs,
		region
	} = uni.getStorageSync('userInfo');
	params.lshg = customs;
	params.frontierTrader = region;
	params.inOut = store.state.bmhs.inOut;
	http.config.loading = true;
	http.config.text = '正在查询...';
	return http.get('/declare/getGoodsList', {
		params: params
	});
}
/**
 * 运输工具申报-获取车辆信息list
 */
export const getRecordVehicleList = (params) => {
	let {
		customs,
		region
	} = uni.getStorageSync('userInfo');
	params.lshg = customs;
	params.frontierTrader = region;
	return http.get('/declare/getRecordVehicleList', {
		params: params
	});
}


export const declareTransport = (params)=>{
	http.config.loading = true;
	http.config.text = '正在提交...';
	
	let {
		customs,
		region,
		idCode
	} = uni.getStorageSync('userInfo');
	params.lshg = customs;
	params.frontierTrader = region;
	params.inOut = store.state.bmhs.inOut;
	params.idCode = idCode
	return http.post('/declare/declareTransport', params);
}