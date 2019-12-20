<template>
	<view class="navbar-personal-wrapper" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-personal-header" :style="{ height: navHeight + 'px' }">
			<view class="title">个人中心</view>
			
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
.navbar-personal-wrapper {
	position: fixed;
	z-index: 1993;
	width: 100%;

	background: #E40011;
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
	.navbar-personal-header {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
