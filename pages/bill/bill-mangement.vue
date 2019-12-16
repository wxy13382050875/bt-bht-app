<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="开票管理"></aca-nav-bar>
		<bht-layout-container bgColor="#fff">
			<view class="bill-tabs-w">
				<view class="tabs-w">
					<view class="tab" :class="{'active':curIndex===index}" @click="changeTab(index)" v-for="(item,index) in tabs" :key="index">{{item}}</view>
				</view>
			</view>
			<view class="app-tabs-content">
				<!--待申请开票-->
				<bill-items-none :i="0" :index="curIndex"></bill-items-none>

				<!--待开票-->
				<bill-items-com :i="1" :index="curIndex"></bill-items-com>

				<!--已开票-->
				<bill-items-com :i="2" :index="curIndex"></bill-items-com>
			</view>

		</bht-layout-container>
	</view>
</template>

<script>
	/**
	 * 开票管理
	 */
	import BillItemsNone from '@/components/bill/bill-items-none.vue'
	import BillItemsCom from '@/components/bill/bill-items-com.vue'
	export default {
		components: {
			BillItemsNone,
			BillItemsCom
		},
		data() {
			return {
				tabs: ['待申请开票', '待开票', '已完成'],
				curIndex: 0, // 当前tab的下标
			}
		},
		methods: {
			changeTab(i) {
				this.curIndex = i
			}
		}
	}
</script>

<style lang="scss">
	.bill-tabs-w {
		display: flex;
		align-items: flex-end;
		padding: 0 $padding-content;
		height: 120rpx;
		background: rgba(239, 68, 85, 1);

		.tabs-w {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;
			height: 106rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 16px 0px rgba(134, 134, 134, 0.4);
			border-radius: 10px 10px 0px 0px;

			.tab {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				font-size: 30rpx;
				color: rgba(56, 56, 56, 1);
				height: 100%;

			}

			.active {
				position: relative;
				color: #FF0000;

				&::before {
					content: '';
					position: absolute;
					right: 0;
					bottom: 0;
					left: 0;
					height: 6rpx;
					background-color: rgba(255, 0, 0, 1);
				}
			}
		}
	}
</style>
