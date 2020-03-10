/**
 * 基础http
 */
import Request from '@/utils/luch-request/request.js'
import BasUrl from '@/utils/config'

var http = new Request();

http.setConfig((config) => {
	if (process.env.NODE_ENV === 'development') {
		//测试环境地址
		config.baseUrl = BasUrl.BASE_BHT_DEV_URL
	} else {
		//生产环境地址
		config.baseUrl = BasUrl.BASE_BHT_DEV_URL
	}
	return config
})

http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => {
	if (http.config.loading) {
		uni.showLoading({
			title: http.config.text || '请求中...'
		});
	}
	if (uni.getStorageSync('token')) {
		config.header = {
			...config.header,
			'Authorization': uni.getStorageSync('token')
		}
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
		if (process.env.NODE_ENV === 'development') {
			handlerError(data.code, data.msg);
			return Promise.reject(response);
		} else {
			return Promise.reject(response);
		}
	}
	return data
}, (response) => {
	handlerError(response.statusCode, response.msg)
	return response
})

/**
 * 错误信息处理
 * @param {Object} statusCode
 */
function handlerError(statusCode, msg) {
	if (statusCode == '401') {
		uni.showToast({
			title: '登陆失效',
			icon: 'none',
			duration: 3000,
			success() {
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/common/login'
					})
				}, 3000)
			}
		})
	} else {
		if (process.env.NODE_ENV === 'development') {
			uni.showToast({
				title: "CODE==>" + statusCode + "   msg==>" + msg,
				icon: 'none',
				duration: 5000 * 2
			})
		}
	}

}

export default http;
