<template>
	<view class="sem-search-container">
		<universal-nav-bar :navType="1" rightTitle="筛选" rightImageName="/static/icon/icon-flitter.png"  @rightToPrev="rightToPrev">
			<template name="nav">
				<label class="navTitle">边民互市二级交易市场</label>
			</template>
		</universal-nav-bar>
		<bht-layout-container bgColor="#F2F2F2" :bottom="0">
			<view class="goods-list-container">
				<mescroll-uni :down="downOption" @down="downCallback" :fixed="false" :up="upOption" @up="upCallback"><sem-goods-list></sem-goods-list></mescroll-uni>
			</view>
			<sem-goods-footer @submitOrderSuccess="submitOrderSuccessHandler"></sem-goods-footer>
		</bht-layout-container>
		<view class="right-drawer">
			<uni-drawer :visible="showRight" width="85%" mode="right" @close="closeDrawer('right')">
				<view class="dialog-title">筛选</view>
				<view class="flitter-item">
					<view class="item-attr">
						<view class="item-name">车牌号</view>
						<view class="item-form-input">
							<input class="item-input" v-model="paramsData.plateNumber" placeholder="请输入车牌号" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">商品名称</view>
						<view class="item-form-input">
							<input class="item-input" v-model="paramsData.goodsName" placeholder="请输入商品名称" />
							<view class="arrow-right"></view>
						</view>
					</view>
					<view class="item-attr">
						<view class="item-name">到货日期</view>
						<view class="item-form-input" @click="showDatePicker">
							<input class="item-input" disabled="true" :value="paramsData.startDate + calendarSplit + paramsData.endDate" placeholder="请选择到货日期" />
							<view class="arrow-right"><view class="iconfont aca-xiala"></view></view>
						</view>
					</view>
				</view>
				<view class="dialog-bottom">
					<view class="dialog-finish">
						<button class="finish-btn" @click="search">查询</button>
						<button class="reset-btn" @click="reset">重置</button>
					</view>
				</view>
				<uni-calendar :date="paramsData.startDate" :insert="false" :range="true" :endDate="calendarEndDate" ref="calendar" :lunar="false" @confirm="confirmDate" />
			</uni-drawer>
		</view>
	</view>
</template>

<script>
import UniversalNavBar from '@/components/navbar/xw-dth-navbar-universal.vue';
import SemGoodsList from '@/components/sem/sem-list/sem-goods-list.vue';
import SemGoodsFooter from '@/components/sem/sem-list/sem-goods-footer.vue';
import UniDrawer from '@/third/uni-drawer/uni-drawer.vue';
import { searchGoodsList } from '@/api/sem.js';
import { mapActions, mapGetters } from 'vuex';
import { minusDate, formatterDate } from '@/utils/date';
export default {
	components: {
		UniversalNavBar,
		SemGoodsList,
		SemGoodsFooter,
		UniDrawer
	},
	data() {
		return {
			showRight: false,
			calendarEndDate: formatterDate(new Date(), 'YY-MM-DD'),
			calendarSplit: '',
			paramsData: {
				startDate: '',
				endDate: '',
				plateNumber: '',
				goodsName: '',
				page: 1,
				limit: 10
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
			// 列表数据
			dataList: [],
			mescroll: null
		};
	},
	computed: {
		...mapGetters({
			goodsData: 'sem/goodsData'
		})
	},
	onLoad() {
		this.addGoodsData([]);
	},
	methods: {
		...mapActions({
			addGoodsData: 'sem/addGoodsData'
		}),
		/**
		 * 搜索
		 */
		search() {
			this.addGoodsData([]);
			this.mescroll.triggerDownScroll();
			this.closeDrawer();
		},
		/**
		 * 重置表单
		 */
		reset() {
			// this.paramsData.goodsName = '';
			// this.paramsData.endDate = '';
			this.paramsData.startDate = '';
			this.paramsData.plateNumber = '';
			this.calendarSplit = '';
		},
		downCallback(mescroll) {
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		upCallback(mescroll) {
			this.paramsData.page = mescroll.num;
			searchGoodsList(this.paramsData)
				.then(res => {
					let { data } = res;
					data.content.forEach((item, index) => {
						item.checked = false;
					});
					if (mescroll.num == 1) {
						this.addGoodsData([]);
					}
					this.addGoodsData([...data.content, ...this.goodsData.list]);
					mescroll.endBySize(data.content, data.count);
				})
				.catch(error => {
					this.mescroll.endErr();
				});
		},
		/**
		 * 处理下单成功回调
		 * @param {Object} result true表示下单成功 false表示下单失败
		 */
		submitOrderSuccessHandler(result) {
			this.addGoodsData([]);
			this.mescroll.triggerDownScroll();
		},
		rightToPrev() {
			this.showRight = true;
		},
		closeDrawer(e) {
			this.showRight = false;
		},
		showDatePicker() {
			this.$refs.calendar.open();
		},
		confirmDate({ range }) {
			this.paramsData.startDate = range.begin;
			this.paramsData.endDate = range.end || range.begin;
			this.calendarSplit = '~';
		}
	}
};
</script>

<style lang="scss">
.sem-search-container {
	.goods-list-container {
		position: absolute;
		top: 0;
		bottom: 114rpx;
		width: 100%;
	}
	.navTitle {
		color: #fff;
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
