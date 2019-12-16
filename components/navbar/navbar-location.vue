<template>
	<view class="nav" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar" :style="{ height: navHeight + 'px' }">
			<view class="navbar-location">
				<image class="icon" src="/static/icon/location-icon.png"></image>
				<label class="title">河口北山互市</label>
			</view>
			<view class="nav-logo-wrapper"><image class="nav-logo" src="/static/app_logo_nav.png"></image></view>
			<!-- #ifdef APP-PLUS || H5-->
			<navigator url="/pages/user/profile" class="navbar-right" hover-class="none">
				<image class="nav-bar-icon" src="/static/icon/my_center_icon.png"></image>
				<view class="title">个人中心</view>
			</navigator>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'aca-nav-bar',
	props: {
		//标题
		title: String
	},
	data() {
		return {
			navHeight: 0,
			statusHeight: 0
		};
	},
	computed: {
		...mapGetters('utp', ['curUrl'])
	},
	created() {
		/*动态计算*/
		var sysinfo = uni.getSystemInfoSync(),
			statusHeight = sysinfo.statusBarHeight,
			isiOS = sysinfo.system.indexOf('iOS') > -1;
		if (!isiOS) {
			this.navHeight = 48;
		} else {
			this.navHeight = 44;
		}

		this.statusHeight = statusHeight;
		this.setNavHeight(this.navHeight + this.statusHeight);
	},
	methods: {
		...mapActions('utp', ['setNavHeight']),
		backToPrev() {
			if ('/pages/common/login' === this.curUrl) {
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else {
				this.$Router.back();
			}
		}
	}
};
</script>

<style lang="scss">
.nav {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1120;
	text-align: center;
	background: $nav-bg-color;
}

.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 $padding-content;

	.nav-logo-wrapper {
		flex: 1;
		display: flex;
		align-items: center;
		height: 100%;

		.nav-logo {
			margin-left: 66rpx;
			width: 179rpx;
			height: 57rpx;
		}
	}

	.navbar-right {
		display: flex;
		flex-direction: column;
		align-items: center;

		.nav-bar-icon {
			width: 39rpx;
			height: 39rpx;
		}

		.title {
			font-size: 22rpx;
			color: $text-color-white;
		}
	}

	.navbar-location {
		display: flex;
		align-items: center;
		height: 100%;
		.icon {
			width: 27rpx;
			height: 32rpx;
		}
		.title {
			margin-left: 5px;
			font-size: 28rpx;
			color: #fff;
		}
	}

	.nav-level-2 {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;

		.nav-back {
			display: flex;
			width: 32px;
			height: 100%;
			align-items: center;
			color: $text-color-white;
			font-size: 34rpx;
			z-index: 22;

			.icon {
				font-size: 34rpx;
			}

			.back-title {
				margin-left: 10rpx;
			}
		}

		.title {
			position: absolute;
			left: 0;
			right: 0;
			flex: 1;
			font-size: 30rpx;
			color: $text-color-white;
			text-align: center;
		}
	}

	.navbar-capsule {
		position: absolute;
		width: 85px;
		height: 30px;
		border: 1px solid #c7c7c7;
		border-radius: 50px;
		background-color: trans;
	}

	.navbar-capsule {
		display: flex;
		align-items: center;

		.navbar-icon {
			flex: 1;
			font-size: 40rpx;
			color: #fff;
		}

		.navbar-iccon-split {
			width: 1px;
			height: 85%;
			background: #c7c7c7;
		}
	}
}
</style>
