<template>
	<view class="app-content">
		<center-nav-bar title="个人中心"></center-nav-bar>
		<bht-layout-container bg-color="#fff">
			<view class="my-center-bg"></view>
			<view class="my-center-main">
				<view class="my-center-box">
					<view class="left">
						<view class="avator"></view>
						<view class="info">
							<label class="name">{{userInfo.name}}</label>
							<text class="desc">{{userInfo.mobile}}</text>
						</view>
					</view>
					<view class="right">
						<router-link to="{name: 'edit-profile'}">
							<view class="iconfont aca-youjiantou"></view>
						</router-link>
					</view>
				</view>
				<view class="aca-list">
					<router-link to="{name: 'bill-management'}" v-if="userInfo.type==='001'">
						<view class="aca-list-item">
							<view class="icon">
								<image src="/static/icon/invoice_list_icon.png"></image>
							</view>
							<view class="content">
								<view class="title">开票管理</view>
								<view class="arrow-right">
									<view class="iconfont aca-youjiantou"></view>
								</view>
							</view>
						</view>
					</router-link>
					<router-link to="{name: 'profile'}">
						<view class="aca-list-item">
							<view class="icon">
								<image src="/static/icon/invoice_userinfo_icon.png"></image>
							</view>
							<view class="content">
								<view class="title">我的信息</view>
								<view class="arrow-right">
									<view class="iconfont aca-youjiantou"></view>
								</view>
							</view>
						</view>
					</router-link>
				</view>
				<view class="login-out-btn" @click="loginOut">退出</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import CenterNavBar from '@/third/acaui/nav/center-nav-bar.vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		components: {
			CenterNavBar
		},
		computed: {
			...mapGetters({
				userInfo: 'user/userInfo'
			})
		},
		methods: {
			...mapActions('user', ['setUserInfo', 'setLoginStatus']),
			//退出处理
			loginOut() {
				uni.clearStorageSync();
				this.setUserInfo({})
				this.setLoginStatus(false)
				this.$Router.push({
					name: 'login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-center-bg {
		height: 126rpx;
		background: $nav-bg-color;
	}

	.my-center-main {
		margin-top: -58px;
		padding: 0 26rpx;

		.my-center-box {
			display: flex;
			align-items: center;
			height: 285rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 16px 0px rgba(134, 134, 134, 0.4);
			border-radius: 6px;

			.left {
				display: flex;
				margin-left: 113rpx;

				.avator {
					width: 160rpx;
					height: 160rpx;
					background: #FF8F05;
					border-radius: 100%;
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 21rpx;

					.name {
						margin-bottom: 9rpx;
						font-size: 34rpx;
						color: #171717;
					}

					.desc {
						font-size: 26rpx;
						color: #999999;
					}
				}
			}

			.right {
				align-items: center;
				display: flex;
				margin-left: 134rpx;
				height: 100%;

				.iconfont {
					font-size: 42rpx;
					color: #999999;
				}
			}

		}

		.login-out-btn {
			margin-top: 84rpx;
			height: 94rpx;
			line-height: 94rpx;
			font-size: 34rpx;
			color: rgba(23, 23, 23, 1);
			text-align: center;

			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 10px 0px rgba(134, 134, 134, 0.4);
		}
	}

	.aca-list {
		margin-top: 57rpx;

		.aca-list-item {
			height: 82rpx;
			display: flex;
			align-content: center;

			.icon {
				display: flex;
				align-items: center;
				width: 49rpx;

				image {
					width: 39rpx;
					height: 39rpx;
				}
			}

			.content {
				position: relative;
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: space-between;
				margin-left: 13rpx;

				.title {
					color: #171717;
					font-size: 30rpx;
				}

				&::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0px;
					right: 0;
					border-top: 2rpx solid rgba(229, 229, 229, 1);
				}

				.arrow-right {
					color: #AAAAAA;
				}
			}

		}
	}
</style>
