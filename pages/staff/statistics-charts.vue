<template>
	<view class="bht-layout-container">
		<nav-bar-location></nav-bar-location>
		<bht-layout-container bgColor="#fff">
			<view class="bht-layout-content">
				<view class="bht-layout-main bht-statistics-charts-main">
					<view class="statistics-charts-line"><uni-echarts canvasId="statistics_bill_line" ref="statistics_bill_line" @onInit="statisticsBillLine"></uni-echarts></view>
					<view class="bht-statistics-menu">
						<view class="header"><view class="title">统计报表</view></view>
						<view class="menu-list">
							<navigator class="item" hover-class="none" url="/pages/staff/borderer-jc-statistics">
								<image src="/static/fn/tj-jcktj-icon.png"></image>
								<label>进出口统计</label>
							</navigator>
							<navigator class="item" hover-class="none" url="/pages/staff/goods-jc-statistics">
								<image src="/static/fn/tj-jy-icon.png"></image>
								<label>交易统计</label>
							</navigator>
							<navigator class="item" hover-class="none" url="/pages/staff/statement-bill-charts">
								<image src="/static/fn/tj-jsd-icon.png"></image>
								<label>结算单统计</label>
							</navigator>
						</view>
					</view>
					<view class="bht-statistics-data">
						<view class="header">
							<view class="title">当日数据</view>
							<view class="opt">
								<view class="item" :class="{ 'active-item': dataFlag === 'I' }" @click="changeFlag('I')">进口</view>
								<view class="item" :class="{ 'active-item': dataFlag === 'E' }" @click="changeFlag('E')">出口</view>
							</view>
						</view>
						<day-of-statistics :statsData="statsData"></day-of-statistics>
						<bill-statistics :tradeData="statsData.tradeData"></bill-statistics>
					</view>
				</view>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 *
 * 统计报表
 *
 */
import * as echarts from '@/components/mpvue-echarts/echarts.min.js';
import DayOfStatistics from '@/components/staff/day-of-statistics.vue';
import BillStatistics from '@/components/staff/bill-statistics.vue';
import { currentMonth } from '@/api/stats.js';
export default {
	components: {
		DayOfStatistics,
		BillStatistics
	},
	data() {
		return {
			dataFlag: 'I',
			statsData: {},
			currentMonthData: {}
		};
	},
	watch: {
		dataFlag(n) {
			if (n === 'I') {
				this.statsData = this.currentMonthData['importData'];
			}
			if (n === 'E') {
				this.statsData = this.currentMonthData['exportData'];
			}
		}
	},
	methods: {
		changeFlag(flag) {
			this.dataFlag = flag;
		},
		async reqData() {
			//请求数据
			this.currentMonthData = await currentMonth();
			this.statsData = this.currentMonthData['importData'];
		},
		async statisticsBillLine(e) {
			//在初始化图表时候 发送请求数据
			await this.reqData();

			let { width, height } = e;
			let canvas = this.$refs.statistics_bill_line.canvas;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});

			//组装数据
			let { xAxis, axisValues } = this.currentMonthData.tradeAcountTrend;

			let option = {
				grid: {
					// #ifdef APP-PLUS
					left: '10%',
					right: '4%',
					bottom: '10%',
					top: '10%',
					// #endif
					// #ifdef H5
					left: '2%',
					right: '4%',
					bottom: '2%',
					top: '10%',
					// #endif
					containLabel: true
				},
				//backgroundColor: '#ef4455',
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisLine: { lineStyle: { color: '#fff' } },
					axisTick: {
						show: false
					},
					data: xAxis
				},
				yAxis: {
					type: 'value',
					axisLine: { lineStyle: { color: '#fff' } },
					axisTick: {
						show: false
					},
					splitLine: { show: false }
				},
				series: [
					{
						data: axisValues[0],
						type: 'line',
						symbol: 'none',
						lineStyle: {
							normal: {
								color: '#fff'
							}
						},
						areaStyle: { normal: { color: '#fff' } }
					}
				]
			};
			chart.setOption(option);
			//this.$refs.statistics_bill_line.setChart(chart);
		}
	}
};
</script>

<style lang="scss">
.bht-statistics-charts-main {
	position: relative;
	padding: $padding-content;
	.statistics-charts-bg {
		height: 120rpx;
		background: $nav-bg-color;
	}
	.statistics-charts-line {
		height: 286rpx;
		background-color: #ef4455;
		box-shadow: 0 0 16rpx 0 rgba(134, 134, 134, 0.4);
		border-radius: 6rpx;
	}

	.bht-statistics-menu {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		height: 300rpx;
		@include bht-box;
		.header {
			@include statistics-header;
			height: 80rpx;
		}
		.menu-list {
			display: flex;
			flex: 1;
			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				image {
					width: 94rpx;
					height: 94rpx;
				}
				label {
					margin-top: 15rpx;
					font-size: 24rpx;
					color: #636464;
				}
			}
		}
	}
	.bht-statistics-data {
		margin-top: 20rpx;
		padding-bottom: $padding-content;
		@include bht-box;
		.header {
			@include statistics-header;
			height: 102rpx;
			// .title {
			// 	@include statistics-title;
			// }
		}
	}
}
</style>
