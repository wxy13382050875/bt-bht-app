<template>
	<!-- 不能用v-if -->
	<view v-show="i === index" class="wrapper">
		<view class="wait-content">
			<mescroll-uni :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view class="bill-list">
					<checkbox-group @change="checkboxChange">
						<label class="items" v-for="(item,index) in dataList" :key="index">
							<view class="left-check">
								<checkbox :value="item.id" :checked="item.checked" color="#FF3333" style="transform:scale(0.7)" />
							</view>
							<view class="right-content">
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
							</view>
						</label>
					</checkbox-group>
				</view>
			</mescroll-uni>
		</view>
		<view class="wait-footer">
			<view class="show">
				<checkbox-group @change="checkboxAllChage">
					<label class="check-all">
						<checkbox :checked="checkAllStatus" :disabled="dataList.length<=0" color="#FF3333" style="transform:scale(0.7)" />
						<text>全选</text>
					</label>
				</checkbox-group>
				<view class="total">
					<text>合计：¥{{totalAmount}}</text>
				</view>
			</view>
			<view class="btn" @click="openInvoice">申请开票</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 待开票数据组件
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
					invoiceStatus: 'none'
				},
				dataList: [],
				checkDataList: [],
				checkAllStatus: false,
				totalAmount: 0
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
				if (this.i === val) {
					this.checkAllStatus = false;
					this.totalAmount = 0;
					this.mescroll.triggerDownScroll();
				}
			},
			checkDataList(n, o) {
				if (n.length > 0) {
					let {
						dataList
					} = this;
					let money = 0;
					//比较
					for (let index in n) {
						for (let item in dataList) {
							if (n[index] === dataList[item].id) {
								money += dataList[item].confirmAmount;
							}
						}
					}
					this.totalAmount = money
				} else {
					this.totalAmount = 0
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
			},
			//单选
			checkboxChange({
				detail
			}) {
				let values = detail.value
				let items = this.dataList;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				if (values.length === items.length) {
					this.checkAllStatus = true
				} else {
					this.checkAllStatus = false
				}
				this.checkDataList = values
			},
			//全选操作
			checkboxAllChage({
				detail
			}) {
				if (detail.value.length > 0) {
					let items = this.dataList;
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						this.$set(items[i], 'checked', true)
						this.checkDataList.push(items[i].id)
					}
					this.checkAllStatus = true
				} else {
					let items = this.dataList;
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						this.$set(items[i], 'checked', false)
						this.checkDataList.splice(0, this.checkDataList.length)
					}
					this.checkAllStatus = false
				}
			},
			//提交开票
			openInvoice() {
				let {
					checkDataList
				} = this
				if (checkDataList.length > 0) {
					submitInvoice({
						ids: checkDataList.join(',')
					}).then(res => {
						let {
							code,
							message
						} = res;
						if (code === '200') {

							uni.showToast({
								icon: 'success',
								title: '开票申请成功！'
							});
							//触发下来刷新
							this.mescroll.triggerDownScroll();
							//重置数据
							this.checkAllStatus = false;
							this.checkDataList = []

						} else {
							uni.showToast({
								icon: 'none',
								title: '开票申请失败！'
							});
						}
					}).catch(erro => {
						console.log("oo")
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.wait-content {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 116rpx;
		left: 0;
	}

	.wait-footer {
		position: fixed;
		bottom: 20rpx;
		right: 0;
		left: 0;
		display: flex;
		padding: 0 $padding-content;
		height: 94rpx;

		.show {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex: 1;
			height: 100%;
			background-color: rgba(242, 242, 242, 1);

			.check-all {
				display: flex;
				align-items: center;
				height: 100%;
				font-size: 34rpx;
				color: rgba(56, 56, 56, 1);
			}

			.total {
				margin-right: 31rpx;
				font-size: 32rpx;
			}
		}

		.btn {
			width: 158rpx;
			font-size: 34rpx;
			color: #fff;
			text-align: center;
			line-height: 94rpx;
			background-color: rgba(255, 51, 51, 1);
		}
	}

	.bill-list {
		.items {
			display: flex;

			.left-check {
				display: flex;
				align-items: center;
				width: 50rpx;
			}

			.right-content {
				flex: 1;
				margin-left: 21rpx;

				.line {
					&::before {
						right: 0;
						left: 0;
					}
				}
			}
		}
	}
</style>
