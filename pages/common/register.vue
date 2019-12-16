<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="注册"></aca-nav-bar>
		<bht-layout-container bg-color="#fff">
			<view class="app-register">
				<picker @change="pickerPaperTypeChange" :value="paperTypeIndex" :range="roleArr">
					<view class="aca-form-input">
						<view class="aca-input-icon">
							<view class="iconfont aca-user"></view>
						</view>
						<input class="aca-input" disabled="true" :value="roleText" placeholder="请选择角色" />
						<view class="arrow-right">
							<view class="iconfont aca-xiala"></view>
						</view>
					</view>
				</picker>
				<view class="aca-form-input">
					<view class="aca-input-icon">
						<view class="iconfont aca-shouji"></view>
					</view>
					<input class="aca-input" type="number" v-model="regData.mobile" placeholder="请输入手机号" />
				</view>
				<view class="aca-form-input">
					<view class="aca-input-icon">
						<view class="iconfont aca-securityCode-b"></view>
					</view>
					<input class="aca-input" type="number" maxlength="6" v-model="regData.code" placeholder="请输入验证码" />
					<text @click="getCode" class="se-code">{{vcodeBtnName}}</text>
				</view>
				<view class="aca-form-input">
					<view class="aca-input-icon">
						<view class="iconfont aca-mima"></view>
					</view>
					<input class="aca-input" type="password" v-model="regData.password" placeholder="请输入密码" />
				</view>
				<button class="app-btn" hover-class="" @click="handleReg">注册</button>
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
		register,
		sendMobileCode
	} from '@/api/user'
	export default {
		data() {
			return {
				regData: {
					type: '',
					mobile: '',
					password: '',
					code: '',
				},
				roleText: '',
				paperTypeIndex: 0,
				vcodeBtnName: '获取验证码',
				rule: [{
						name: "type",
						checkType: "notnull",
						errorMsg: "请选择角色"
					}, {
						name: "mobile",
						checkType: "phoneno",
						errorMsg: "请填写正确的手机号"
					},
					{
						name: "code",
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
			//注册处理
			handleReg() {
				let valid = formValidate.check({ ...this.regData
				}, this.rule);
				if (valid) {
					if (this.validateCode()) {
						register(this.regData).then(res => {
							let {
								code,
								msg
							} = res.data;
							//注册成功
							if (code === 200) {
								uni.showToast({
									title: '注册成功'
								});
								setTimeout(() => {
									uni.removeStorageSync("mobileCode");
									this.$Router.replace({
										name: 'login'
									})
								}, 2000);
							}
							//手机号已存在
							if (code === 500) {
								uni.showToast({
									title: msg,
									icon: "none"
								});
							}
						}).catch(erro => {

						})
					}
				} else {
					uni.showToast({
						title: formValidate.error,
						icon: 'none'
					});
				}
			},
			pickerPaperTypeChange({
				target
			}) {
				let role = this.roleData[target.value];
				this.regData.type = role.code;
				this.roleText = role.value;
			},
			//获取验证码
			getCode() {
				var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.regData.mobile)) {
					uni.showToast({
						title: '请正确填写手机号码',
						icon: "none"
					});
					return false;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				this.vcodeBtnName = "发送中...";
				sendMobileCode(this.regData.mobile).then(res => {
					uni.setStorageSync("mobileCode", res);
					// 倒计时
					this.countNum = 120;
					this.countDownTimer = setInterval(function() {
						this.countDown();
					}.bind(this), 1000);
				}).catch(error => {
					this.vcodeBtnName = "重新发送";
					uni.showToast({
						icon: 'none',
						title: '验证码发送失败！'
					})
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
					} = this.regData;

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
		padding: 60rpx 60rpx 0;

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
