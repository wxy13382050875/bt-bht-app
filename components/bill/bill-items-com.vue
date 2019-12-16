<template>
	<!-- 不能用v-if -->
	<view v-show="i === index" class="wrapper">
		<view class="wait-content">
			<mescroll-uni :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view class="bill-list">
					<view class="items" v-for="(item,index) in dataList" :key="index">
						<view class="header line">
							<view class="left">
								<text>订单号：{{item.sn}}</text>
							</view>
							<view class="right">{{item.title}}</view>
						</view>
						<view class="content line">
							<view class="title">下单时间：</view>
							<view class="value">{{item.created}}</view>
						</view>
						<view class="footer">
							<text class="componey">{{item.buyer}}</text>
							<text class="amount">¥{{item.confirmAmount}}</text>
						</view>
						<image v-if="i===1" class="bill-status" src="../../static/icon/invoice_wait_icon.png"></image>
						<image v-if="i===2" class="bill-status" src="../../static/icon/invoice_done_icon.png"></image>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	/**
	 * 开票数据组件
	 */
	import {
		mapGetters
	} from 'vuex'
	import {
		invoiceList,
		submitInvoice
	} from '@/api/bill'
	export default {
		props: {
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default () {
					return 0
				}
			}

		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
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
						icon: '',
					},
					textNoMore: '数据已全部加载'
				},
				isInit: false, // 列表是否已经初始化
				params: {
					invoiceStatus: ''
				},
				dataList: [],
				checkDataList: [],
				checkAllStatus: false
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/userInfo'
			})
		},
		watch: {
			// 监听下标的变化
			index(val) {
				if (this.i === 1) {
					this.params.invoiceStatus = 'wait'
				}
				if (this.i === 2) {
					this.params.invoiceStatus = 'done'
				}
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			upCallback(mescroll) {
				this.params.page = mescroll.num;
				this.params.limit = mescroll.size;
				invoiceList(this.params).then(res => {
					let {
						data,
						code
					} = res
					if (code === '200') {
						if (mescroll.num == 1) this.dataList = [];
						this.dataList = this.dataList.concat(data.content);
						mescroll.endBySize(data.content.length, data.count);
						this.$nextTick(() => {
							mescroll.endSuccess(data.content.length)
						})
					}
					if (code === 4400) {
						mescroll.endErr()
					}
				}).catch(error => {
					mescroll.endErr()
				})
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll();
			}
		}
	}
</script>

<style lang="scss">
	.bill-status {
		position: absolute;
		top: 69rpx;
		left: 159rpx;
		width: 93rpx;
		height: 75rpx;
	}
</style>
