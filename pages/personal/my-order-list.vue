<template>
	<view class="content">
		<nav-bar-back title="我的订单"></nav-bar-back>
		<scroll-view class="nav-area" scroll-x :scroll-left="navScrollLeft">
			<view class="scroller" :style="{ width: navItemWidth * navList.length + 'px' }">
				<view class="scroller-wrapper">
					<view class="scroller-item" 
						v-for="(item, index) in navList" :key="index" 
						:style="{ width: navItemWidth + 'px' }" 
						:class="{ active: index === changeIndex }"
						@tap="tapNav(index)"
					>{{ item }}</view>
				</view>
				<view class="scroller-bar">
					<view class="active-bar" :style="{ width: navItemWidth + 'px', left: activeBarLeft + 'px' }">
						<view></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="swiper-area">
			<pulldown-refresher ref="pulldownRefresher" @pulldownRefresh="refresh">
				<swiper :current="switchIndex" :duration="567" @transition="transition" @change="change" @animationfinish="animationfinish">
					<swiper-item v-for="(item, index) in navList" :key="index">
						<scroll-view scroll-y :style="{ height: scrollViewHeight + 'px' }">
							<!-- <image v-for="src in lists[index]" :src="src" :key="src"></image> -->
							<view v-for="(item,index) in datsSource" :key="index">
								<ordercell :dataSource="item"></ordercell>
							</view>
							
						</scroll-view>
					</swiper-item>
				</swiper>
			</pulldown-refresher>
		</view>
		
	</view>
</template>

<script>
	import pulldownRefresher from '@/third/pullsownrefresh/pulldown-refresher.vue'
	import ordercell from '@/components/personal/xw-dth-order-cell.vue'
	export default {
		components: { 
			pulldownRefresher ,
			ordercell
		},
		data() {
			return {
				lists: [],
				datsSource: [{
					storelogo:"/static/icon/icon-order-store-logo.png",
					storeName:"高原农特产品",
					state:"等待买家付款",
					list:[
						{
							url:"/static/banner/1.png",
							title:"泰国正品白兰氏即食燕窝美容养颜滋补42ml*6瓶...",
							specifi:"规格：熟茶盒装",
							delivery:"发货地：云南河口县",
							price:223.9,
							number:2
                            
						},
						{
							url:"/static/banner/1.png",
							title:"泰国正品白兰氏即食燕窝美容养颜滋补42ml*6瓶...",
							specifi:"规格：熟茶盒装",
							delivery:"发货地：云南河口县",
							price:223.9,
							number:2
						    
						}
					],
					distribution:"普通快递",
					remark:"选填，请先和商家协商一致再备注！",
					total:"447.8"
					
				},{
					storelogo:"/static/icon/icon-order-store-logo.png",
					storeName:"高原农特产品",
					state:"等待买家付款",
					list:[
						{
							url:"/static/banner/1.png",
							title:"泰国正品白兰氏即食燕窝美容养颜滋补42ml*6瓶...",
							specifi:"规格：熟茶盒装",
							delivery:"发货地：云南河口县",
							price:223.9,
							number:2
                            
						},
						{
							url:"/static/banner/1.png",
							title:"泰国正品白兰氏即食燕窝美容养颜滋补42ml*6瓶...",
							specifi:"规格：熟茶盒装",
							delivery:"发货地：云南河口县",
							price:223.9,
							number:2
						    
						}
					],
					distribution:"普通快递",
					remark:"选填，请先和商家协商一致再备注！",
					total:"447.8"
					
				}],
				switchIndex: 0, // 使 swiper 切换到的 index
				changeIndex: 0, // swiper change 时的 index
				finishedIndex: 0, // swiper 停止滑动后的 index
				screenWidth: uni.getSystemInfoSync().screenWidth, // 屏幕宽
				navScrollLeft: 0, // 导航滚动区的滚动距离
				activeBarLeft: 0, // 滑块距离左边距离
				navItemWidth: uni.getSystemInfoSync().screenWidth/5,// navitem 宽
				pulldownRefresh: 0, // 下拉刷新容器距离顶部的距离
				scrollViewHeight: 0, // scroll view 高
				pulldownRefreshing: false, // 页面是否正处于下拉刷新状态
				pullDownStopDistance: 0, //手指松开时下拉刷新容器距离顶部的距离
				pulldownRefreshingTop: 0, //手指松开后下拉刷新容器距离顶部的距离 
				pullDownRefreshDistance: 80, // 下拉刷新距离
				navList: ['全部', '待付款', '待发货', '待收货', '已完成'],
				
			}
		},
		created() { // 乱序
			this.navList.forEach(() => this.lists.push(JSON.parse(JSON.stringify(this.datsSource.sort(() => Math.random() - 0.5)))))
		},
		mounted() { // 组件挂载后设置 scrollview 高
			setTimeout(()=>{
				this.$offset('.swiper-area').then(res => {
					this.scrollViewHeight = res.height
				})
			},100)
		},
		methods: {
			transition({ detail: { dx } }) { // swiper 运动时触发
				this.activeBarLeft = this.navItemWidth * this.finishedIndex + this.navItemWidth * (dx / this.screenWidth)
				if (this.activeBarLeft > (this.screenWidth - this.navItemWidth) / 2) {
					this.navScrollLeft = this.activeBarLeft - (this.screenWidth - this.navItemWidth) / 2
				}
			},
			change({ detail: { current } }) { // swiper index 变化时触发
				this.changeIndex = current
			},
			animationfinish({ detail: { current } }) { // swiper 运动结束时触发
				this.switchIndex = this.finishedIndex = current
			},
			tapNav(index) { // 点击 bavbar 切换
				this.switchIndex = index
			},
			$offset(selector) { // 获取组件内元素的 offset 信息
				return new Promise(resolve => uni.createSelectorQuery().in(this).select(selector).boundingClientRect(data => resolve(data)).exec())
			},
			refresh() { // 下拉刷新
				setTimeout(() => {
					this.$refs.pulldownRefresher.pullup()
				}, 1234)
			},
			pulldownrefresh() {
				this.$refs.pulldownRefresher.pulldown()
				setTimeout(() => {
					this.$refs.pulldownRefresher.pullup()
				}, 1234)
			}
		},
		onLoad:function (option) { //option为object类型，会序列化上个页面传递的参数
				console.log(option.currentIndex); //打印出上个页面传递的参数
				setTimeout(() => {
					this.switchIndex = option.currentIndex;
				}, 100)
				
				// console.log(option.name); //打印出上个页面传递的参数。
			}
	}
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
			background: #007AFF;
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
				background: #FFFFFF;
				.scroller-wrapper {
					height: 90rpx;
					
					.scroller-item {
						@include flex();
						float: left;
						height: 100%;
						&.active {
							color: #FF3333;
						}
					}
				}
				.scroller-bar {
					height: 10rpx;
					position: relative;
					.active-bar {
						@include flex();
						top: 0;
						left: 0;
						height: 100%;
						position: absolute;
						view {
							width: 30%;
							height: 100%;
							background: #FF3333;
						}
					}
				}
			}
		}
		.swiper-area {
			flex: 1;
			width: 100%;
			swiper {
				height: 100%;
				background: #F8F8F8;
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