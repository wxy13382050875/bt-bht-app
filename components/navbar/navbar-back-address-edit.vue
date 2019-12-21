<template>
	<view class="navbar-address-container" :style="{ height: statusHeight + navHeight + 'px' }">
		<view class="status" :style="{ height: statusHeight + 'px' }"></view>
		<view class="navbar-header" :style="{ height: navHeight + 'px' }">
			<view class="nav-back" @click="backToPrev"><label class="icon iconfont aca-fanhui1"></label></view>
			<view class="nav-rigt">
				<view class="title">添加收货地址</view>
				<view class="opt-btn" @click="saveAddress"><label>保存</label></view>
			</view>
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
		},
		saveAddress(e) {
			this.$emit('saveEvent', e);
		}
	}
};
</script>

<style lang="scss" scoped>
.navbar-address-container {
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
		.nav-rigt {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			.opt-btn {
				height: 100%;
				width: 52px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>
