<template>
	<view class="navbar-search-container" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-header" :style="{ height: navHeight + 'px' }">
			<view class="nav-back" @click="backToPrev"><label class="icon iconfont aca-fanhui1"></label></view>
			<view class="search-box">
				<image src="/static/icon/search.png"></image>
				<input type="text" />
			</view>
			<view class="list-type"><!-- <image src="/static/icon/list_type_icon.png"></image> --></view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: {
		title: String
	},
	computed: {
		...mapGetters({
			curUrl: 'utp/curUrl',
			navHeight: 'utp/navHeight',
			statusHeight: 'utp/statusHeight'
		})
	},
	methods: {
		backToPrev() {
			this.$Router.back();
		}
	}
};
</script>

<style lang="scss" scoped>
.navbar-search-container {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1993;
	background: $nav-bg-color;

	.navbar-header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nav-back {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 28rpx;
			width: 62rpx;
			height: 100%;
			color: $text-color-white;
			font-size: 34rpx;
			z-index: 22;

			.icon {
				font-size: 34rpx;
			}
		}
		.search-box {
			flex: 1;
			display: flex;
			align-items: center;
			height: 58rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 28px;
			image {
				margin-left: 17rpx;
				width: 37rpx;
				height: 37rpx;
			}
			input{
				margin-left: 15rpx;
				flex: 1;
				height: 100%;
			}
		}
		.list-type {
			margin-left: 28rpx;
			margin-right: 22rpx;
			width: 41rpx;
			height: 41rpx;
			image {
				height: 100%;
				width: 100%;
			}
		}
	}
}
</style>
