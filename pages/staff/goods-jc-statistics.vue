<template>
	<view class="bht-layout-container">
		<view class="bht-layout-container">
			<nav-bar-back title="进出口商品交易额统计"></nav-bar-back>
			<bht-layout-container bgColor="#F2F2F2" :bottom="0">
				<view class="goods-statistics-header">
					<view class="header-opt">
						<view class="date-box" @click="showPickerEvent">
							<label>{{ queryYear }}年</label>
							<label class="iconfont aca-xiala"></label>
						</view>
					</view>
				</view>
				<view class="bht-layout-main all-statistics-box-container">
					<view class="all-statistics-box">
						<label class="title">进出口商品交易总额(元)</label>
						<label class="value">
							<bht-num-count :num="totalAmount"></bht-num-count>
						</label>
					</view>
				</view>
				<view class="bht-layout-scroll">
					<view class="bht-echarts-box-container bht-layout-main">
						<view class="bht-echarts-box">
							<view class="header">
								<view class="title">商品交易额排名</view>
								<view class="opt">
									<view class="item" :class="{ 'active-item': dataFlag === 'importData' }" @click="changeFlag('importData')">进口</view>
									<view class="item" :class="{ 'active-item': dataFlag === 'exportData' }" @click="changeFlag('exportData')">出口</view>
								</view>
							</view>
							<view class="charts-title">进口商品交易额排名（TOP10）</view>
							<view class="bht-echarts-goods-sort-ten">
								<canvas canvas-id="goods_sort_ten_pie" id="goods_sort_ten_pie" class="bht-echarts-goods-sort-ten"></canvas>
							</view>
							<view class="bht-echarts-split-line"></view>
							<view class="charts-title">{{ trendStatsTitle }}</view>
							<view class="trend-statistics-line"><canvas canvas-id="trend_statistics_line" id="trend_statistics_line" class="trend-statistics-line"></canvas></view>
						</view>
					</view>
				</view>
				<stat-date-picker :type="1" :startDate="startDate" @changeDate="changePickerDate" v-model="showPicker"></stat-date-picker>
			</bht-layout-container>
		</view>
	</view>
</template>

<script>
/**
 *
 *进出口商品交易额统计
 *
 */
import uCharts from '@/components/u-charts/u-charts.js';
import { goodsTradeReq } from '@/api/stats.js';
import StatDatePicker from '@/components/staff/stat-date-picker.vue';
import BhtNumCount from '@/components/common/bht-num-count.vue';
var topTenGoodsPie = null;
var trendTtatisticsLine = null;
export default {
	components: {
		StatDatePicker,
		BhtNumCount
	},
	data() {
		return {
			dataFlag: 'importData',
			showPicker: false,
			totalAmount: 0,
			queryYear: new Date().getFullYear(),
			startDate: new Date('2014-01-01').toDateString(),
			chartData: {},
			trendStatsTitle: ''
		};
	},
	watch: {
		dataFlag(n, o) {
			//切换进出口的时候动态更新数据
			this.updateDataDynamically();
		}
	},
	async onLoad() {
		//调用请求数据 同步调用
		await this.reqChartData();
		//渲染饼图
		this.topTenGoodsChartPie('goods_sort_ten_pie', this.getPieCharData());
		//渲染折线趋势图
		this.trendStatisticsLine('trend_statistics_line', this.getLineChartData());
	},
	methods: {
		changeFlag(flag) {
			this.dataFlag = flag;
		},
		//显示日期选择
		showPickerEvent() {
			this.showPicker = true;
		},
		//日期选择回调函数
		changePickerDate({ year }) {
			this.queryYear = year;
			//调用请求数据
			this.reqChartData();
			//动态更新数据
			this.updateDataDynamically();
		},
		//发送请求数据
		async reqChartData() {
			let charData = await goodsTradeReq({ queryYear: this.queryYear });
			this.totalAmount = charData.totalAmount;
			this.chartData = charData;
		},
		//动态更新数据
		updateDataDynamically() {
			//动态更新数据
			topTenGoodsPie.updateData(this.getPieCharData());
			trendTtatisticsLine.updateData(this.getLineChartData());
		},
		// 生成饼图数据
		getPieCharData() {
			let { goodsRank } = this.chartData[this.dataFlag];
			let series = [];
			//组装数据
			goodsRank.axisValues.forEach((item, index) => {
				series.push({ data: item });
			});
			goodsRank.xAxis.forEach((item, index) => {
				series[index].name = item;
			});
			let chartData = {
				series: series
			};
			for (let i = 0; i < chartData.series.length; i++) {
				chartData.series[i].format = () => {
					return chartData.series[i].name + ':' + chartData.series[i].data + '万';
				};
			}
			return chartData;
		},
		// 生成折线图数据
		getLineChartData() {
			let { firstGoodsTrend } = this.chartData[this.dataFlag];
			this.trendStatsTitle = firstGoodsTrend.title;
			let lineChartData = {
				categories: firstGoodsTrend.xAxis,
				series: [{ name: '出口', data: firstGoodsTrend.axisValues, legendShape: 'circle' }]
			};
			return lineChartData;
		},
		//渲染饼图
		topTenGoodsChartPie(canvasId, chartData) {
			let _self = this;
			topTenGoodsPie = new uCharts({
				$this: _self,
				canvasId: canvasId,
				title: '进口商品交易额排名（TOP10）',
				colors: ['#FE7735', '#FFCE55', '#48CFAE', '#99B7FF', '#7B4FFC', '#99B7FF', '#38F672', '#D54F99', '#FFADB2', '#EC87BF'],
				type: 'pie',
				fontSize: uni.upx2px(20),
				legend: { show: false },
				background: '#FFFFFF',
				pixelRatio: 1,
				series: chartData.series,
				animation: true,
				width: uni.upx2px(700),
				height: uni.upx2px(533),
				dataLabel: true,
				extra: {
					pie: {
						lableWidth: 15
					}
				}
			});
		},
		//趋势折线图统计
		trendStatisticsLine(canvasId, chartData) {
			let _self = this;
			trendTtatisticsLine = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'line',
				padding: [0, 0, 0, 0],
				colors: ['#5AD4B6'],
				fontSize: 11,
				legend: {
					show: false
				},
				padding: [15, 0, 9, 25],
				dataLabel: true,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: 1,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					disableGrid: true,
					boundaryGap: 'justify'
				},
				yAxis: {
					disableGrid: true,
					format: val => {
						return '';
					}
				},
				width: uni.upx2px(650),
				height: uni.upx2px(395),
				extra: {
					line: {
						type: 'straight'
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.goods-statistics-header {
	@include chart-header-box;
	.header-opt {
		top: 30rpx;
		display: flex;
		justify-content: center;

		.date-box {
			padding: 0 25px;
			height: 42px;
			line-height: 42px;
			background-color: #ff3a48;
			border-radius: 42px;
			font-size: 18px;
			color: #fff;
			.iconfont {
				margin-left: 10px;
			}
		}
	}
}
.all-statistics-box-container {
	position: absolute;
	top: 140rpx;
	right: 0;
	left: 0;
	.all-statistics-box {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 164rpx;
		background-color: #fff;
		@include bht-box;
		.title {
			font-size: 24rpx;
			color: #868686;
		}
		.value {
			font-size: 56rpx;
			color: #ff3333;
		}
	}
}
.bht-layout-scroll {
	position: absolute;
	top: 324rpx;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
		width: 0;
	}
}

.bht-echarts-box-container {
	padding-bottom: $padding-content;
	.bht-echarts-box {
		@include bht-box;

		.header {
			@include statistics-header;
			height: 102rpx;
		}
		.bht-echarts-goods-sort-ten {
			width: 100%;
			height: 533rpx;
		}
		.trend-statistics-line {
			width: 100%;
			height: 395rpx;
		}
		.bht-echarts-split-line {
			position: relative;
			&:after {
				content: '';
				position: absolute;
				right: 22rpx;
				left: 22rpx;
				height: 1px;
				background-color: #e5e5e5;
			}
		}
	}
}
</style>
