<template>
	<view class="app-content">
		<aca-nav-bar :level="2" title="商品申报查询"></aca-nav-bar>
		<bht-layout-container>
			<view class="app-query-tabs-warp" :style="{top: navHeight+'px'}">
				<view class="nav">
					<view class="nav-items" v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
				</view>
			</view>
			<view class="app-tabs-query-content">
				<bht-goods-borderer-tabs-cur :i="0" :index="curIndex"></bht-goods-borderer-tabs-cur>
				<bht-goods-borderer-tabs-his :i="1" :index="curIndex"></bht-goods-borderer-tabs-his>
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import BhtGoodsBordererTabsCur from '@/components/goods/bht-goods-borderer-tabs-cur.vue'
	import BhtGoodsBordererTabsHis from '@/components/goods/bht-goods-borderer-tabs-his.vue'
	export default {
		components: {
			BhtGoodsBordererTabsCur,
			BhtGoodsBordererTabsHis
		},
		data() {
			return {
				tabs: ['申报查询', '历史申报'],
				curIndex: 0, // 当前tab的下标
			}
		},
		computed: {
			...mapGetters('utp', ['navHeight'])
		},
		methods: {
			changeTab(i) {
				this.curIndex = i
			}
		}
	}
</script>

<style lang="scss">
	.app-query-tabs-warp {
		position: fixed;
		left: 0;
		width: 100%;
		height: 70rpx;
		background-color: #fff;

		.nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 70rpx;
			text-align: center;
			font-size: 30rpx;

			.nav-items {
				position: relative;
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.active {
				position: relative;
				color: rgb(254, 91, 6);

				&::before {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					border-bottom: 1px solid #fe5a07;

				}
			}
		}
	}

	.app-tabs-query-content {
		position: absolute;
		top: 70rpx;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
