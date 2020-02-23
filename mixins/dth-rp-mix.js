import {
	getVerifyToken,
	getVerifyResult,
	getCivilFaceStatus
} from '@/api/dth-rp-aly.js'

/**
 * 阿里云人脸认证
 */
export const mixin_dth_rp_aly = {
	data() {
		return {
			//token请求参数
			faseVerifyParams: {
				bizId: '',
				bizType: ''
			}
		}
	},
	methods: {
		/**
		 * 实人认证
		 */
		realPersonAuth() {
			//token请求参数
			this.faseVerifyParams.bizId = this.getBizId();
			this.faseVerifyParams.bizType = 'realPersonAuth';
			return this.handerFaseVerifyReq();

		},
		/**
		 * 活体检测
		 */
		liveFaceVerify(idCode) {
			this.faseVerifyParams.bizId = this.getBizId();
			this.faseVerifyParams.bizType = 'liveFaceVerify';
			this.faseVerifyParams.idCode = idCode;
			return this.handerFaseVerifyReq();
		},
		/**
		 * 处理人脸识别请求
		 */
		handerFaseVerifyReq() {
			//加载原生插件
			let dthRpAly = uni.requireNativePlugin('DTH-RP-ALY');
			return new Promise((reslove, reject) => {
				getVerifyToken(this.faseVerifyParams).then(res => {
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
						this.handlerFaceVerifyResult(status).then(res => {
							reslove(res);
						}).catch(error => {
							reject(error)
						})
					})
				})
			})
		},
		/**
		 * 获取bizId
		 */
		getBizId() {
			return this.bizId = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		},
		/**
		 * 处理SDK认证结果
		 * @param {Object} status 认证状态
		 */
		handlerFaceVerifyResult(status) {
			return new Promise((reslove, reject) => {
				//获取SDK认证结果
				if (status == 'AUDIT_PASS') {
					//获取认证结果
					getVerifyResult(this.faseVerifyParams).then(res => {
						let {
							code,
							data
						} = res;
						if (data.verifyStatus == 1) {
							//TODO 返回的身份信息和当前绑定的身份证做比较
							if (this.$store.state.user.idCardNumber == data.idCardNumber) {
								reslove("认证成功")
							}else{
								reject("认证失败,非本人操作!");
							}
							
						} else {
							reject("认证失败");
						}
					}).catch(error => {
						reject(error);
					})
				} else if (status == 'AUDIT_FAIL') {
					reject("认证失败");

				} else if (status == 'AUDIT_NOT') {
					reject("未完成认证");
				}
			})
		}
	}
}
