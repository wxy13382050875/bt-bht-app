<template>
	<view class="content">
		<nav-bar-back title="我的订单" popType="0"></nav-bar-back>
		<bht-layout-container :bottom="0">
			<!-- <scroll-view class="nav-area" scroll-x :scroll-left="navScrollLeft"> -->
			<view class="nav-area">
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
			<!-- </scroll-view> -->
			<view class="swiper-area">
				<!-- <pulldown-refresher ref="pulldownRefresher" @pulldownRefresh="refresh"> -->
				<mescroll-uni class="mescroll" @init="initMescroll" :down="downOption" :up="upOption" @up="upCallback" @down="downCallback" :fixed="false">
					<!-- <swiper :current="switchIndex" style="height: 100%;" :duration="567" @transition="transition" @change="change" @animationfinish="animationfinish">
						<swiper-item v-for="(item, pIndex) in navList" :key="pIndex" style="height: 100%;">
							<view v-for="(item, eIndex) in dataSource" style="height: 100%;" :key="eIndex"><ordercell :dataSource="item"></ordercell></view>
						</swiper-item>
					</swiper> -->
					<view v-for="(item, eIndex) in dataSource" :key="eIndex"><ordercell :dataSource="item"></ordercell></view>
				</mescroll-uni>
				<!-- </pulldown-refresher> -->
			</view>
		</bht-layout-container>
	</view>
</template>

<script>
import pulldownRefresher from '@/third/pullsownrefresh/pulldown-refresher.vue';
import ordercell from '@/components/personal/xw-dth-order-cell.vue';
import { getOrderList } from '@/api/shop.js';
export default {
	components: {
		pulldownRefresher,
		ordercell
	},
	data() {
		return {
			lists: [],
			dataSource: [],
			switchIndex: 0, // 使 swiper 切换到的 index
			changeIndex: 0, // swiper change 时的 index
			finishedIndex: 0, // swiper 停止滑动后的 index
			screenWidth: uni.getSystemInfoSync().screenWidth, // 屏幕宽
			navScrollLeft: 0, // 导航滚动区的滚动距离
			activeBarLeft: 0, // 滑块距离左边距离swiper-area
			navItemWidth: uni.getSystemInfoSync().screenWidth / 5, // navitem 宽
			// pulldownRefresh: 0, // 下拉刷新容器距离顶部的距离
			// scrollViewHeight: 0, // scroll view 高
			// pulldownRefreshing: false, // 页面是否正处于下拉刷新状态
			// pullDownStopDistance: 0, //手指松开时下拉刷新容器距离顶部的距离
			// pulldownRefreshingTop: 0, //手指松开后下拉刷新容器距离顶部的距离
			// pullDownRefreshDistance: 80, // 下拉刷新距离

			downOption: {
				autoShowLoading: true,
				textInOffset: '下拉即可刷新...',
				textOutOffset: '松开即可刷新...',
				textLoading: '努力加载中...'
			},
			upOption: {
				auto: true,
				noMoreSize: 5,
				empty: {
					tip: '没有查询到数据',
					icon: ''
				},
				textNoMore: '没有更多数据了'
			},
			navList: [
				{ name: '全部', value: '0' },
				{ name: '待付款', value: '10008' },
				{ name: '待发货', value: '10016' },
				{ name: '待收货', value: '10020' },
				{ name: '已完成', value: '10024' }
			],
			params: {},
			statusCd: 0
		};
	},
	onLoad: function(option) {
		this.statusCd = this.navList[option.currentIndex].value;
		this.changeIndex = option.currentIndex;
	},
	created() {
		// 乱序
		// this.navList.forEach(() => this.datsSource.push(JSON.parse(JSON.stringify(this.datsSource.sort(() => Math.random() - 0.5)))))
	},
	mounted() {
		// 组件挂载后设置 scrollview 高
		// setTimeout(()=>{
		// 	this.$offset('.swiper-area').then(res => {
		// 		this.scrollViewHeight = res.height
		// 		console.log(res)
		// 	})
		// },100)
	},
	methods: {
		tapNav(index) {
			console.log('tapNav');
			// 点击 bavbar 切换
			this.switchIndex = index;
			this.changeIndex = index;
			this.statusCd = this.navList[index].value;
			this.dataSource = [];
			this.mescroll.triggerUpScroll();
		},
		$offset(selector) {
			// 获取组件内元素的 offset 信息
			return new Promise(resolve =>
				uni
					.createSelectorQuery()
					.in(this)
					.select(selector)
					.boundingClientRect(data => resolve(data))
					.exec()
			);
		},

		//获取mescroll对象
		initMescroll(mescroll) {
			this.mescroll = mescroll;
		},
		//下拉刷新
		downCallback(mescroll) {
			console.log('downCallback');
			mescroll.resetUpScroll();
		},
		//上拉刷新
		upCallback(mescroll) {
			console.log('upCallback');
			
			this.params.pageIndex = mescroll.num;
			this.params.pageSize = mescroll.size;
			this.params.statusCd = this.statusCd;
			let userInfo = uni.getStorageSync('userInfo');

			this.params.shopCarNbr = userInfo.shopCarNbr;

			console.log(this.params);
			getOrderList(this.params).then(res => {
				let { pageInfo, stores } = res.data;

				if (mescroll.num == 1) this.dataSource = [];
				this.dataSource = this.dataSource.concat(stores);
				mescroll.endBySize(stores.length, pageInfo.rowCount);
				this.$nextTick(() => {
					mescroll.endSuccess(stores.length);
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin flex {
	display: flex;
	align-items: center;
	justify-content: center;
}
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	.status_bar {
		width: 100%;
		background: #007aff;
		height: var(--status-bar-height);
	}
	.pulldownrefresh {
		left: 50%;
		bottom: 0;
		z-index: 1;
		position: fixed;
		transform: translateX(-50%);
	}
	.nav-area {
		width: 100%;
		height: 100rpx;
		.scroller {
			height: 100%;
			background: #ffffff;
			.scroller-wrapper {
				height: 100%;
				.scroller-item {
					@include flex();
					float: left;
					height: 100%;
					&.active {
						position: relative;
						color: #ff3333;
					}
					&.active::after {
						content: '';
						position: absolute;
						right: 0;
						bottom: 0;
						left: 0;
						height: 2px;
						background: #ff3333;
					}
				}
			}
		}
	}
	.swiper-area {
		flex: 1;
		width: 100%;
		height: 100%;

		swiper {
			height: 100%;
			background: #f8f8f8;
			swiper-item {
				image {
					float: left;
					width: 47vw;
					height: 47vw;
					border-radius: 1vw;
					margin: 2vw 0 0 2vw;
				}
			}
		}
	}
}
</style>
