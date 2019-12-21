<template>
	<view class="goods-info">
		<xw-dth-banner :dataSource="dataSource.goodsPictures" :height="750" type="details"></xw-dth-banner>
		<view class="item">
			<view>
				<label class="goods-nprice">¥{{ dataSource.price }}</label>
				<label>¥{{ dataSource.originalPrice }}</label>
				<label style="margin-left: 80rpx;">{{ dataSource.goodsSales }}人付款</label>
			</view>
			<view>
				<label class="goods-title">{{ dataSource.goodsName }}</label>
			</view>
			<view><label>全国包邮（新疆、西藏、青海、内蒙古除外）</label></view>
			<view style="height: 40px; align-items: center; display: flex; justify-content: space-between;">
				<label>快递：0.0</label>
				<label>销量：{{ dataSource.goodsSales }}</label>
				<label>发货地：{{ dataSource.producer }}</label>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 商品详情组件
 */
import XwDthBanner from '@/components/details/xw-dth-banner.vue';
export default {
	props: {
		dataSource: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	components: {
		XwDthBanner
	}
};
</script>

<style lang="scss">
.goods-info {
	background: #ffffff;
	.item {
		margin: 20rpx;
		.goods-nprice {
			font-size: 32rpx;
			color: #ff3333;
		}

		.goods-title {
			font-size: 30rpx;
			color: #333333;
		}
		label {
			font-size: 22rpx;
			color: #999999;
		}
	}
}
</style>
