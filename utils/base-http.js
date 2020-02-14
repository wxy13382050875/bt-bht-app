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
	console.log('-------');
	console.log(data);
	if (data.code != "200") {
		return Promise.reject(response)
	}
	return data
}, (response) => {
	console.log('----response---');
	console.log(response);
	handlerError(response.statusCode);

	return response
})

/**
 * 错误信息处理
 * @param {Object} statusCode
 */
function handlerError(statusCode) {
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
				title: 'statusCode==>' + statusCode
			})
			break;
	}
}

export default http;
