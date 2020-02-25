import {
	getVerifyToken,
	getVerifyResult
} from '@/api/dth-rp-aly.js'

/**
 * 阿里云人脸认证
 */
export const mixin_dth_rp_aly = {
	data() {
		return {
			//token请求参数
			faceVerifyParams: {
				bizId: '',
				bizType: ''
			}
		}
	},
	methods: {
		/**
		 * 
		 * 实人认证
		 */
		realPersonAuth() {
			//token请求参数
			this.faceVerifyParams.bizId = this.getBizId(64);
			this.faceVerifyParams.bizType = 'realPersonAuth';
			return this.handerFaseVerifyReq();

		},
		/**
		 * 活体检测
		 */
		liveFaceVerify(idCode) {
			this.faceVerifyParams.bizId = this.getBizId(64);
			this.faceVerifyParams.bizType = 'liveFaceVerify';
			this.faceVerifyParams.idCode = idCode;
			return this.handerFaseVerifyReq();
		},
		/**
		 * 处理人脸识别请求
		 */
		handerFaseVerifyReq() {
			//加载原生插件
			let dthRpAly = uni.requireNativePlugin('DTH-RP-ALY');
			return new Promise((reslove, reject) => {
				getVerifyToken(this.faceVerifyParams).then(res => {
					dthRpAly.show({
						verifyToken: res.data,
					}, res => {
						let {
							status,
							code
						} = res;
						/**
						 * 请求SDK认证结果
						 */
						this.handlerFaceVerifyResult(status, code).then(res => {
							reslove(res);
						}).catch(error => {
							reject(error)
						})
					})
				}).catch(error => {
					uni.showModal({
						title: '获取token失败',
						content: 'erro=>' + JSON.stringify(error) + 'tokenparams==>' + this.faceVerifyParams,
						success: (res) => {
							if (res.confirm) {
								reject(error)
							} else {
								reject(error)
							}
						}
					})
				});
			})
		},
		/**
		 * 获取bizId
		 */
		getBizId(len, radix) {
			var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			var uuid = [],
				i;
			radix = radix || chars.length;

			if (len) {
				// Compact form
				for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
			} else {
				// rfc4122, version 4 form
				var r;

				// rfc4122 requires these characters
				uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
				uuid[14] = '4';

				// Fill in random data.  At i==19 set the high bits of clock sequence as
				// per rfc4122, sec. 4.1.5
				for (i = 0; i < 36; i++) {
					if (!uuid[i]) {
						r = 0 | Math.random() * 16;
						uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
					}
				}
			}

			return uuid.join('');
		},
		/**
		 * 处理SDK认证结果
		 * @param {Object} status 认证状态
		 * @param {type} sdkCode  认证状态码
		 */
		handlerFaceVerifyResult(status, sdkCode) {
			return new Promise((reslove, reject) => {
				//获取SDK认证结果
				if (status == 'AUDIT_PASS') {
					//获取认证结果
					getVerifyResult(this.faceVerifyParams).then(res => {
						let {
							code,
							data
						} = res;
						if (data.verifyStatus == 1) {
							reslove("认证成功");
							//TODO 返回的身份信息和当前绑定的身份证做比较
							// uni.showModal({
							// 	title: '日志打印',
							// 	content: '返回结果==>' + JSON.stringify(data.material),
							// 	success: (res) => {
							// 		if (res.confirm) {
							// 			reslove("认证成功")
							// 		}
							// 	}
							// })
							// if (this.$store.state.user.idCardNumber == data.material.idCardNumber) {
							// 	reslove("认证成功")
							// } else {
							// 	uni.showModal({
							// 		title: '日志打印',
							// 		content: '返回结果==>'+JSON.stringify(data.material),
							// 		success: (res) => {
							// 			if(res.confirm){
							// 				reject("认证失败,非本人操作!");
							// 			}
							// 		}
							// 	})

							// }

						} else {
							reject("获取认证结果==>认证失败");
						}
					}).catch(error => {
						reject(error);
					})
				} else if (status == 'AUDIT_FAIL') {
					reject("SDK==>认证失败 CODE==>" + sdkCode);

				} else if (status == 'AUDIT_NOT') {
					reject("SDK==>未完成认证  CODE==>" + sdkCode);
				}else{
					reject("SDK==>未知失败  CODE==>" + sdkCode);
				}
			})
		}
	}
}
