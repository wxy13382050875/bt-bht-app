<template>
	<view class="navbar-container" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-header" :style="{ height: navHeight + 'px' }">
			<view class="navbar-header--logo"><image src="/static/app_logo_nav.png"></image></view>
			<!--跳转到搜索页面-->
			<navigator class="navbar-header--search" url="/pages/shopping/search" hover-class="none">
				<view class="search-icon iconfont aca-sousuo"></view>
				<text class="search-text">大家都在边互通2折起聚划算</text>
			</navigator>
			<view class="navbar-header--message">
				<view class="message-icon iconfont aca-xiaoxi"></view>
				<label class="message-box">32</label>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'navbar-back',
	props: {
		title: String
	},
	computed: {
		...mapGetters({
			curUrl: 'utp/curUrl',
			navHeight: 'utp/navHeight',
			statusHeight: 'utp/statusHeight'
		})
	}
};
</script>

<style lang="scss">
.navbar-container {
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
		padding: 0 $padding-content;
		.navbar-header--logo {
			margin-right: 16rpx;
			width: 179rpx;
			height: 57rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.navbar-header--search {
			flex: 1;
			display: flex;
			align-items: center;
			padding-left: 18rpx;
			height: 58rpx;
			background: rgba(255, 255, 255, 1);
			opacity: 1;
			border-radius: 28rpx;
			.search-icon {
				font-size: 38rpx;
				color: #ff3333;
			}
			.search-text {
				margin-left: 16rpx;
				font-size: 22rpx;
				color: #898989;
			}
		}
		.navbar-header--message {
			margin-left: 16rpx;
			.message-icon {
				font-size: 32px;
				color: #fff;
			}
			.message-box {
				display: block;
				/* #ifdef APP-PLUS */
				padding: 1px 5px;
				/* #endif */
				/* #ifdef H5 */
				padding: 0px 5px;
				/* #endif */
				background: #ff3333;
				border: 1px solid #f7f3f0;
				border-radius: 50px;
				position: absolute;
				top: 3px;
				right: 4px;
				font-size: 16rpx;
				text-align: center;
				color: #fff;
			}
		}
	}
}
</style>
