<template>
	<view class="content">
		<nav-bar-back title="我的订单" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<!-- <scroll-view class="nav-area" scroll-x :scroll-left="navScrollLeft"> -->
			<!-- 菜单 -->
			<view class="top-warp">
				<!-- <view class="tip">每个菜单列表仅初始化一次,切换菜单缓存数据</view> -->
				<view class="nav">
					<view v-for="(tab, i) in tabs" :key="i" :class="{ active: curIndex === i }" @click="changeTab(i)">{{ tab }}</view>
				</view>
			</view>

			<!--全部 -->
			<orderlist :i="0" :index="curIndex"></orderlist>

			<!-- 奶粉 -->
			<orderlist :i="1" :index="curIndex"></orderlist>

			<!-- 面膜 -->
			<orderlist :i="2" :index="curIndex"></orderlist>

			<!-- 图书 -->
			<orderlist :i="3" :index="curIndex"></orderlist>

			<!-- 图书 -->
			<orderlist :i="4" :index="curIndex"></orderlist>
			<!-- <view class="nav-area">
				<view class="scroller" :style="{ width: navItemWidth * navList.length + 'px' }">
					<view class="scroller-wrapper">
						<view
							class="scroller-item"
							v-for="(item, index) in navList"
							:key="index"
							:style="{ width: navItemWidth + 'px' }"
							:class="{ active: index == changeIndex }"
							@tap="tapNav(index)"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
			<view class="swiper-area">
				<mescroll-uni class="mescroll" @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">

					<view v-for="(item, eIndex) in dataSource" :key="eIndex"><ordercell :dataSource="item"></ordercell></view>
				</mescroll-uni>
			</view> -->
		</bht-layout-container>
	</view>
</template>

<script>
import orderlist from '@/components/personal/xw-dth-order-list.vue';

export default {
	components: {
		orderlist
	},
	data() {
		return {
			tabs: ['全部', '待付款', '待发货', '已收货', '已完成'],
			curIndex: 0 // 当前tab的下标
		};
	},
	methods: {
		// 切换菜单
		changeTab(i) {
			this.curIndex = i;
		}
	},
	onLoad: function(option) {
		setTimeout(() => {
			this.curIndex = Number(option.currentIndex);
		}, 10);
	}
};
</script>

<style lang="scss" scoped>
.top-warp {
	z-index: 9990;
	position: fixed;
	top: --window-top; /* css变量 */
	left: 0;
	width: 100%;
	height: 80rpx;
	background-color: white;
}
.top-warp .tip {
	font-size: 28upx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
}
.top-warp .nav {
	text-align: center;
	height: 80rpx;
	border-bottom: 1upx solid #ddd;
}
.top-warp .nav view {
	display: inline-block;
	width: 20%;
	line-height: 80rpx;
	font-size: 28upx;
}
.top-warp .nav .active {
	border-bottom: 2upx solid #ff6990;
	color: #ff6990;
}
</style>
