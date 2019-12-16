<template>
	<view>
		<nav-bar-location></nav-bar-location>
		<bht-layout-container bgColor="#EBEBEB">
			<view class="app-container">
				<view class="content-container">
					<view class="statistics-box">
						<view class="data-of-the-day">
							<view class="header">
								<view class="title">当日数据</view>
								<view class="opt">
									<view class="item" :class="{ 'active-item': dataFlag === 'I' }" @click="changeFlag('I')">进口</view>
									<view class="item" :class="{ 'active-item': dataFlag === 'E' }" @click="changeFlag('E')">出口</view>
								</view>
							</view>
							<day-of-statistics :statsData="statsData"></day-of-statistics>
						</view>
						<view class="data-statistics-block">
							<bill-statistics :tradeData="statsData.tradeData"></bill-statistics>
							<view class="goods-sort">
								<view class="statistics-title">商品榜</view>
								<view class="data-line"></view>
								<view class="goods-statistics-bar"><uni-echarts canvasId="goodsSort_bar" ref="goodsSortBar" @onInit="onInitGoodsSort"></uni-echarts></view>
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
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
import * as echarts from '@/components/mpvue-echarts/echarts.min.js';
import DayOfStatistics from '@/components/staff/day-of-statistics.vue';
import BillStatistics from '@/components/staff/bill-statistics.vue';
import { todayDataReq } from '@/api/stats.js';
import { mapActions, mapGetters } from 'vuex';
var echartsInstans = null;
export default {
	components: {
		DayOfStatistics,
		BillStatistics
	},
	data() {
		return {
			echarts,
			statsData: {},
			dataFlag: 'I' //进出口标识
		};
	},
	computed: {
		...mapGetters({
			todayData: 'stats/todayData'
		})
	},
	watch: {
		dataFlag(n) {
			if (n === 'I') {
				this.statsData = this.todayData['importData'];
			}
			if (n === 'E') {
				this.statsData = this.todayData['exportData'];
			}
			//动态更新charts数据
			//#ifdef APP-PLUS
			let option = this.optionsConfig();
			echartsInstans.setOption(option);
			//#endif
		}
	},
	//#ifdef H5
	async onLoad() {
		await this.reqData();
	},
	//#endif
	methods: {
		...mapActions({
			setTodayData: 'stats/setTodayData'
		}),
		changeFlag(flag) {
			this.dataFlag = flag;
		},
		async reqData() {
			//请求数据
			const todayData = await todayDataReq();
			this.setTodayData(todayData);
			this.statsData = this.todayData['importData'];
		},
		//生成 返回option
		optionsConfig() {
			let { xAxis, axisValues } = this.statsData.goodsRank;
			let bgData = [];
			var max = axisValues.reduce((a, b) => {
				return b > a ? b : a;
			});
			axisValues.forEach((item, index) => {
				bgData.push(max);
			});
			let option = {
				title: {
					show: false,
					text: ''
				},
				grid: {
					top: '5%',
					right: '15%',
					bottom: '5%',
					left: '15%',
					borderColor: '#ffffff'
				},
				xAxis: {
					axisTick: 'none',
					splitLine: 'none',
					axisLabel: false,
					axisLine: {
						lineStyle: {
							color: '#868686'
						}
					}
				},
				yAxis: [
					{
						axisTick: 'none',
						splitLine: 'none',
						axisLabel: {
							textStyle: {
								color: '#6B6B6B'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#868686'
							}
						},
						data: xAxis
					},
					{
						type: 'category',
						axisLine: 'none',
						axisLabel: {
							textStyle: {
								color: '#6B6B6B'
							}
						},
						data: axisValues
					}
				],
				series: [
					{
						barWidth: 10,
						type: 'bar',
						barGap: '-60%',
						data: bgData,
						itemStyle: {
							normal: {
								color: '#FDE1E4'
							}
						}
					},
					{
						barWidth: 10,
						type: 'bar',
						yAxisIndex: 1,
						data: axisValues,
						itemStyle: {
							normal: {
								color: function(params) {
									var myColor = ['#FC8D52', '#48CFAE', '#EC87BF', '#FFCE55', '#FD7C76'];
									return myColor[params.dataIndex];
								}
							}
						}
					}
				]
			};
			return option;
		},
		async onInitGoodsSort(e) {
			//#ifdef H5
			//H5不渲染图表
			return;
			//#endif
			await this.reqData();
			let { width, height } = e;
			let canvas = this.$refs.goodsSortBar.canvas;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			let option = this.optionsConfig();
			chart.setOption(option);
			this.$refs.goodsSortBar.setChart(chart);
			echartsInstans = chart;
		}
	}
};
</script>

<style lang="scss">
.app-container {
	height: 100%;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
		width: 0;
	}
	.content-container {
		padding: 20rpx;
	}
}
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
		padding: 0 $padding-content;
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
		.goods-statistics-bar {
			height: 432rpx;
		}
	}
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
