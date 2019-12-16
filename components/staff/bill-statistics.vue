<template>
	<view class="bill-statistics-components">
		<view class="statistics-title">交易统计</view>
		<view class="data-line"></view>
		<view class="bill-statistics-list" ref="bill_box">
			<view class="item item-bg2">
				<view class="content">
					<label class="value">
						<bht-num-count :num="tradeData.quantity"></bht-num-count>
					</label>
					<view class="title">进口交易票次</view>
				</view>
			</view>
			<view class="item item-bg1">
				<view class="content">
					<label class="value">
						<bht-num-count :num="tradeData.vehicle"></bht-num-count>
					</label>
					<view class="title">进口货运车辆</view>
				</view>
			</view>
			<view class="item item-bg1">
				<view class="content">
					<label class="value">
						<bht-num-count :num="tradeData.weight"></bht-num-count>
					</label>
					<view class="title">进口货运量（吨）</view>
				</view>
			</view>
			<view class="item item-bg2">
				<view class="content">
					<label class="value">
						<bht-num-count :num="tradeData.amount"></bht-num-count>
					</label>
					<view class="title">进口货运值（万元）</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import BhtNumCount from '@/components/common/bht-num-count.vue';
export default {
	props: {
		tradeData: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	components: {
		BhtNumCount
	}
};
</script>

<style lang="scss">
.bill-statistics-components {
	padding: 0 $padding-content;
	margin-bottom: 20rpx;
	.statistics-title {
		position: relative;
		margin-bottom: 9rpx;
		height: 52rpx;
		font-size: 32rpx;
		color: #383838;
		font-weight: 400;
		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			width: 60rpx;
			height: 4rpx;
			background: rgba(255, 51, 51, 1);
			border-radius: 2px;
		}
	}
	.bill-statistics-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-top: 8px;
			width: calc(50% - 4px);
			height: 158rpx;
			border-radius: 8px;

			.content {
				padding-left: 38rpx;
			}
			.value {
				display: inline-block;
				padding-top: 12rpx;
				font-size: 34rpx;
				font-weight: bold;
			}
			.title {
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.item-bg1 {
			background-color: #ff9999;
			.value,
			.title {
				color: #ffffff;
			}
			.value {
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					height: 4rpx;
					background: rgba(255, 255, 255, 1);
				}
			}
		}
		.item-bg2 {
			background-color: #ffcccc;
			.value {
				position: relative;
				color: #ff3333;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					height: 4rpx;
					background: rgba(255, 102, 102, 1);
				}
			}
			.title {
				color: #525252;
			}
		}
	}
	.data-line {
		height: 2px;
		background-color: rgba(229, 229, 229, 1);
	}
}
</style>
