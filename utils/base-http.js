/**
 * 基础http
 */
import Request from '@/utils/luch-request/request.js'
import BasUrl from '@/utils/config'

var http = new Request();

http.setConfig((config) => {
	config.baseUrl = BasUrl.BASE_BHT_DEV_URL
	return config
})

http.interceptor.request((config, cancel) => {
	if (http.config.loading) {
		uni.showLoading({
			title: http.config.text || '请求中...',
			success() {
				http.config.text = '';
			}
		});
	}
	return config;
})

http.interceptor.response((response) => {
	let {
		data
	} = response

	if (http.config.loading) {
		http.config.loading = false;
		http.config.text = '';
		uni.hideLoading();
	}
	if (data.code != "200") {
		//handlerError(data.code, data.msg);
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
