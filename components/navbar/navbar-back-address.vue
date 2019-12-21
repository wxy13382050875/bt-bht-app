<template>
	<view class="navbar-back-container" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-back-wrapper" :style="{ height: navHeight + 'px' }">
			<view class="nav-back-wrapper">
				<view class="nav-back" @click="backToPrev"><label class="icon iconfont aca-fanhui1"></label></view>
				<view class="title">
					<view>我的收货地址</view>
					<navigator url="/pages/user/my-address-create" hover-class="none">添加新地址</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'navbar-back',
	props: {
		title: String
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			curUrl: 'utp/curUrl',
			statusHeight: 'utp/statusHeight',
			navHeight: 'utp/navHeight'
		})
	},
	created() {},
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
.navbar-back-container {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1993;
	text-align: center;
	background: $nav-bg-color;
}

.navbar-back-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 $padding-content;

	.nav-back-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		justify-content: space-between;
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
		}

		.title {
			display: flex;
			justify-content: space-between;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 55rpx;
			display: flex;
			align-items: center;
			// justify-content: center;
			height: 100%;
			font-size: 30rpx;
			color: $text-color-white;
		}
	}
}
</style>
