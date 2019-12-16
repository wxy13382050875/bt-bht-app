<template>
	<view class="bht-layout-container">
		<view class="bht-layout-container statement-statistics-container">
			<nav-bar-back title="交易结算单统计"></nav-bar-back>
			<bht-layout-container bgColor="#F2F2F2" :bottom="0">
				<view class="statement-statistics-header">
					<view class="header-opt">
						<view class="date-box" @click="showPickerEvent">
							<label class="title">2019年</label>
							<label class="iconfont aca-xiala"></label>
						</view>
					</view>
				</view>
				<view class="bht-layout-main statement-statistics-box-container">
					<view class="all-statistics-box">
						<label class="title">结算单总数(单)</label>
						<label class="value">
							<bht-num-count :num="totalAmount"></bht-num-count>
						</label>
					</view>
				</view>
				<view class="bht-layout-scroll">
					<view class="bht-echarts-box-container bht-layout-main">
						<view class="bht-echarts-box">
							<view class="header"><view class="title">交易结算录单排名(TOP10)</view></view>
							<view class="">
								<view class="charts-title">交易结算录单数（单位：单）</view>
								<view class="bill-chart-wrapper"><uni-echarts canvasId="bill_chart" ref="billChartRef" @onInit="onInitBillChart"></uni-echarts></view>
							</view>
						</view>
					</view>
				</view>
				<stat-date-picker :type="2" :startDate="startDate" @changeDate="changePickerDate" v-model="showPicker"></stat-date-picker>
			</bht-layout-container>
		</view>
	</view>
</template>

<script>
/**
 *
 * 交易结算单统计
 *
 */
import * as echarts from '@/components/mpvue-echarts/echarts.min.js';
import StatDatePicker from '@/components/staff/stat-date-picker.vue';
import BhtNumCount from '@/components/common/bht-num-count.vue';
import { tradeBillReq } from '@/api/stats.js';
var echartsInstans = null;
export default {
	components: {
		StatDatePicker,
		BhtNumCount
	},
	data() {
		return {
			showPicker: false,
			queryYear: new Date().getFullYear(),
			startDate: new Date('2014-01-01').toDateString(),
			queryDateValue: new Date().getFullYear(),
			queryDateType: 'year',
			tradeChartData: {},
			totalAmount: 0
		};
	},
	methods: {
		//显示日期选择
		showPickerEvent() {
			this.showPicker = true;
		},
		//日期选择回调函数
		changePickerDate({ year, type, month }) {
			this.queryDateValue = type === 'M' ? year + '-' + month : year;
			this.queryDateType = type === 'M' ? 'month' : 'year';
			//调用请求数据
			this.reqChartData();
			console.log("请求数据")
			//动态更新数据
			let option = this.optionsConfig();
			echartsInstans.setOption(option);
		},
		//请求数据
		async reqChartData() {
			let tradeData = await tradeBillReq({ queryDateType: this.queryDateType, queryDateValue: this.queryDateValue });
			this.tradeChartData = tradeData.billRank;
			this.totalAmount = tradeData.totalAmount;
		},
		// 图表渲染
		async onInitBillChart(e) {
			//#ifdef H5
			// H5不渲染图表
			return;
			//#endif
			await this.reqChartData();
			let { width, height } = e;
			let canvas = this.$refs.billChartRef.canvas;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			let option = this.optionsConfig();
			chart.setOption(option);
			this.$refs.billChartRef.setChart(chart);
			echartsInstans = chart;
		},
		//生成 返回option
		optionsConfig() {
			let { xAxis, axisValues } = this.tradeChartData;
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
		}
	}
};
</script>

<style lang="scss">
.statement-statistics-container {
	.statement-statistics-header {
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
				.iconfont {
					margin-left: 10px;
				}
				.title,
				.iconfont {
					color: #fff;
				}
			}
		}
	}
	.statement-statistics-box-container {
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
			.bill-chart-wrapper {
				height: 520rpx;
			}
		}
	}
}
</style>
