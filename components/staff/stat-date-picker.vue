<template>
	<uni-popup :show="showPopup" type="bottom" @change="closeChange">
		<view class="stat-date-picker-wrapper">
			<view class="header">
				<view class="btn cancel" @click="cancel">取消</view>
				<view class="title">{{ title }}</view>
				<view class="btn confirm" @click="confirm">确定</view>
			</view>
			<view class="header-opt" v-if="type == 2">
				<view class="item item-year" :class="{ active: tabFlag === 'Y' }" @click="changeTab('Y')">按年</view>
				<view class="item item-month" :class="{ active: tabFlag === 'M' }" @click="changeTab('M')">按月</view>
			</view>
			<view class="picker-view-wrapper" v-if="showPopup">
				<picker-view class="uni-picker-view" indicator-style="height:55px" :value="defaultValue" @change="pickerChange">
					<picker-view-column>
						<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
					</picker-view-column>
					<picker-view-column v-show="tabFlag === 'M'">
						<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import UniPopup from '@/third/uni-popup/uni-popup.vue';
export default {
	name: 'stat-date-picker',
	components: {
		UniPopup
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '选择时间'
		},
		startDate: {
			type: String,
			default: () => {
				return new Date().toDateString();
			}
		},
		endDate: {
			type: String,
			default: () => {
				return new Date().toDateString();
			}
		},
		//显示模式
		type: {
			type: Number,
			default: 2
		}
	},
	data() {
		return {
			showPopup: false,
			years: [], //保存年份
			months: [], //保存月份
			defaultValue: [0, 0, 0], //默认选中项
			tabFlag: 'Y'
		};
	},
	created() {
		let startDateYear = new Date(this.startDate).getFullYear();
		let endDateYear = new Date(this.endDate).getFullYear();
		let curMonth = new Date(this.endDate).getMonth() + 1;
		for (let i = startDateYear; i <= endDateYear; i++) {
			this.years.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			this.months.push(i);
		}
		this.years.forEach((item, index) => {
			if (endDateYear === item) {
				this.defaultValue[0] = index;
			}
		});
		this.months.forEach((item, index) => {
			if (curMonth === item) {
				this.defaultValue[1] = index;
			}
		});
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(n) {
				this.$emit('input', n);
			}
		}
	},
	watch: {
		value(n) {
			this.showPopup = n;
			this.defaultValue = this.defaultValue;
		}
	},

	methods: {
		//确认事件
		confirm() {
			//获取索引位置
			let yearsIndex = this.defaultValue[0];
			let monthsIndex = this.defaultValue[1];
			//从数组中取值
			let selectedDate = {
				year: this.years[yearsIndex],
				month: this.months[monthsIndex],
				type: this.tabFlag
			};
			this.showPopup = false;
			this.$emit('input', false);
			//发射数据
			this.$emit('changeDate', selectedDate);
		},
		//选项卡 切换事件
		changeTab(e) {
			this.tabFlag = e;
		},
		//pikcer change事件
		pickerChange({ detail }) {
			if (detail.value[0] === 0) {
				return;
			}
			this.defaultValue = detail.value;
		},
		//取消事件
		cancel() {
			this.showPopup = false;
			this.$emit('input', false);
		},
		//popup关闭事件
		closeChange(e) {
			this.$emit('input', e);
		}
	}
};
</script>

<style lang="scss">
.stat-date-picker-wrapper {
	display: flex;
	flex-direction: column;
	background: #fff;
	height: 850rpx;
	.header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 52px;

		&::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1px;
			background-color: #e5e5e5;
		}
		.title {
			flex: 1;
			text-align: center;
			font-size: 18px;
		}
		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 14px;
			height: 100%;
			font-size: 14px;
		}
	}
	.picker-view-wrapper {
		flex: 1;
		.uni-picker-view {
			height: 100%;
			background: #ddd;
			.item {
				line-height: 55px;
				text-align: center;
				font-size: 14px;
			}
		}
	}
	.header-opt {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 125px;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 200rpx;
			height: 60rpx;
			font-size: 14px;
			color: rgba(255, 51, 51, 1);
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(255, 51, 51, 1);
			box-shadow: 0 0 10rpx 0 rgba(247, 82, 75, 0.6);
		}
		.item-year {
			border-radius: 6rpx 0 0 6rpx;
		}
		.item-month {
			border-radius: 0 6rpx 6rpx 0;
		}
		.active {
			color: #fff;
			background: rgba(255, 51, 51, 1);
		}
	}
}
</style>
