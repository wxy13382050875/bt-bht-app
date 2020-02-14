/**
 * 基础http
 */
import Request from '@/utils/luch-request/request.js'

var http = new Request();

http.interceptor.request((config, cancel) => {
	if (http.config.loading) {
		uni.showLoading({
			title: http.config.text || '请求中...'
		});
	}
	return config;
})

http.interceptor.response((response) => {
	let {
		data
	} = response

	if (http.config.loading) {
		uni.hideLoading();
	}
	if (data.code != "200") {
		handlerError(data.code, data.msg);
		return Promise.reject(response)
	}
	return data
}, (response) => {
	handlerError(response.statusCode, '');

	return response
})

/**
 * 错误信息处理
 * @param {Object} statusCode
 */
function handlerError(statusCode, msg) {
	switch (statusCode) {
		case 404:
			uni.showToast({
				icon: 'none',
				title: '未请求到资源'
			})
			break;
		default:
			uni.showToast({
				icon: 'none',
				title: msg,
				duration: 3000
			})
			break;
	}
}

export default http;
