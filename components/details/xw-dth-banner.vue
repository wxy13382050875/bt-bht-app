<template>
	<view class="swiper-banner" :style="{ height: height + 'rpx' }">
		<!--轮播-->
		<swiper class="swiper" :autoplay="type === 'index' ? true : false" interval="3000" :indicator-dots="indicatorDots" duration="300" circular="true" @change="changeSwiper">
			<swiper-item v-for="(item, index) in dataSource" :key="index">
				<navigator class="navigator" v-if="type === 'index'" :url="'/pages/shop/goods-details?id=' + item.id" hover-class="none">
					<image :src="item.img" mode="widthFix" class="img"></image>
				</navigator>
				<image class="img" v-if="type === 'details'" :src="item.img" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view v-if="type === 'index'" class="index-swiper-dots">
			<view class="dots" :class="{ 'dots-active': bannerIndex === index }" v-for="(item, index) in dataSource" :key="index"></view>
		</view>
		<view v-if="type === 'details'" class="details-swiper-dots">
			<label class="active">{{ bannerIndex + 1 }}</label>
			<label>/</label>
			<label class="count">{{ dataSource.length }}</label>
		</view>
	</view>
</template>

<script>
/**
 * 轮播图片组件
 */
export default {
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			}
		},
		height: {
			type: Number,
			default: 296
		},
		type: {
			type: String,
			default: 'index'
		}
	},
	data() {
		return {
			indicatorDots: false,
			bannerIndex: 0
		};
	},
	methods: {
		changeSwiper({ detail }) {
			this.bannerIndex = detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper-banner {
	position: relative;
	.swiper {
		height: 100%;
		width: 100%;
		.swiper-item {
			width: 100%;
		}
		.navigator,
		.img {
			width: 100%;
			height: 100% !important;
		}
	}
	.index-swiper-dots {
		position: absolute;
		bottom: 16rpx;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.dots {
			margin: 0 8px;
			height: 16rpx;
			width: 16rpx;
			border-radius: 50px;
			background: #fff;
		}
		.dots-active {
			width: 32rpx;
			background-color: #f4d10a;
		}
	}
	.details-swiper-dots {
		position: absolute;
		bottom: 16rpx;
		right: 20rpx;
		width: 74rpx;
		height: 34rpx;
		font-size: 22rpx;
		text-align: center;
		color: #898989;
		background-color: #fff;
		border-radius: 20rpx;
	}
}
</style>
