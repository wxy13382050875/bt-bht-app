import http from '@/utils/base-http.js'
import novalid_http from '@/utils/novalid-http.js'
import BasUrl from '@/utils/config'


//用户登录
export const login = (params) => {
	http.config.loading = true;
	return novalid_http.get('user/login', {
		params: params
	})
}


//发送短信验证码
export const sendMobileCode = (mobile) => {
	return http.get(`verify/send/${mobile}`)
};

//发送短信验证码
export const sendSmsCode = (params) => {
	return http.post('/declare/sendSmsCode',params)
};
//注册用户
export const register = (params) => {
	novalid_http.config.loading = true;
	novalid_http.config.text = '正在注册...';
	return novalid_http.post('/user/register', params)
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
	return http.post('/user/resetPassword', params)
	
}
