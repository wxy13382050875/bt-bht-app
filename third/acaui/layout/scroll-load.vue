<template>
	<view class="scroll-load" :style="{top: navHeight+'px', height: windowHeight+'px'}"
	 @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" @scroll="onScroll($event)">
		<view class="scroll-content" :style="{transform: 'translate3d(0,'+top+'px,0)'}">
			<view class="pull-refresh">
				<label class="">↓</label>
				<view>{{pullRefresh.text}}</view>
			</view>
			<slot name="content"></slot>
			<view>{{this.top}}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		props: {
			offset: {
				type: Number,
				default: 0 // 默认高度
			},
			enableInfinite: {
				type: Boolean,
				default: true
			},
			enableRefresh: {
				type: Boolean,
				default: true
			},
			dataList: {
				default: false,
				required: false
			},
			onRefresh: {
				type: Function,
				default: undefined,
				required: false
			},
			onInfinite: {
				type: Function,
				default: undefined,
				require: false
			}
		},
		data() {
			return {
				top: 0,
				state: 0,
				startX: 0,
				startY: 0,
				touching: false,
				infiniteLoading: false,
				downFlag: true, // 用来显示是否加载中
				pullLoading: false,
				windowHeight: 0,
				moveState: 0,
				pullRefresh: {
					text: '下拉刷新'
				}
			}
		},
		created() {
			var sysinfo = uni.getSystemInfoSync(),
				windowHeight = sysinfo.windowHeight;
			//减去底部导航高度
			this.windowHeight = windowHeight - 50;
			// // #ifdef H5
			// this.windowHeight = windowHeight - 50;
			// // #endif
			// // #ifdef APP-PLUS || MP-WEIXIN
			// this.windowHeight = windowHeight;
			// // #endif

		},
		computed: {
			...mapGetters('utp', ['navHeight'])
		},
		methods: {
			touchStart(e) {
				this.startY = e.changedTouches[0].pageY
				this.startX = e.changedTouches[0].pageX
				this.startScroll = 0
				this.touching = true // 留着有用，不能删除
				this.pullLoading = true;
			},
			touchMove(e) {
				//关闭下拉加载
				if (!this.enableRefresh) {
					return
				}
				// 计算滑动距离
				let diff = e.changedTouches[0].pageY - this.startY
				if (diff > 0) e.preventDefault()
				//计算x的y次幂
				this.top = Math.pow(diff, 0.8)
				if (this.top >= 100) {
					this.pullRefresh.text = '松开刷新'
				}
				// this.moveState = 1
				// if (this.state === 2) { // in refreshing
				// 	return
				// }
				// if (this.top >= this.offset) {
				// 	this.state = 1
				// } else {
				// 	this.state = 0
				// }

			},
			touchEnd(e) {
				// 关闭下拉加载不做任何事情
				if (!this.enableRefresh) {
					return
				}
				this.pullRefresh.text = '下拉刷新'
				this.touching = false
				if (this.state === 2) { // in refreshing
					this.state = 2
					this.top = this.offset
					return
				}
				if (this.top >= this.offset) { // do refresh
					this.refresh()

				} else { // cancel refresh
					this.state = 0
					this.top = 0

				}
				// 用于判断滑动是否在原地 ----begin
				let endX = e.changedTouches[0].pageX
				let endY = e.changedTouches[0].pageY
				let dy = this.startY - endY
				let dx = endX - this.startX
				// 如果滑动距离太短
				if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					console.log('滑动距离太短')
					return
				}
				// --------end--------
				if (!this.enableInfinite || this.infiniteLoading) {
					return
				}

			},
			onScroll(e) {
				console.log("ooo")
				// if (!this.enableInfinite) {
				// 	return
				// }
				// let outerHeight = this.$el.clientHeight // 屏幕内容区域 316
				// let innerHeight = this.$el.querySelector('.inner').clientHeight // inner height 923
				// let scrollTop = this.$el.scrollTop // 滚动条距顶部高度
				// let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0 // 下拉刷新div高度
				// let infiniteHeight = this.$el.querySelector('.load-more').clientHeight // 上拉加载更多div高度
				// let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
				// if (bottom + infiniteHeight - 1 <= infiniteHeight) {
				// 	this.infinite()
				// }
			},
			refresh() {
				this.state = 2
				this.top = this.offset
				setTimeout(() => {
					this.onRefresh(this.refreshDone)
				}, 300)
			},
			refreshDone() {
				this.state = 0
				this.top = 0
			},
			infinite() {
				this.infiniteLoading = true
				setTimeout(() => {
					this.onInfinite(this.infiniteDone)
				}, 2000)
			},
			infiniteDone() {
				this.infiniteLoading = false
			}
		}
	}
</script>

<style lang="scss">
	.scroll-load {
		position: relative;
		-webkit-overflow-scrolling: touch;
		overflow: scroll;

		&::-webkit-scrollbar {
			display: none;
			width: 0;
			height: 0;
			color: transparent;
		}

		.scroll-content {
			position: relative;
			background-color: #C8C7CC;
			transition-duration: 150ms;

			&::-webkit-scrollbar {
				display: none;
				width: 0;
				height: 0;
				color: transparent;
			}
		}

		.pull-refresh {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: -100px;
			text-align: center;
			height: 100px;
			background: blue;

			.is-rotate {
				transform: rotate(180deg);
			}
		}

	}

	.touch .scroll-content {
		transition-duration: 0ms;
	}

	.scroll-load.touch .inner {
		transition-duration: 0ms;
	}

	.scroll-load.down .down-tip {
		display: block;

	}

	.scroll-load.up .up-tip {
		display: block;

	}

	.scroll-load.refresh .refresh-tip {
		display: block;
	}

	.scroll-load .down-tip,
	.scroll-load .refresh-tip,
	.scroll-load .up-tip {
		display: none;
	}

	.scroll-load .load-more {
		height: 1.5rem;
		text-align: center;
		line-height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .3rem;
	}

	.nullData {
		font-size: .3rem;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}
</style>
