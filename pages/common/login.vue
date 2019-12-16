<template>
	<view>
		<aca-nav-bar :level="2" title="登录"></aca-nav-bar>
		<bht-layout-container bgColor="#fff">
			<view class="login-wrapper" :style="{bottom: bottom+ 'rpx'}">
				<view class="login-top">
					<view class="logo-box">
						<image class="app-logo" src="/static/app_logo_d.png"></image>
					</view>
					<image class="app-logo-2" src="/static/app_logo_login1.png"></image>
				</view>
				<view class="app-login">
					<view class="aca-form-input">
						<view class="aca-input-icon">
							<view class="iconfont aca-shouji"></view>
						</view>
						<input class="aca-input" type="number" name="input" v-model="loginData.account" placeholder="请输入手机号" />
					</view>
					<view class="aca-form-input">
						<view class="aca-input-icon">
							<view class="iconfont aca-mima"></view>
						</view>
						<input class="aca-input" @focus="inputFocus" @blur="inputBlur" type="password" name="input" v-model="loginData.password"
						 placeholder="请输入密码" />
					</view>
					<button class="app-btn" hover-class="" @click="handleLogin">登录</button>
					<view class="login-footer">
						<router-link class="item" to="{name: 'forget'}">忘记密码？</router-link>
						<router-link class="item" to="{name: 'reg'}">注册</router-link>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import formValidate from '@/utils/validate'
	import {
		login
	} from '@/api/user'
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				loginData: {
					account: '',
					password: ''
				},
				rule: [{
						name: 'account',
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
			}
		},
		computed: {
			...mapGetters({
				mobile: 'user/mobile'
			})
		},
		created() {
			//赋值手机号
			this.loginData.account = this.mobile
		},
		methods: {
			...mapActions('user', ['setLoginStatus', 'setUserInfo', 'setMobile']),
			//登录处理
			handleLogin() {
				let valid = formValidate.check({ ...this.loginData
				}, this.rule);
				if (valid) {
					login(this.loginData).then(res => {
						if (res.code === 500) {
							uni.showToast({
								icon: 'none',
								title: '手机号或密码错误'
							});
						}
						if (res.code === 200) {
							//获取菜单列表
							//设置登录状态
							this.setLoginStatus(true);
							//保存用户信息到vuex
							this.setUserInfo(res.data);
							this.setMobile(res.data.mobile)
							//缓存用户信息
							uni.setStorageSync('userInfo', res.data);
							//跳转首页
							this.$Router.pushTab({
								name: 'index'
							})
						}
					}).catch(erro => {
						console.log(erro)
					})
				} else {
					uni.showToast({
						title: formValidate.error,
						icon: 'none'
					});
				}
			},
			inputFocus({
				detail
			}) {
				var that = this;
				uni.getSystemInfo({
					success(res) {
						that.bottom = detail.height
					}
				})
			},
			inputBlur() {
				this.bottom = 0
			}
		}
	}
</script>

<style lang="scss">
	.login-wrapper {
		position: relative;
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
				color: #E40011;
			}
		}
	}
</style>
