<template>
	<view class="goods-list">
		<navigator :url="item.page" hover-class="none" :class="{ 'item-three': count == 3, 'item-two': count == 2 }" v-for="(item, index) in dataSource" :key="index">
			<view :style="{ height: height + 'px' }"><image :src="item.url"></image></view>
			<view class="title" v-if="count == 2">{{ item.goodsName }}</view>
			<view class="good-info">
				<view>
					<label class="goods-nprice">¥{{ item.goodsPrice }}</label>
					<label class="goods-oprice" v-if="count == 2">¥{{ item.originalGoodsPrice }}</label>
				</view>
				<view>
					<label class="goods-oprice" v-if="count == 3">¥{{ item.originalGoodsPrice }}</label>
					<label class="goods-number" v-if="count == 2">¥{{ item.number }}</label>
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
			font-size: 26rpx;
			color: #333333;
		}
		.good-info {
			display: flex;
			justify-content: center;
			.goods-nprice {
				font-size: 32rpx;
				color: #ff3333;
			}
			.goods-oprice {
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
			font-size: 26rpx;
			color: #333333;
		}
		.good-info {
			display: flex;
			justify-content: space-between;
			.goods-nprice {
				font-size: 32rpx;
				color: #ff3333;
			}
			.goods-oprice {
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
