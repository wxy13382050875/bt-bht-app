<template>
	<view>
		<navBarTitle title="登陆"></navBarTitle>
		<bht-layout-container bgColor="#fff" :bottom="0">
			<view class="login-wrapper" :style="{ bottom: bottom + 'rpx' }">
				<view class="login-top">
					<view class="logo-box"><image class="app-logo" src="/static/app_logo_d.png"></image></view>
					<image class="app-logo-2" src="/static/app_logo_login1.png"></image>
				</view>
				<view class="app-login">
					<view class="aca-form-input">
						<view class="aca-input-icon"><view class="iconfont aca-shouji"></view></view>
						<input class="aca-input" type="number" name="input" v-model="loginData.phone" placeholder="请输入手机号" />
					</view>
					<view class="aca-form-input">
						<view class="aca-input-icon"><view class="iconfont aca-mima"></view></view>
						<input class="aca-input" @focus="inputFocus" @blur="inputBlur" type="password" name="input" v-model="loginData.password" placeholder="请输入密码" />
					</view>
					<button class="app-btn" hover-class="" @click="handleLogin">登录</button>
					<view class="login-footer">
						<navigator class="item" url="/pages/common/forget" hover-class="none">忘记密码</navigator>
						<navigator class="item" url="/pages/common/register" hover-class="none">注册</navigator>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
import formValidate from '@/utils/validate';
import navBarTitle from '@/components/navbar/navbar-title-default.vue';
import { login } from '@/api/shop.js';
import { mapActions } from 'vuex';
export default {
	components: {
		navBarTitle
	},
	data() {
		return {
			loginData: {
				phone: '',
				password: ''
			},
			rule: [
				{
					name: 'phone',
					checkType: 'phoneno',
					errorMsg: '请填写正确的手机号'
				},
				{
					name: 'password',
					checkType: 'notnull',
					errorMsg: '请填写密码'
				}
			],
			loginBtn: true,
			bottom: 0
		};
	},
	created() {
		//赋值手机号
		this.loginData.phone = this.mobile;
	},
	methods: {
		...mapActions('user', ['setLoginStatus', 'setUserInfo', 'setMobile']),
		//登录处理
		handleLogin() {
			let valid = formValidate.check({ ...this.loginData }, this.rule);
			if (valid) {
				uni.showLoading({
					title: '正在登陆...',
					mask: true
				});
				login(this.loginData)
					.then(res => {
						uni.hideLoading();
						if (res.code === '200') {
							//保存用户信息到store
							this.setUserInfo(res.data);
							// this.setMobile(res.data.mobile)
							//缓存用户信息
							uni.setStorageSync('isLogin', true);
							uni.setStorageSync('userInfo', res.data);
							uni.setStorageSync('defaultAddress', res.data.defaultAddress);
							uni.redirectTo({
								url: '/pages/main'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}
					})
					.catch(erro => {
						console.log(erro);
						uni.hideLoading();
					});
			} else {
				uni.showToast({
					title: formValidate.error,
					icon: 'none'
				});
			}
		},
		inputFocus({ detail }) {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.bottom = detail.height;
				}
			});
		},
		inputBlur() {
			this.bottom = 0;
		}
	}
};
</script>

<style lang="scss">
.login-wrapper {
	position: relative;
	background: #ffffff;
}

.login-top {
	margin-top: 65rpx;
	text-align: center;

	.logo-box {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 241rpx;
		height: 241rpx;
		background: rgba(207, 32, 34, 1);
		border-radius: 121px;

		.app-logo {
			width: 142rpx;
			height: 141rpx;
		}
	}

	.app-logo-2 {
		margin-top: 27rpx;
		width: 218rpx;
		height: 95rpx;
	}
}

.app-login {
	margin-top: 134rpx;
	padding: 0 60rpx;

	.login-footer {
		margin-top: 23rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;

		.item {
			font-size: 30rpx;
			color: #e40011;
		}
	}
}
</style>
