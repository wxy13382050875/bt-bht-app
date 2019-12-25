<template>
	<view class="goods-image">
		<view class="item">
			<label class="gray_line"></label>
			<label class="title">商品详情</label>
			<label class="gray_line"></label>
		</view>
		<view><image v-for="(item, index) in goodsDetails" :src="item.pictureUrl" style="width: 100%;" mode="widthFix"></image></view>
	</view>
</template>

<script>
/**
 * 商品详情
 */
export default {
	props: {
		goodsDetails: {
			type: Array,
			default: () => {
				return [];
			}
		}
	}
};
</script>

<style lang="scss">
.goods-image {
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		background: rgba(255, 51, 51, 1);
		.title {
			height: 100%;
			font-size: 30rpx;
			color: #ffffff;
		}
		.gray_line {
			background: #e5e5e5;
			width: 80px;
			height: 2px;
			float: left;
			margin: 10px 5px;
		}
	}
}
</style>
