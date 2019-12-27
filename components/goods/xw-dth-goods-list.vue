<template>
	<view class="">
		<navigator :url="'/pages/shop/goods-details?goodsId=' + item.goodsId + '&storeId=' + item.storeId" class="goods-list" v-for="(item, index) in dataSource" :key="index">
			<view class="goods-image"><image :src="item.goodsPicture" mode=""></image></view>
			<view class="goods-info">
				<view class="title">{{ item.goodsName }}</view>
				<view class="details">{{ item.storeName }}</view>
				<view class="goods-price">
					<view>
						<label class="nprice">¥{{ item.price }}</label>
						<label class="oprice">¥{{ item.originalPrice }}</label>
					</view>
					<view>
						<label class="number">{{ item.goodsSales }}人付款</label>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	props: {
		dataSource: {
			type: Array,
			default() {
				return [];
			}
		}
	},

	methods: {}
};
</script>

<style lang="scss">
.goods-list {
	border-bottom: 1rpx solid #a7a7a7;
	display: flex;
	background: #ffffff;
	padding: 10rpx;
	.goods-image {
		image {
			width: 240rpx;
			height: 240rpx;
		}
	}
	.goods-info {
		margin-left: 28rpx;
		height: 240rpx;
		align-items: center;
		width: 100%;
		margin-right: 20rpx;
		.title {
			font-size: 26rpx;
			color: #333333;
		}
		.details {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 22rpx;
			color: #999999;
		}
		.goods-price {
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			.nprice {
				font-size: 32rpx;
				color: #ff3333;
			}
			.oprice {
				margin-left: 20rpx;
				text-decoration:line-through;
				font-size: 22rpx;
				color: #999999;
			}
			.number {
				font-size: 22rpx;
				color: #999999;
			}
		}
	}
}
</style>
