<template>
	<view class="goods-store">
		<view class="left-item">
			<image :src="storeInfo.storePicture || '/static/icon_favicon.ico'"></image>
			<view style="margin-left: 20rpx; align-items: center;">
				<view class="title">{{ storeInfo.storeName }}</view>
				<view class="describe">{{ storeInfo.storeAddress }}</view>
			</view>
		</view>
		<view class="right-item">
			<!-- <button class="baby">全部宝贝</button>
			<button class="go-store">进店逛逛</button> -->
		</view>
	</view>
</template>

<script>
/**
 * 店铺列表
 */
export default {
	props: {
		storeInfo: {
			type: Object,
			default: () => {
				return {};
			}
		}
	}
};
</script>

<style lang="scss">
.goods-store {
	margin-top: 20rpx;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	padding: 20rpx;
	.left-item {
		display: flex;
		align-items: center;
		image {
			width: 100rpx;
			height: 100rpx;
		}
		.title {
			color: #333333;
			font-size: 24rpx;
		}
		.describe {
			color: #999999;
			font-size: 20rpx;
		}
	}
	.right-item {
		display: flex;
		align-items: center;

		.baby {
			color: #ff3333;
			font-size: 24rpx;
			border: 1rpx solid rgba(187, 187, 187, 1);
			background: #ffffff;
			border-radius: 34rpx;
			opacity: 1;
			margin-right: 20rpx;
		}
		.go-store {
			color: rgba(255, 255, 255, 1);
			font-size: 24rpx;
			border: 1rpx solid rgba(187, 187, 187, 1);
			background: linear-gradient(103deg, rgba(228, 35, 50, 1) 0%, rgba(228, 0, 17, 1) 48%, rgba(226, 0, 17, 1) 51%, rgba(177, 6, 19, 1) 100%);
			border-radius: 34rpx;
			opacity: 1;
			margin-right: 20rpx;
		}
	}
}
</style>
