/**
 * 人脸识别服务接口
 */
import http from '@/utils/base-http.js'
import BasUrl from '@/utils/config'

http.setConfig((config) => {
	config.baseUrl = BasUrl.BASE_BHT_URL
	config.header = {
		...config.header
	}
	return config
});

/**
 * 获取token
 */
export const getVerifyToken = (params) => {
	http.config.loading = true;
	http.config.text = '正在加载...'
	return http.get('/assets-service/face/getVerifyToken', {
		params: params
	})
}

/**
 * 获取认证结果
 */
export const getVerifyResult = (params) => {

	return http.get('/assets-service/face/getVerifyResult', {
		params: params
	})
}

/**
 * 获取认证结果底图
 */
export const getFaceImageUrl = (params) => {

	return http.get('/assets-service/face/getFaceImageUrl', {
		params: params
	})
}

/**
 * 获取边民备案状态
 * @param idCode
 * @param phone
 */
export const getCivilFaceStatus = (params) => {
	http.config.loading = true;
	http.config.text = '正在验证信息...'
	return http.post('/assets-service/face/setCivilFaceStatus', params);
}
