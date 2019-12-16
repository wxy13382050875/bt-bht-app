<template>
	<view class="app-container">
		<view class="statistics-box">
			<view class="data-of-the-day">
				<view class="header">
					<view class="title">当日数据</view>
					<view class="opt">
						<view class="item active-item" @click="changeFlag('I')">进口</view>
						<view class="item" @click="changeFlag('E')">出口</view>
					</view>
				</view>
				<day-of-statistics></day-of-statistics>
			</view>
			<view class="data-statistics-block">
				<bill-statistics></bill-statistics>
				<view class="goods-sort">
					<view class="statistics-title">商品榜</view>
					<view class="data-line"></view>
					<view class="goods-statistics-line">
						<uni-echarts canvasId="goodsSort_line" ref="goodsSortLine" :echarts="echarts" @onInit="onInitGoodsSort"></uni-echarts>
					</view>
				</view>
			</view>
		</view>
		<view class="staff-menu-box">
			<view class="item">
				<image class="icon" src="/static/fn/c-spsb-icon.png"></image>
				<label class="title">商品申报查询</label>
			</view>
			<view class="item">
				<image class="icon" src="/static/fn/c-clsb-icon.png"></image>
				<label class="title">车辆申报查询</label>
			</view>
			<view class="item">
				<image class="icon" src="/static/fn/c-djcl-icon.png"></image>
				<label class="title">待检车辆查询</label>
			</view>
			<view class="item">
				<image class="icon" src="/static/fn/c-clwz-icon.png"></image>
				<label class="title">查看车辆位置</label>
			</view>
		</view>
	</view>
</template>

<script>
//现场工作人员首页组件
import BillStatistics from './bill-statistics.vue';
import DayOfStatistics from './day-of-statistics';
import * as echarts from '@/components/mpvue-echarts/echarts.min.js';
var echartsInstans = null;

export default {
	components: {
		BillStatistics,
		DayOfStatistics
	},
	data() {
		return {
			echarts,
			itemWidth: 0,
			onInit: this.onInitGoodsSort
		};
	},
	computed: {
		itemWidthC() {
			let { itemWidth } = this;
			return itemWidth;
		}
	},
	mounted() {
		let info = uni.createSelectorQuery().select('.bill-statistics-list');
		var that = this;
		setTimeout(() => {
			info.boundingClientRect(function(data) {
				// console.log(data.width);
				// that.$nextTick(() => {
				that.itemWidth = (data.width - 7) / 2;
				//});
			}).exec();
		}, 10);
	},
	methods: {
		changeFlag(flag) {
			var option = echartsInstans.getOption();
			if (flag === 'I') {
				var data = [0.55, 0.9, 0.9, 0.9, 0.6];
				option.series[1].data = data;
			}
			if (flag === 'E') {
				var data = [0, 0.333, 0.444, 0.555, 0.22];
				option.series[1].data = data;
			}
			echartsInstans.setOption(option);
		},
		onInitGoodsSort(e) {
			let { width, height } = e;
			let canvas = this.$refs.goodsSortLine.canvas;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			canvas.setChart(chart);
			var grayBar = [1, 1, 1, 1, 1];
			var showData = [0, 0.333, 0.444, 0.555, 0.22];
			var chartName = ['香蕉', '苹果', '鞋子', '日常家具', '苹果+香蕉+料理'];
			let option = {
				title: {
					show: false,
					text: '商品交易额（单位：万元）'
				},
				grid: {
					left: '%0',
					right: '%0',
					bottom: '%0',
					top: '10%',
					containLabel: true
				},
				xAxis: {
					show: false
				},
				yAxis: [
					{
						type: 'category',
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						}
					}
				],
				series: [
					{
						type: 'bar',
						barWidth: '50%',
						barGap: '-100%',
						itemStyle: {
							normal: {
								barBorderRadius: 100,
								color: '#FDE1E4'
							}
						},
						z: 1,
						label: {
							normal: {
								show: true,
								// #ifdef H5
								position: [0, -15],
								// #endif
								// #ifdef APP-PLUS
								position: [0, -10],
								// #endif
								textStyle: {
									fontSize: uni.upx2px(24),
									color: '#333'
								},
								formatter: function(data) {
									return chartName[data.dataIndex];
								}
							}
						},
						data: grayBar
					},
					{
						show: true,
						type: 'bar',
						barGap: '-100%',
						barWidth: '50%',
						barMinHeight: 50,
						itemStyle: {
							normal: {
								barBorderRadius: 100,
								color: function(params) {
									var colorList = ['#FC8D52', '#48CFAE', '#EC87BF', '#FFCE55', '#FD7C76'];
									return colorList[params.dataIndex];
								}
							}
						},
						label: {
							normal: {
								show: true,
								position: 'insideRight',
								textStyle: {
									color: '#fff',
									fontSize: uni.upx2px(24)
								},
								formatter: function(data) {
									return (showData[data.dataIndex] * 100).toFixed(1) + '%';
								}
							}
						},
						labelLine: {
							show: true
						},
						z: 2,
						data: showData
					}
				]
			};
			chart.setOption(option);
			this.$refs.goodsSortLine.setChart(chart);
			echartsInstans = chart;
			//this.echartsInstans = chart;
		}
	}
};
</script>

<style lang="scss">
.statistics-box {
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 0px 16px 0px rgba(134, 134, 134, 0.4);
	border-radius: 10px;
	padding-bottom: 34rpx;
	.data-of-the-day {
		.header {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 102rpx;
			&::after {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				content: '';
				height: 2px;
				background-color: #f7524b;
			}
			.title {
				display: flex;
				align-items: center;
				position: relative;
				padding-left: 25rpx;
				font-size: 34rpx;
				font-weight: bold;
				color: #383838;
				&::before {
					position: absolute;
					left: 0;
					content: '';
					width: 14rpx;
					height: 36rpx;
					background-color: #f7524b;
				}
			}
			.opt {
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-right: 20rpx;
				width: 311rpx;
				height: 74rpx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(191, 191, 191, 1);
				border-radius: 37px;
				color: #989898;
				font-size: 32rpx;
				.item {
					width: 148rpx;
					height: 64rpx;
					text-align: center;
					line-height: 64rpx;
				}
				.active-item {
					background: rgba(247, 82, 75, 1);
					border-radius: 32rpx;
					color: #fff;
				}
			}
		}
		.data-box {
			padding: $padding-content;
			.content {
				display: flex;
				align-content: center;
				height: 164rpx;
				background: linear-gradient(0deg, #f16b73, #ef4455);
				border-radius: 10rpx;
				color: #fff;
				.borderer-count,
				.vehicle-count {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.count {
						font-size: 46rpx;
						font-weight: bold;
					}
					.title {
						font-size: 26rpx;
					}
				}
				.vehicle-count {
					position: relative;
					&::before {
						position: absolute;
						left: 0;
						content: '';
						width: 2rpx;
						height: 50px;
						background-color: #fff;
					}
				}
			}
		}
	}

	.data-statistics-block {
		// padding: 0 $padding-content;
		.statistics-title {
			position: relative;
			margin-bottom: 9rpx;
			height: 52rpx;
			font-size: 32rpx;
			color: #383838;
			font-weight: bold;
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
		.data-line {
			height: 2px;
			background-color: rgba(229, 229, 229, 1);
		}
		.bill-statistics {
			margin-bottom: 20rpx;
			.bill-statistics-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-top: 14rpx;
					width: 328rpx;
					height: 158rpx;
					border-radius: 8px;
					.content {
						padding-left: 38rpx;
					}
					.value {
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
		}
		.goods-statistics-line {
			height: 432rpx;
		}

		.goods-sort {
			padding: 0 $padding-content;
		}
	}
}
.statistics-box {
	@include bht-box;
}
.staff-menu-box {
	margin-top: 22rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 174rpx;
	@include bht-box;
	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		.icon {
			width: 94rpx;
			height: 94rpx;
		}
		.title {
			color: #636464;
			font-size: 24rpx;
		}
	}
}
</style>
