<template>
	<view v-show="pageFlag === tabBarFlag">
		<aca-nav-bar></aca-nav-bar>
		<bht-layout-container bgColor="#fff">
			<view class="bht-layout-content">
				<view class="bht-layout-main bht-statistics-charts-main">
					<view class="statistics-charts-line">
						<uni-echarts canvasId="statistics_bill_line" ref="statistics_bill_line" :echarts="echarts" @onInit="statisticsBillLine"></uni-echarts>
					</view>
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
								<view class="item active-item" @click="changeFlag('I')">进口</view>
								<view class="item" @click="changeFlag('E')">出口</view>
							</view>
						</view>
						<day-of-statistics></day-of-statistics>
						<bill-statistics></bill-statistics>
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

import { mapGetters } from 'vuex';
export default {
	components: {
		DayOfStatistics,
		BillStatistics
	},
	data() {
		return {
			echarts,
			pageFlag: 'stat'
		};
	},
	computed: {
		...mapGetters({
			tabBarFlag: 'utp/getTabBarIndex'
		})
	},
	methods: {
		statisticsBillLine(e) {
			let { width, height } = e;
			let canvas = this.$refs.statistics_bill_line.canvas;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			let option = {
				grid: {
					left: '2%',
					right: '4%',
					bottom: '2%',
					top: '10%',
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
					data: ['1日', '5日', '10日', '15日', '20日', '25日', '30日']
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
						data: [820, 932, 901, 934, 1290, 1330, 1320],
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
	// padding: $padding-content;
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
