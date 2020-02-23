import http from '@/utils/base-http.js'
import BasUrl from '@/utils/config'

http.setConfig((config) => {
	config.baseUrl = BasUrl.BASE_BHT_URL
	config.header = {
		...config.header
	}
	return config
});


//用户登录
export const login = (params) => {
	http.config.loading = true;
	return http.get('user/login', {
		params: params
	})
}


//发送短信验证码
export const sendMobileCode = (mobile) => {
	return http.get(`verify/send/${mobile}`)
};

//发送短信验证码
export const sendSmsCode = (params) => {
	return http.post('/assets-service/declare/sendSmsCode',params)
};
//注册用户
export const register = (params) => {
	return http.post('/assets-service/user/register', params)
};

//更新用户信息
export const updateUserInfo = (params) => {
	uni.showLoading({
		title: '正在努力提交...',
		mask: true
	});
	return new Promise((resolve, reject) => {
		bht_http.post("user/update", params, {
			header: {
				'content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			uni.hideLoading();
			resolve(res);
		}).catch(error => {
			uni.hideLoading();
			reject(error);
		})
	})
}

//找回密码
export const forgetPassword = (params) => {
	return http.post('/assets-service/user/resetPassword', params)
	// uni.showLoading({
	// 	title: '正在努力提交...',
	// 	mask: true
	// });
	// return new Promise((resolve, reject) => {
	// 	bht_http.post("/assets-service/user/resetPassword", params, {
	// 		header: {
	// 			'content-type': 'application/x-www-form-urlencoded'
	// 		}
	// 	}).then(res => {
	// 		uni.hideLoading();
	// 		resolve(res);
	// 	}).catch(error => {
	// 		uni.hideLoading();
	// 		reject(error);
	// 	})
	// })
}
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