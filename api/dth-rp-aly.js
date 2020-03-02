/**
 * 人脸识别服务接口
 */
import http from '@/utils/base-http.js'

/**
 * 获取token
 */
export const getVerifyToken = (params) => {
	http.config.loading = true;
	http.config.text = '正在加载...'
	return http.get('/face/getVerifyToken', {
		params: params
	})
}

/**
 * 获取认证结果
 */
export const getVerifyResult = (params) => {

	return http.get('/face/getVerifyResult', {
		params: params
	})
}

/**
 * 获取认证结果底图
 */
export const getFaceImageUrl = (params) => {

	return http.get('/face/getFaceImageUrl', {
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
	return http.post('/face/setCivilFaceStatus', params);
}
