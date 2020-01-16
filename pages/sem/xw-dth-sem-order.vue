<template>
	<view class="sem-index-container">
		<universalNavBar :navType="1" rightTitle="筛选" rightImageName="/static/icon/icon-flitter.png"  @rightToPrev="rightToPrev">
			<template name="nav">
				<label class="navTitle">边民互市二级交易市场</label>
			</template>
		</universalNavBar>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0">
			<view class="scan-list-container">
				<mescroll-uni :down="downOption" @down="downCallback" :fixed="false" :up="upOption" @up="upCallback">
					<view class="list-items" v-for="(item, index) in dataSource" :key="index">
						<view class="info">
							<view class="info-header">
								<view class="goods-name">{{ item.name }}</view>
								<view class="price">
									<label class="symbol">¥</label>
									<text class="value">{{ item.price }}</text>
								</view>
							</view>
							<view class="info-items">
								<label class="title">边民姓名</label>
								<text class="value">{{ item.seller }}</text>
							</view>
							<view class="info-items">
								<label class="title">车牌号</label>
								<text class="value">{{ item.plateNumber }}</text>
							</view>
							<view class="info-items">
								<label class="title">重量</label>
								<text class="value">{{ item.quantity }}</text>
							</view>
							<view class="info-items">
								<label class="title">支付状态</label>
								<text class="value" style="color: #008400;">{{ item.status == 'yetPay' ? '已支付' : '未支付' }}</text>
							</view>
							<view class="info-items">
								<label class="title">发票状态</label>
								<text class="value" style="color: #D20000;">{{ item.invoiceStatus == 'none' ? '未开票' : '已开票' }}</text>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</bht-layout-container>

		<view class="right-drawer">
			<uni-drawer :visible="showRight" width="85%" mode="right" @close="closeDrawer('right')">
				<view class="dialog-title">筛选</view>
				<view class="flitter-item">
					<view class="item-attr">
						<view class="item-name">车牌号</view>
						<view class="item-form-input">
							<input class="item-input" v-model="formData.plateNumber" placeholder="请输入车牌号" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">商品名称</view>
						<view class="item-form-input">
							<input class="item-input" v-model="formData.name" placeholder="请输入商品名称" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">边民姓名</view>
						<view class="item-form-input">
							<input class="item-input" v-model="formData.seller" placeholder="请输入边民姓名" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">支付状态</view>
						<picker @change="pickerPayChange" :value="payIndex" :range="payArr" range-key="name">
							<view class="item-form-input">
								<input class="item-input" disabled="true" :value="payState.name" placeholder="选择支付状态" />
								<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
							</view>
						</picker>
					</view>
					<view class="item-attr">
						<view class="item-name">发票状态</view>
						<picker @change="pickerBillChange" :value="billIndex" :range="billArr" range-key="name">
							<view class="item-form-input">
								<input class="item-input" disabled="true" :value="billState.name" placeholder="选择发票状态" />
								<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
							</view>
						</picker>
					</view>
					<view class="item-attr">
						<view class="item-name">到货日期</view>
						<view class="item-form-input" @click="showDatePicker">
							<input class="item-input" disabled="true" :value="formData.startDate + calendarSplit + formData.endDate" placeholder="请选择到货日期" />
							<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
						</view>
					</view>
					<!-- <view class="item-attr">
						<view class="item-name">下单时间</view>
						<picker mode="date" @change="pickerOrderTimeChange" :value="formData.orderTime">
							<view class="item-form-input">
								<input class="item-input" disabled="true" :value="formData.orderTime" placeholder="选择下单日期" />
								<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
							</view>
						</picker>
					</view> -->
				</view>
				<view class="dialog-bottom">
					<view class="dialog-finish">
						<button class="finish-btn" @click="queryClick">查询</button>
						<button class="reset-btn" @click="resetClick">重置</button>
					</view>
				</view>
				<uni-calendar :date="formData.startDate" :insert="false" :range="true" :endDate="calendarEndDate" ref="calendar" :lunar="false" @confirm="confirmDate" />
			</uni-drawer>
		</view>
	</view>
</template>

<script>
import universalNavBar from '@/components/navbar/xw-dth-navbar-universal.vue';
import uniDrawer from '@/third/uni-drawer/uni-drawer.vue';
import { minusDate, formatterDate } from '@/utils/date';
import { searchOrderList } from '@/api/sem.js';
export default {
	components: {
		universalNavBar,
		uniDrawer
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			showRight: false,
			payArr: [{name:'未支付',value:'waitPay'}, {name:'已支付',value:'yetPay'}],
			// payStateArr: ['waitPay', 'yetPay'],
			payIndex: 0,
			payState:{},
			billArr: [{name:'未开票',value:'none'},{name:'开票中',value:'wait'},{name:'已开票',value:'done'},{name:'开票失败',value:'fail'}],
			
			billIndex: 0,
			billState:{},
			calendarSplit: '',
			calendarEndDate: formatterDate(new Date(), 'YY-MM-DD'),
			formData: {
				plateNumber: '', //车牌号
				name: '', //商品名称
				seller: '', //边名姓名
				status: '', //支付状态
				invoiceStatus: '', //开票状态
				startDate: '', //开始时间
				endDate: '', //结束时间
				pageNum: 1,
				pageSize: 10
			},
			downOption: {
				use: true,
				auto: true
			},
			upOption: {
				use: true,
				auto: false,
				noMoreSize: 5,
				empty: {
					tip: '暂无相关数据'
				}
			},
			dataSource: []
		};
	},

	methods: {

		rightToPrev(e) {
			this.showRight = !this.showRight;
		},
		closeDrawer(e) {
			this.showRight = false;
		},
		//支付状态选择
		pickerPayChange(e) {
			this.payIndex = e.target.value;
			this.payState = this.payArr[this.payIndex];
			this.formData.status = this.payState.value;
			this.$forceUpdate();
		},
		//发票状态选择
		pickerBillChange(e) {
			this.billIndex = e.target.value;
			this.billState = this.billArr[this.payIndex];
			this.formData.invoiceStatus = this.billState.value;
			this.$forceUpdate();
		},
		// //时间选择
		// pickerOrderTimeChange(e) {
		// 	this.formData.orderTime = e.target.value
		// 	this.$forceUpdate();
		// },
		showDatePicker() {
			this.$refs.calendar.open();
		},
		confirmDate({ range }) {
			this.formData.startDate = range.begin;
			this.formData.endDate = range.end || range.begin;
			this.calendarSplit = '~';
		},
		queryClick() {
			this.showRight = false;
			this.mescroll.triggerDownScroll();
		},
		resetClick() {
			this.formData.plateNumber = ''; //车牌号
			this.formData.name = ''; //商品名称
			this.formData.seller = ''; //边名姓名
			this.formData.status = ''; //支付状态
			this.formData.invoiceStatus = ''; //开票状态
			this.formData.startDate = ''; //下单时间
			this.formData.endDate = ''; //下单时间
			this.calendarSplit = '';
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		downCallback(mescroll) {
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		upCallback(mescroll) {
			this.formData.pageNum = mescroll.num;
			searchOrderList(this.formData)
				.then(res => {
					let { data } = res;
					data.content.forEach((item, index) => {
						item.checked = true;
					});
					// this.addGoodsData([...data, ...this.goodsData.list]);
					if (mescroll.num == 1) this.dataSource = []; //如果是第一页需手动制空列表
					this.dataSource = this.dataSource.concat(data.content); //追加新数据
					mescroll.endBySize(data.content, data.count);
				})
				.catch(error => {
					this.mescroll.endErr();
				});
		}
	}
};
</script>

<style lang="scss">
.sem-index-container {
	.navTitle {
		color: #fff;
	}
	.header {
		display: flex;
		justify-content: center;
		height: 140rpx;
		background-color: #ef4455;
		text-align: center;
		.box {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.icon {
				width: 62rpx;
				height: 62rpx;
			}
			.title {
				margin-top: 6rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
	.scan-list-container {
		position: absolute;
		height: 100%;
		padding: $padding-content;
		overflow-y: scroll;
		width: 100%;
		.list-items {
			display: flex;
			margin-bottom: $padding-content;
			padding: 0 $padding-content;
			background-color: #fff;
			border-radius: 10px;
			&:last-child {
				margin-bottom: 0;
			}

			.check {
				display: flex;
				align-items: center;
				width: 42px;
			}
			.info {
				flex: 1;
				.info-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 71rpx;
					border-bottom: 2px solid #b2b4b3;
					.goods-name {
						flex: 1;
						text-overflow: hidden;
						font-size: 32rpx;
						color: #333;
					}
					.price {
						width: 80px;
						text-align: right;
						color: #ff3333;
						.symbol {
							font-size: 22rpx;
						}
						.value {
							font-size: 32rpx;
						}
					}
				}
				.info-items {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 54rpx;
					font: 26rpx;
					color: #898989;
					border-bottom: 1px solid #e5e5e5;

					&:last-child {
						border-bottom: 0;
					}
				}
			}
		}
		.tips {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: 34rpx;
			color: #e40011;
		}
	}
	.scan-footer {
		position: absolute;
		bottom: 0;
		padding: 0 $padding-content;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 114rpx;
		font-size: 30rpx;
		background-color: #fff;
		.total {
			color: #333333;
			.price {
				color: #ff3333;
			}
		}
		.sub-btn {
			width: 238rpx;
			height: 82rpx;
			line-height: 82rpx;
			text-align: center;
			background-color: #ff6f04;
			border-radius: 41px;
			color: #ffffff;
		}
	}
	.right-drawer {
		.dialog-title {
			background: #f3f3f3;
			width: 100%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			color: #898989;
			font-size: 30rpx;
		}
		.flitter-item {
			.item-attr {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 120rpx;
				line-height: 120rpx;
				.item-name {
					width: 160rpx;
					font-size: 30rpx;
					color: #6b6b6b;
					text-align: right;
				}
				.item-form-input {
					display: flex;
					height: 80rpx;
					line-height: 80rpx;
					margin-right: 10rpx;
					margin-left: 10rpx;
					border-radius: 10rpx;
					border: 1rpx solid #898989;
					.item-input {
						margin-left: 10rpx;
						height: 100%;
						width: 360rpx;
					}

					input::-ms-input-placeholder {
						font-size: 28rpx;
						color: #898989;
					}
					.arrow-right {
						// margin-right: 13rpx;
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}
		.dialog-bottom {
			display: flex;
			width: 100%;
			height: 119rpx;
			opacity: 1;
			position: fixed;
			bottom: 0;
			justify-content: center;
			.dialog-finish {
				display: flex;
				justify-content: space-between;
				width: 325rpx;
				.finish-btn {
					height: 58rpx;
					line-height: 58rpx;
					width: 156rpx;
					color: #ffffff;
					font-size: 30rpx;
					background: #ff3300;
				}
				.reset-btn {
					height: 58rpx;
					line-height: 58rpx;
					width: 156rpx;
					color: #ff3300;
					font-size: 30rpx;
					border: 1rpx solid #ff3300;
				}
			}
		}
	}
}
</style>
