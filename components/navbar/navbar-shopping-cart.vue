<template>
	<view class="navbar-shopping-wrapper" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-shopping-header" :style="{ height: navHeight + 'px' }">
			<view class="title">购物车</view>
			<view class="message-icon"><image src="/static/icon/message_icon.png"></image></view>
		</view>
	</view>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters({
			statusHeight: 'utp/statusHeight',
			navHeight: 'utp/navHeight'
		})
	}
};
</script>
<style lang="scss" scoped>
.navbar-shopping-wrapper {
	position: fixed;
	z-index: 1993;
	width: 100%;

	background: $nav-bg-color;
	.title {
		font-size: 34rpx;
		color: #fff;
	}
	.message-icon {
		width: 42rpx;
		height: 38rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.navbar-shopping-header {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
