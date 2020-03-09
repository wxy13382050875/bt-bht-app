<template>
	<view class="app-content" style="background: #FFFFFF;">
		<nav-bar-back title="注册" popType="0"></nav-bar-back>
		<bht-layout-container bg-color="#ffffff" :bottom="0">
			<view class="app-register">
				<view class="aca-form-input">
					<view class="aca-input-icon"><view class="iconfont icon-idcard"></view></view>
					<input class="aca-input" type="string" v-model="regData.idCode" placeholder="请输入身份证号" />
				</view>
				<picker @change="pickerPaperTypeChange" :value="paperTypeIndex" :range="roleArr">
					<view class="aca-form-input">
						<view class="aca-input-icon"><view class="iconfont icon-user-type"></view></view>
						<input class="aca-input" disabled="true" :value="roleText" placeholder="请选择角色" />
						<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
					</view>
				</picker>
				<view class="aca-form-input">
					<view class="aca-input-icon"><view class="iconfont icon-phone"></view></view>
					<input class="aca-input" type="number" v-model="regData.phone" placeholder="请输入手机号" />
				</view>
				<view class="aca-form-input">
					<view class="aca-input-icon"><view class="iconfont icon-verify-code"></view></view>
					<input class="aca-input" type="number" maxlength="6" v-model="regData.smsCode" placeholder="请输入验证码" />
					<text @click="getCode" class="se-code">{{ vcodeBtnName }}</text>
				</view>
				<view class="aca-form-input">
					<view class="aca-input-icon"><view class="iconfont icon-password"></view></view>
					<input class="aca-input" type="password" v-model="regData.password" placeholder="请输入密码" />
				</view>
				<button class="app-btn" hover-class="" @click="handleReg">注册</button>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import formValidate from '@/utils/validate';
import { saveUser } from '@/api/shop.js';
import { sendSmsCode, register } from '@/api/user';
import { getCivilFaceStatus } from '@/api/dth-rp-aly.js';
import { mixin_dth_rp_aly } from '@/mixins/dth-rp-mix.js';

export default {
	mixins: [mixin_dth_rp_aly],
	data() {
		return {
			regData: {
				roleId: 2,
				phone: '',
				password: '',
				smsCode: '',
				idCode: ''
			},
			roleText: '边民',
			paperTypeIndex: 1,
			vcodeBtnName: '获取验证码',
			rule: [
				{
					name: 'roleId',
					checkType: 'notnull',
					errorMsg: '请选择角色'
				},
				{
					name: 'phone',
					checkType: 'phoneno',
					errorMsg: '请填写正确的手机号'
				},
				{
					name: 'smsCode',
					checkType: 'string',
					checkRule: '6',
					errorMsg: '请正确填写短信验证码'
				},
				{
					name: 'password',
					checkType: 'number',
					checkRule: 'notnull',
					errorMsg: '请填写密码'
				},
				{
					name: 'idCode',
					checkType: 'string',
					checkRule: '18',
					errorMsg: '请正确填写证件号'
				}
			]
		};
	},
	computed: {
		...mapGetters('utp', ['roleArr', 'roleData'])
	},
	methods: {
		//注册处理
		handleReg() {
			let valid = formValidate.check({ ...this.regData }, this.rule);
			if (valid) {
				if (this.regData.roleId == 2) {
					//边民做实人认证
					this.civilDoFaceVerify();
				} else {
					//提交注册信息
					this.submitRegisterInfo();
				}
			} else {
				uni.showToast({
					title: formValidate.error,
					icon: 'none'
				});
			}
		},
		/**
		 * 边民做实人认证
		 */
		civilDoFaceVerify() {
			getCivilFaceStatus({
				idCode: this.regData.idCode,
				phone: this.regData.phone
			})
				.then(res => {
					this.$store.state.user.idCardNumber = this.regData.idCode;
					/**
					 * 在互市备案过，进行实人认证
					 */
					this.realPersonAuth()
						.then(res => {
							//实人认证通过，提交注册
							this.submitRegisterInfo();
						})
						.catch(error => {
							uni.showToast({
								title: error,
								icon: 'none'
							});
						});
				})
				.catch(error => {
					let { data } = error;
					uni.showToast({
						title: '未在互市备案，请备案后再操作！',
						icon: 'none',
						duration: 3000
					});
				});
		},
		/**
		 * 提交注册信息
		 */
		submitRegisterInfo() {
			register(this.regData)
				.then(res => {
					let { code, msg } = res;
					if (code == '200') {
						uni.showToast({
							title: '注册成功'
						});
						setTimeout(() => {
							uni.removeStorageSync('mobileCode');
							this.$Router.back();
						}, 2000);
					} else {
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
				})
				.catch(error => {
					uni.showToast({
						title: error.data.msg,
						icon: 'none'
					});
				});
		},
		pickerPaperTypeChange({ target }) {
			let role = this.roleData[target.value];
			this.regData.roleId = role.code;
			this.roleText = role.value;
			console.log(role);
		},
		//获取验证码
		getCode() {
			var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
			if (!myreg.test(this.regData.phone)) {
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
			params.phone = this.regData.phone;
			uni.showLoading({
				title: '正在发送...',
				mask: true
			});
			sendSmsCode(params)
				.then(res => {
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
				this.vcodeBtnName = '重新发送';
				return;
			}
			this.countNum--;
			this.vcodeBtnName = this.countNum + '秒重发';
		},
		//短信验证
		validateCode() {
			return true;
			//表单校验通过后 校验验证码是否正确
			let mobileCode = uni.getStorageSync('mobileCode');
			if (mobileCode !== undefined && mobileCode !== '') {
				let { mobile, code } = this.regData;

				if (mobileCode.mobile !== mobile) {
					uni.showToast({
						title: '请发送验证码',
						icon: 'none'
					});
					return false;
				}
				if (mobileCode.code !== code) {
					uni.showToast({
						title: '短信验证码不正确',
						icon: 'none'
					});
					return false;
				}
				return true;
			} else {
				uni.showToast({
					title: '请发送验证码',
					icon: 'none'
				});
				return false;
			}
		}
	}
};
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
		color: #a9a8a8;
	}
}
</style>
