<template>
	<view :style="{ height: height + 'px' }">
		<swiper class="swiper" autoplay="false" interval="3000" :indicator-dots="indicatorDots" duration="300" circular="true">
			<swiper-item v-for="(item, index) in dataSource" :key="index"><image :src="item.img" mode="widthFix"></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
//首页banner轮播组件
export default {
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			}
		},
		height: 0
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500
		};
	}
};
</script>

<style lang="scss" scoped>
.swiper {
	width: 100%;
	height: 100%;
	.swiper-item,
	image {
		width: 100%;
		height: 100% !important;
	}
}
</style>
