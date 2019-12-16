<template>
	<view class="bht-layout-container-wrapper" :style="{ top: navHeight + 'px', height: height + 'px', background: bgColor }">
		<slot></slot>
		<!-- top: navHeight + 'px', bottom: bottom + 'px', <view class="space-h" v-if="showSpace"></view> -->
	</view>
</template>

<script>
//容器组件
import { mapGetters } from 'vuex';
export default {
	props: {
		showSpace: {
			type: Boolean,
			default: true
		},
		//背景颜色
		bgColor: {
			type: String,
			default: 'rgba(242, 242, 242, 1)'
		},
		bottom: {
			type: Number,
			default: 50
		}
	},
	data() {
		return {
			height: 0
		};
	},
	created() {
		var sysinfo = uni.getSystemInfoSync(),
			windowHeight = sysinfo.windowHeight;
		//减去底部导航高度
		this.height = windowHeight - this.navHeight;
	},
	computed: {
		...mapGetters('utp', ['navHeight'])
	}
};
</script>

<style lang="scss">
.bht-layout-container-wrapper {
	position: absolute;
	right: 0;
	left: 0;
	// // position: relative;
	// // -webkit-overflow-scrolling: touch;
	// overflow-y: scroll;

	// &::-webkit-scrollbar {
	// 	display: none;
	// 	width: 0;
	// 	height: 0;
	// 	color: transparent;
	// }

	// .space-h {
	// 	width: 100%;
	// 	height: 100rpx;
	// 	line-height: 100rpx;
	// }
}
</style>
