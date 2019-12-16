<template>
	<view class="">
		<nav-bar-back title="边民互市进出口统计"></nav-bar-back>
		<bht-layout-container bgColor="#fff">
			<view class="bht-layout-content">
				<view class="borderer-statistics-header">
					<view class="header-opt">
						<view class="date-box" @click="showPickerEvent">
							<label>{{ curYear }}年</label>
							<label class="iconfont aca-xiala"></label>
						</view>
					</view>
				</view>
				<view class="borderer-statistics-data">
					<view class="data-box">
						<view class="data-tab">
							<view
								v-for="(item, index) in tabsData"
								:key="index"
								class="tab-item"
								:class="{ 'tab-active': item.flag === activeTab }"
								@click="changeTabItem(item.flag)"
							>
								{{ item.title }}
							</view>
						</view>
						<view class="statistics-title">总量统计</view>
						<view class="data-line"></view>
						<view class="all-statistics-pie"><canvas canvas-id="all_statistics_pie" id="all_statistics_pie" class="all-statistics-pie-canvas"></canvas></view>
						<view class="statistics-title">趋势分析</view>
						<view class="data-line"></view>
						<view class="trend-statistics-line"><canvas canvas-id="trend_statistics_line" id="trend_statistics_line" class="trend-statistics-line"></canvas></view>
					</view>
				</view>
			</view>
			<stat-date-picker :type="1" :startDate="startDate" @changeDate="changePickerDate" v-model="showPicker"></stat-date-picker>
		</bht-layout-container>
	</view>
</template>

<script>
/**
 *
 *边民互市进出口统计
 *
 */
import uCharts from '@/components/u-charts/u-charts.js';
import StatDatePicker from '@/components/staff/stat-date-picker.vue';
import { inAndOutReq } from '@/api/stats.js';
//圆形饼图实例
var all_statistics_pie = null;
//折线图实例
var trend_statistics_line = null;
export default {
	components: {
		StatDatePicker
	},
	data() {
		return {
			tabsData: [
				{
					title: '票次',
					flag: 'quantityData'
				},
				{
					title: '货运量',
					flag: 'weightData'
				},
				{
					title: '货运值',
					flag: 'amountData'
				},
				{
					title: '车辆',
					flag: 'vehicleData'
				}
			],
			activeTab: 'quantityData',
			inAndOutData: {},
			chartData: {},
			totalCount: 0,
			showPicker: false,
			curYear: new Date().getFullYear(),
			startDate: new Date('2014-01-01').toDateString()
		};
	},
	async onLoad() {
		//调用请求数据 同步调用
		await this.reqChartData();
		//渲染饼图
		let pieChartData = this.getPieChartData();
		this.totalStatisticsRing('all_statistics_pie', pieChartData);
		//渲染折线图
		let lineChartData = this.getLineChartData();
		this.trendStatisticsLine('trend_statistics_line', lineChartData);
	},
	watch: {
		activeTab(n, o) {
			this.updateDataDynamically();
		}
	},
	methods: {
		changeTabItem(flag) {
			this.activeTab = flag;
		},
		//显示选择时间控件
		showPickerEvent() {
			this.showPicker = true;
		},
		//切换年
		changePickerDate({ year }) {
			this.queryYear = year;
			//调用请求数据
			this.reqChartData();
			//动态更新数据
			this.updateDataDynamically();
		},
		//发送请求数据
		async reqChartData() {
			let charData = await inAndOutReq({ queryYear: this.queryYear });
			this.totalCount = 0;
			this.chartData = charData;
		},
		// 获取饼图数据
		getPieChartData() {
			let { totalData } = this.chartData[this.activeTab];
			let series = [];
			//组装数据
			totalData.axisValues.forEach((item, index) => {
				series.push({ data: item });
				this.totalCount += item;
			});
			totalData.xAxis.forEach((item, index) => {
				series[index].name = item;
			});
			let chartData = {
				series: series
			};
			for (let i = 0; i < chartData.series.length; i++) {
				chartData.series[i].format = () => {
					switch (this.activeTab) {
						case 'quantityData':
							return chartData.series[i].name + ':' + chartData.series[i].data + '票';
							break;
						case 'weightData':
							return chartData.series[i].name + ':' + chartData.series[i].data + 'KG';
							break;
						case 'amountData':
							return chartData.series[i].name + ':' + chartData.series[i].data + '万元';
							break;
						case 'vehicleData':
							return chartData.series[i].name + ':' + chartData.series[i].data + '车次';
							break;
						default:
							break;
					}
				};
			}
			return chartData;
		},
		//折线图数据
		getLineChartData() {
			let { trendData } = this.chartData[this.activeTab];
			let lineChartData = {
				categories: trendData.xAxis,
				series: [{ name: '进口', data: trendData.axisValues[0], legendShape: 'circle' }, { name: '出口', data: trendData.axisValues[1], legendShape: 'circle' }]
			};
			return lineChartData;
		},
		//动态更新数据
		updateDataDynamically() {
			//动态更新数据
			let allPieData = this.getPieChartData();

			//替换标题
			switch (this.activeTab) {
				case 'quantityData':
					allPieData.title = {
						name: '总票数'
					};
					allPieData.subtitle = {
						name: this.totalCount + '票'
					};
					break;
				case 'weightData':
					allPieData.title = {
						name: '总货运量'
					};
					allPieData.subtitle = {
						name: this.totalCount + 'KG'
					};
					break;
				case 'amountData':
					allPieData.title = {
						name: '总货运值'
					};
					allPieData.subtitle = {
						name: this.totalCount + '万元'
					};
					break;
				case 'vehicleData':
					allPieData.title = {
						name: '总车次'
					};
					allPieData.subtitle = {
						name: this.totalCount + '车次'
					};
					break;
				default:
					break;
			}
			all_statistics_pie.updateData(allPieData);

			let lineChartData = this.getLineChartData();
			trend_statistics_line.updateData(lineChartData);
		},
		//总量统计圆形饼图
		totalStatisticsRing(canvasId, chartData) {
			let _self = this;
			all_statistics_pie = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 11,
				padding: [0, 0, 0, 0],
				colors: ['#FE7735', '#7B4FFC'],
				title: {
					name: '总票数',
					color: '#868686',
					fontSize: uni.upx2px(25)
				},
				subtitle: {
					name: _self.totalCount + '票',
					color: '#3399CC',
					fontSize: uni.upx2px(30)
				},
				legend: {
					show: true,
					position: 'top',
					float: 'left',
					padding: 5,
					lineHeight: 11,
					margin: 0,
					fontColor: '#6B6B6B'
				},
				extra: {
					pie: {
						offsetAngle: -95,
						ringWidth: 20
					}
				},
				background: '#FFFFFF',
				pixelRatio: 1,
				series: chartData.series,
				animation: true,
				width: uni.upx2px(750),
				height: uni.upx2px(338),
				disablePieStroke: true,
				dataLabel: true
			});
		},
		//趋势折线图统计
		trendStatisticsLine(canvasId, chartData) {
			let _self = this;
			trend_statistics_line = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'line',
				padding: [0, 0, 0, 0],
				colors: ['#FE7735', '#7B4FFC'],
				fontSize: 11,
				legend: {
					show: true,
					position: 'top',
					float: 'left',
					padding: 5,
					lineHeight: 11,
					margin: 0,
					fontColor: '#6B6B6B'
				},
				//dataLabel: false,
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
				height: uni.upx2px(402),
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
.borderer-statistics-header {
	@include chart-header-box;
	.header-opt {
		bottom: 46rpx;
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
.borderer-statistics-data {
	padding: $padding-content;
	.data-box {
		padding: $padding-content;
		@include bht-box;

		.data-tab {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 62rpx;

			&::after {
				content: '';
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 1px;
				background-color: #bfbfbf;
			}
			.tab-item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				text-align: center;
				font-size: 34rpx;
				color: #868686;
			}
			.tab-active {
				position: relative;
				color: #f7524b;
				font-weight: bold;
				&::after {
					content: '';
					position: absolute;
					right: 0;
					bottom: 0;
					left: 0;
					z-index: 2;
					height: 1px;
					background-color: #f7524b;
				}
			}
		}
		.data-line {
			height: 2px;
			background-color: #e5e5e5;
		}
		.statistics-title {
			position: relative;
			margin-top: 20rpx;
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
		.all-statistics-pie,
		.all-statistics-pie-canvas {
			width: 100%;
			height: 338rpx;
		}
		.trend-statistics-line,
		.trend-statistics-line-canvas {
			width: 100%;
			height: 402rpx;
		}
	}
}
</style>
