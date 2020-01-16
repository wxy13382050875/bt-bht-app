<template>
	<view>
		<view class="goods-list-items" v-for="item in goodsData.list" :key="item.id">
			<view class="check"><nz-checkbox v-model="item.checked" @select="chooseItem(item)" :circle="true"></nz-checkbox></view>
			<view class="info">
				<view class="info-header">
					<view class="goods-name">{{ item.goodsName }}</view>
					<view class="price">
						<label class="symbol">¥</label>
						<text class="value">{{ item.amount }}</text>
					</view>
				</view>
				<view class="info-items">
					<label class="title">边民姓名</label>
					<text class="value">{{ item.seller }}</text>
				</view>
				<view class="info-items">
					<label class="title">车牌号</label>
					<text class="value">{{ item.plateNumber }}</text>
				</view>
				<view class="info-items">
					<label class="title">重量</label>
					<text class="value">{{ item.weight }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import NzCheckbox from '@/third/acaui/nz-checkbox/nz-checkbox.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		NzCheckbox
	},
	computed: {
		...mapGetters({
			goodsData: 'sem/goodsData'
		})
	},
	methods: {
		chooseItem(item) {
			item.checked ? this.chooseTrue(item) : this.chooseFalse(item);
		},
		chooseTrue(item) {
			++this.goodsData.checkTotalCount;
			this.goodsData.checkTotalCount == this.goodsData.list.length ? (this.goodsData.checkStatus = true) : (this.goodsData.checkStatus = false);
		},
		chooseFalse(item) {
			--this.goodsData.checkTotalCount;
			this.goodsData.checkStatus = false;
		}
	}
};
</script>

<style lang="scss">
.goods-list-items {
	display: flex;
	margin-bottom: $padding-content;
	padding: 0 $padding-content;
	background-color: #fff;
	border-radius: 10px;
	&:last-child {
		margin-bottom: 0;
	}

	.check {
		display: flex;
		align-items: center;
		width: 42px;
	}
	.info {
		flex: 1;
		.info-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 71rpx;
			border-bottom: 2px solid #b2b4b3;
			.goods-name {
				flex: 1;
				text-overflow: hidden;
				font-size: 32rpx;
				color: #333;
			}
			.price {
				width: 80px;
				text-align: right;
				color: #ff3333;
				.symbol {
					font-size: 22rpx;
				}
				.value {
					font-size: 32rpx;
				}
			}
		}
		.info-items {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 54rpx;
			font: 26rpx;
			color: #898989;
			border-bottom: 1px solid #e5e5e5;

			&:last-child {
				border-bottom: 0;
			}
		}
	}
}
</style>
