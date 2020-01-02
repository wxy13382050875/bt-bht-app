<template>
	<view class="goods-list">
		<navigator :url="'/pages/shop/goods-details?goodsId='+item.goodsId+'&storeId='+ item.storeId" hover-class="none" :class="{ 'item-three': count == 3, 'item-two': count == 2 }" v-for="(item, index) in dataSource" :key="index">
			<view :style="{ height: height + 'px' }"><image :src="item.goodsPicture"></image></view>
			<view class="title" v-if="count == 2">{{ item.goodsName }}</view>
			<view class="good-info">
				<view>
					<label class="goods-nprice">¥{{ item.price }}</label>
					<label class="goods-oprice" v-if="count == 2">¥{{ item.originalPrice }}</label>
				</view>
				<view>
					<label class="goods-oprice" v-if="count == 3">¥{{ item.originalPrice }}</label>
					<label class="goods-number" v-if="count == 2">{{ item.goodsSales }}个付款</label>
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
		},
		count: 0
	},
	data() {
		return {
			height: 0
		};
	},
	created() {
		// console.log('-1111------' + this.dataSource);
		var sysinfo = uni.getSystemInfoSync(),
			windowWidth = sysinfo.windowWidth;
		//减去底部导航高度
		this.height = (windowWidth - (this.count + 1) * 5) / this.count;
	}
};
</script>

<style lang="scss">
.goods-list {
	margin-top: 17rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 5 10rpx;
	.item-three {
		width: calc((100% - 15rpx) / 3);
		
		image {
			width: 100%;
			height: 100%;
		}
		.title {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 26rpx;
			color: #333333;
			
		}
		.good-info {
			display: flex;
			justify-content: center;
			height: 80rpx;
			line-height: 80rpx;
			.goods-nprice {
				font-size: 32rpx;
				color: #ff3333;
			}
			.goods-oprice {
				margin-left: 20rpx;
				text-decoration:line-through;
				font-size: 22rpx;
				color: #999999;
			}
			.goods-number {
				font-size: 22rpx;
				color: #999999;
			}
		}
	}
	.item-two {
		width: calc((100% - 15rpx) / 2);
		image {
			width: 100%;
			height: 100%;
		}
		.title {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 26rpx;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.good-info {
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			.goods-nprice {
				font-size: 32rpx;
				color: #ff3333;
			}
			.goods-oprice {
				margin-left: 20rpx;
				text-decoration:line-through;
				font-size: 22rpx;
				color: #999999;
			}
			.goods-number {
				font-size: 22rpx;
				color: #999999;
			}
		}
	}
}
</style>
