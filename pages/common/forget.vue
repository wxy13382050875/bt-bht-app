<template>
	<view class="app-content">
		<nav-bar-back title="找回密码" popType="0"></nav-bar-back>
		<bht-layout-container bg-color="#fff" :bottom="0">
			<view class="app-register">
				<view class="aca-form-input">
					<view class="aca-input-icon">
						<view class="iconfont icon-phone"></view>
					</view>
					<input class="aca-input" type="number" v-model="formData.phone" placeholder="请输入手机号" />

				</view>
				<view class="aca-form-input">
					<view class="aca-input-icon">
						<view class="iconfont icon-verify-code"></view>
					</view>
					<input class="aca-input" type="number" maxlength="6" v-model="formData.smsCode" placeholder="请输入验证码" />
					<text @click="getCode" class="se-code">{{vcodeBtnName}}</text>
				</view>
				<view class="aca-form-input">
					<view class="aca-input-icon">
						<view class="iconfont icon-password"></view>
					</view>
					<input class="aca-input" type="password" v-model="formData.password" placeholder="请输入新密码" />
				</view>
				<button class="app-btn" hover-class="" @click="handleRest">重置密码</button>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import formValidate from '@/utils/validate'
	import {
		sendSmsCode,
		forgetPassword
	} from '@/api/user'
	import {
		saveUser
	} from '@/api/shop.js';
	export default {
		data() {
			return {
				formData: {
					phone: '',
					password: '',
					smsCode: '',
				},
				roleText: '',
				paperTypeIndex: 0,
				vcodeBtnName: '获取验证码',
				rule: [{
						name: "phone",
						checkType: "phoneno",
						errorMsg: "请填写正确的手机号"
					},
					{
						name: "smsCode",
						checkType: "string",
						checkRule: "6",
						errorMsg: "请正确填写短信验证码"
					}, {
						name: "password",
						checkType: "number",
						checkRule: "notnull",
						errorMsg: "请填写密码"
					}
				]

			}
		},
		computed: {
			...mapGetters('utp', ['roleArr', 'roleData'])
		},
		methods: {
			//重置密码
			handleRest() {
				let valid = formValidate.check({ ...this.formData
				}, this.rule);
				if (valid) {
					// if (this.validateCode()) {
					forgetPassword(this.formData).then(res => {
						let {
							code,
							msg
						} = res;
						if (code == '200') {
							uni.showToast({
								title: '修改成功'
							});
							setTimeout(() => {
								uni.removeStorageSync("mobileCode");
								this.$Router.replace({
									name: 'login'
								})
							}, 2000);
						}
						if (code === 500) {
							uni.showToast({
								icon: 'none',
								title: msg
							})
						}
					}).catch(error => {
						uni.showToast({
							title: error.data.msg,
							icon: 'none'
						});
						uni.hideLoading();
					});

				} else {
					uni.showToast({
						title: formValidate.error,
						icon: 'none'
					});
				}
			},
			//获取验证码
			getCode() {
				var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.formData.phone)) {

					uni.showToast({
						title: '请正确填写手机号码',
						icon: 'none'
					});
					return false;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				this.vcodeBtnName = '发送中...';
				let params = {};
				params.phone = this.formData.phone;
				uni.showLoading({
					title: '正在发送...',
					mask: true
				});

				sendSmsCode(params)
					.then(res => {
						console.log(res);
						uni.hideLoading();
						// uni.setStorageSync('mobileCode', res);
						// 倒计时
						this.countNum = 120;
						this.countDownTimer = setInterval(
							function() {
								this.countDown();
							}.bind(this),
							1000
						);
					})
					.catch(error => {
						console.log(error);
						uni.hideLoading();
						this.vcodeBtnName = '重新发送';
						uni.showToast({
							icon: 'none',
							title: '验证码发送失败！'
						});
					});
			},
			countDown() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = "重新发送";
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + '秒重发';
			},
			//短信验证
			validateCode() {
				//表单校验通过后 校验验证码是否正确
				let mobileCode = uni.getStorageSync("mobileCode");
				if (mobileCode !== undefined && mobileCode !== "") {
					let {
						mobile,
						code
					} = this.formData;

					if (mobileCode.mobile !== mobile) {
						uni.showToast({
							title: '请发送验证码',
							icon: "none"
						});
						return false;
					}
					if (mobileCode.code !== code) {
						uni.showToast({
							title: '短信验证码不正确',
							icon: "none"
						});
						return false;
					}
					return true;
				} else {
					uni.showToast({
						title: '请发送验证码',
						icon: "none"
					});
					return false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.app-register {
		padding: $padding-content;

		.se-code {
			margin: 0 24rpx;
			font-size: 30rpx;
			color: rgba(228, 0, 17, 1);
		}

		.arrow-right {
			width: 80rpx;
			text-align: center;
			color: #A9A8A8;
		}
	}
</style>
