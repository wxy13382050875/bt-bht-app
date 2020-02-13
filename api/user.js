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
	return bht_http.get('user/login', {
		params: params
	})
}

//发送短信验证码
export const sendMobileCode = (mobile) => {
	return bht_http.get(`verify/send/${mobile}`)
};

//注册用户
export const register = (params) => {
	return bht_http.post('user/reg', params, {
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
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
	uni.showLoading({
		title: '正在努力提交...',
		mask: true
	});
	return new Promise((resolve, reject) => {
		bht_http.post("user/resetPassword", params, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
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
